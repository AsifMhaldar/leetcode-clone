# Phase 3: Leaderboard & Social Features — Implementation Plan

> **Goal:** Make it multi-user with competition and community.
> **Timeline:** Weeks 5-7
> **Status:** Not started

---

## UI Architecture (applies to all new pages)

### Page Shell Pattern
Every new page follows the existing pattern:
```
<div className="page-bg">
  <HomepageHeader />           // reuse from /home
  <div className="container max-w-6xl mx-auto px-6 py-8">
    ...content...
  </div>
</div>
```

### Styling Rules
- SCSS files always start with `@use '../../styles/variables' as *;` and `@use '../../styles/mixins' as *;`
- Cards: `@include glass-card` (background, blur, border-radius, border, shadow)
- Colors: CSS custom properties only (`var(--text-primary)`, `var(--glass-bg)`, etc.) — theme auto-switches
- Icons: `lucide-react` only, imported per icon
- Tables: native `<table>` with BEM classes (`component__table`, `__th`, `__td`, `__row`)
- Skeletons: pulsing div placeholders with `animation: skeleton-pulse 1.5s ease-in-out infinite`
- Loading: 30s React Query polling for real-time data

### Navigation
- New navbar links added to `HomepageHeader`: **Leaderboard** (Trophy icon), **Feed** (Rss icon)
- Admin-only pages keep existing `AdminHeader`
- Comments live inside ProblemPage (new tab, no separate nav)

---

## 3.1 Leaderboard System

### Backend

#### New Model: `Leaderboard`
```js
{
  userId: ObjectId (ref: User, unique),
  points: Number,
  easyCount: Number,
  mediumCount: Number,
  hardCount: Number,
  lastUpdated: Date
}
```

#### Scoring Formula
| Difficulty | Points |
|---|---|
| Easy | 1 |
| Medium | 3 |
| Hard | 5 |
| Streak 7+ days | 1.1x multiplier |

#### Sync Logic
- Update `Leaderboard` document after each accepted submission
- Recalculate points from `user.problemSolved[]` array
- No Redis needed — MongoDB sort works at current scale

#### Endpoints
```
GET /leaderboard/global         -> top 100 users sorted by points
GET /leaderboard/weekly         -> top 100 from last 7 days only
GET /leaderboard/monthly        -> top 100 from last 30 days only
GET /leaderboard/tag/:tag       -> top users for specific tag
GET /leaderboard/rank/:userId   -> user's current rank + neighbors
```

#### Files to Create
- `backend/src/models/leaderboard.js`
- `backend/src/controllers/leaderboard.js`
- `backend/src/Routes/leaderboard.js`

#### Files to Modify
- `backend/src/index.js` — mount routes
- `backend/src/controllers/submission.js` — trigger leaderboard update on accept

---

### Frontend: Leaderboard Page

#### Route
```
/leaderboard — Public (no auth required, but show personalized card if logged in)
```

#### Page Layout
```
page-bg
├── HomepageHeader
├── LeaderboardPage
│   ├── Header: "Leaderboard" title + Trophy icon + "Global Rankings" subtitle
│   ├── YourRank (sticky card, only if logged in)
│   ├── Tab Bar: Global | Weekly | Monthly | By Tag
│   │   └── TagFilter dropdown (visible only on "By Tag" tab)
│   └── LeaderboardTable
│       ├── thead: Rank | User | Score | Solved | Streak
│       └── tbody: rows with RankBadge, avatar, name, points, count, streak
```

#### Component Details

**YourRank** (sticky card at top)
- Glass card, full-width
- Shows: "Your Rank: #12", "Score: 340 pts", "Problems Solved: 45"
- If not logged in: show "Sign in to see your rank" with link to /login
- Position: sticky, top: 80px (below navbar)

**LeaderboardTable** (sortable table)
- BEM classes: `lb-table__table`, `__th`, `__td`, `__row`, `__rank`, `__user`, `__score`
- Columns:
  1. **Rank** — `RankBadge` component (gold crown for #1, silver for #2, bronze for #3, number for rest)
  2. **User** — avatar (initials circle) + name + email
  3. **Score** — formatted with locale separator, colored by tier
  4. **Solved** — count (easy/medium/hard colored dots)
  5. **Streak** — fire icon + count
- Row hover: subtle glass highlight
- Top 3 rows: special background (gold/silver/bronze tint)
- Loading: 10 skeleton rows
- Empty: "No rankings yet" with trophy icon

**Tab Bar**
- Follows existing pattern from SolveTimeline (Dashboard)
- Active tab: blue underline + bold text
- Inactive: muted text, hover: slight color change

**TagFilter** (visible only on "By Tag" tab)
- Dropdown select with all available tags
- Default: "All Tags"
- Triggers refetch with tag param

#### Files to Create
```
frontend/src/pages/Leaderboard/LeaderboardPage.jsx
frontend/src/pages/Leaderboard/LeaderboardPage.scss
frontend/src/pages/Leaderboard/hooks/useLeaderboard.js
frontend/src/pages/Leaderboard/components/LeaderboardTable.jsx
frontend/src/pages/Leaderboard/components/LeaderboardTable.scss
frontend/src/pages/Leaderboard/components/RankBadge.jsx
frontend/src/pages/Leaderboard/components/YourRank.jsx
frontend/src/pages/Leaderboard/components/YourRank.scss
frontend/src/pages/Leaderboard/constants.js
frontend/src/api/leaderboard.js
```

#### Files to Modify
- `frontend/src/App.jsx` — add `/leaderboard` route
- `frontend/src/pages/Homepage/components/HomepageHeader.jsx` — add Leaderboard nav link with Trophy icon

---

## 3.2 Comments & Discussions

### Backend

#### New Model: `Comment`
```js
{
  problemId: ObjectId (ref: Problem, required),
  userId: ObjectId (ref: User, required),
  content: String (required, max 5000),
  parentCommentId: ObjectId (ref: Comment, default null),
  upvotes: [ObjectId] (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

#### Endpoints
```
GET /comment/problem/:problemId     -> threaded comments (top-level + replies)
POST /comment                       -> create comment
PUT /comment/:commentId             -> edit own comment
DELETE /comment/:commentId          -> delete (own or admin)
POST /comment/:commentId/upvote     -> toggle upvote
```

#### Threading
- `parentCommentId: null` = top-level
- `parentCommentId: <id>` = reply (1 level deep)
- Response: flat array, each top-level comment has `replies: []` sub-array

#### Files to Create
- `backend/src/models/comment.js`
- `backend/src/controllers/comment.js`
- `backend/src/Routes/comment.js`

#### Files to Modify
- `backend/src/index.js` — mount routes

---

### Frontend: Comments Tab in ProblemPage

#### Integration Point
Comments live as a **6th tab** in the ProblemPage left panel.

#### Tab Setup (existing files to modify)

**File: `frontend/src/pages/ProblemPage/utils/problemData.js`** (line 49)
```js
// Add to leftTabs array:
{ id: 'comments', label: 'Comments' }
```

**File: `frontend/src/pages/ProblemPage/ProblemPage.jsx`** (line 190)
```js
// Add MessageSquare icon case in tab icon mapping
case 'comments': return <MessageSquare size={14} />;
```

**File: `frontend/src/pages/ProblemPage/components/LeftPanel.jsx`** (line 142)
```js
// Add CommentsTab rendering
case 'comments': return <CommentsTab problemId={problemId} />;
```

#### CommentsTab Layout
```
CommentsTab
├── Header: "Comments (12)" count badge + SortToggle (Newest | Most Upvoted)
├── CommentForm (top — new comment textarea)
│   ├── textarea with placeholder "Share your thoughts..."
│   ├── character count "0/5000"
│   └── Submit button (disabled if empty)
├── CommentList
│   ├── CommentCard (top-level)
│   │   ├── avatar (initials circle) + name + timestamp
│   │   ├── content text
│   │   ├── actions: upvote button (thumb up + count) | Reply button
│   │   └── ReplyThread
│   │       ├── ReplyCard (nested, indented)
│   │       └── ReplyCard...
│   └── CommentCard...
└── Empty state: "No comments yet. Be the first to share!"
```

#### Component Details

**CommentCard**
- Glass card, full-width, no border-radius (inherits from list container)
- Avatar: 32px circle with user initials + colored background
- Name: bold, text-primary
- Timestamp: relative time (e.g., "2h ago", "3d ago")
- Content: plain text, whitespace-pre-wrap
- Upvote button: ThumbUp icon + count, toggleable (filled when upvoted)
- Reply button: Reply icon, opens inline CommentForm below
- Own comments: show Edit/Delete buttons (pencil/trash icons)
- Delete: confirmation modal before API call

**ReplyThread**
- Indented 2rem left, with subtle left border (2px, glass-border color)
- Replies show same layout as CommentCard but smaller (avatar 24px)
- "Reply to @name" indicator at top of reply

**CommentForm**
- Textarea: auto-resize, min 3 lines
- Character count: shows "0/5000", turns red when > 4500
- Submit: blue button, disabled when empty, shows spinner on submit
- Cancel: gray button, only visible in reply mode

**SortToggle**
- Two buttons side by side: "Newest" | "Most Upvoted"
- Active: blue background, white text
- Inactive: glass-bg, text-muted

#### Files to Create
```
frontend/src/components/Comments/CommentSection.jsx
frontend/src/components/Comments/CommentSection.scss
frontend/src/components/Comments/CommentCard.jsx
frontend/src/components/Comments/CommentCard.scss
frontend/src/components/Comments/ReplyThread.jsx
frontend/src/components/Comments/CommentForm.jsx
frontend/src/components/Comments/CommentForm.scss
frontend/src/components/Comments/hooks/useComments.js
frontend/src/components/Comments/constants.js
frontend/src/api/comments.js
```

#### Files to Modify
- `frontend/src/pages/ProblemPage/utils/problemData.js` — add comments tab
- `frontend/src/pages/ProblemPage/ProblemPage.jsx` — add icon mapping
- `frontend/src/pages/ProblemPage/components/LeftPanel.jsx` — add CommentsTab rendering

---

## 3.3 User Following & Activity Feed

### Backend

#### User Model Updates
```diff
  User {
    firstName, lastName, emailId, age, role,
    problemSolved: [ObjectId],
+   followers: [ObjectId] (ref: User),
+   following: [ObjectId] (ref: User),
    bio, password, timestamps
  }
```

#### Endpoints
```
POST /user/follow/:targetId       -> follow/unfollow toggle
GET /user/followers/:userId       -> paginated followers list
GET /user/following/:userId       -> paginated following list
GET /feed                         -> activity feed from followed users
```

#### Feed Logic
- Query submissions from users in `currentUser.following[]`
- Return last 50 events sorted by `createdAt` desc
- Include problem title and user name via populate

#### Files to Create
- `backend/src/controllers/follow.js`
- `backend/src/Routes/follow.js`

#### Files to Modify
- `backend/src/models/user.js` — add `followers[]`, `following[]`
- `backend/src/index.js` — mount routes

---

### Frontend: FollowButton (Reusable)

#### Component
- Small pill button: "Follow" (blue) / "Following" (glass) / "Unfollow" (red on hover)
- Loading state: spinner replaces text
- Toggle on click: POST `/user/follow/:targetId`
- Disabled on own profile (hidden entirely)
- Size variants: `sm` (for cards), `md` (for profile headers)

#### Usage Locations
| Location | Size | Notes |
|---|---|---|
| PublicProfile header | `md` | Next to user name |
| FeedCard | `sm` | Next to user avatar |
| LeaderboardTable row | `sm` | In user column |
| LeaderboardYourRank | — | Not shown (own rank) |

#### Files to Create
```
frontend/src/components/Follow/FollowButton.jsx
frontend/src/components/Follow/FollowButton.scss
```

---

### Frontend: Activity Feed Page

#### Route
```
/feed — Auth required (redirect to /login if not authenticated)
```

#### Page Layout
```
page-bg
├── HomepageHeader
├── ActivityFeed
│   ├── Header: "Activity Feed" title + Rss icon + "Latest from people you follow" subtitle
│   ├── Empty State (if not following anyone): "Follow people to see their activity"
│   │   └── CTA button: "Browse Leaderboard" -> /leaderboard
│   └── FeedList
│       ├── FeedCard
│       │   ├── avatar (initials circle) + name + relative timestamp
│       │   ├── action text: "Solved Two Sum" (linked to /problem/:id)
│       │   ├── difficulty badge (Easy=green, Medium=yellow, Hard=red)
│       │   └── FollowButton (sm)
│       ├── FeedCard...
│       └── Load more button (pagination)
```

#### Component Details

**FeedCard**
- Glass card, full-width
- Left: 40px avatar circle with initials
- Center: user name (bold, links to `/user/:userId`) + action text + problem link
- Right: relative timestamp + FollowButton
- Difficulty badge: small colored pill next to problem name
- Hover: subtle lift effect

**Empty State**
- Center-aligned, large icon (Rss or Users)
- "Follow people to see their activity here"
- CTA: "Browse Leaderboard" button -> navigates to `/leaderboard`

#### Files to Create
```
frontend/src/pages/Feed/ActivityFeed.jsx
frontend/src/pages/Feed/ActivityFeed.scss
frontend/src/pages/Feed/components/FeedCard.jsx
frontend/src/pages/Feed/components/FeedCard.scss
frontend/src/pages/Feed/hooks/useFeed.js
frontend/src/pages/Feed/constants.js
frontend/src/api/follow.js
```

---

### Frontend: Public Profile Page

#### Route
```
/user/:userId — Public (no auth required, but show follow button if logged in)
```

#### Page Layout
```
page-bg
├── HomepageHeader
├── PublicProfile
│   ├── ProfileHeader (glass card)
│   │   ├── avatar (large initials circle)
│   │   ├── name + email
│   │   ├── bio text
│   │   ├── social links (GitHub, LinkedIn, Website icons)
│   │   ├── stats row: Solved | Submissions | Streak | Rank
│   │   └── FollowButton (md) — hidden if viewing own profile
│   ├── RecentSolves
│   │   ├── title: "Recent Solves"
│   │   └── list of last 10 submissions (same format as Profile's TimelineActivity)
│   └── StatsOverview (reuse from Profile, read-only)
│       ├── Problem Solving card (difficulty breakdown)
│       ├── Languages card (top 5)
│       └── Community Stats card
```

#### Component Details

**ProfileHeader**
- Full-width glass card, centered (max-width: 640px)
- Avatar: 80px circle with initials + gradient background
- Name: 1.5rem, bold, text-primary
- Email: text-muted, smaller
- Bio: text-secondary, italic, max 3 lines
- Social links: row of icon buttons (GitHub, LinkedIn, Globe) — open in new tab
- Stats row: 4 mini stat cards (Solved count, Submissions, Streak fire icon, Rank)
- FollowButton: positioned at top-right of card

**RecentSolves**
- Reuse `TimelineActivity` component from Profile (pass `recentSubmissions` prop)
- Shows last 10 submissions with status, problem, difficulty, language, time

**StatsOverview**
- Reuse existing `StatsOverview` component (pass `userStats`, `languages` props)
- Read-only mode (no editing)

#### Files to Create
```
frontend/src/pages/PublicProfile/PublicProfile.jsx
frontend/src/pages/PublicProfile/PublicProfile.scss
frontend/src/pages/PublicProfile/hooks/usePublicProfile.js
```

---

## Navigation Updates

### HomepageHeader Changes
```
Existing links: Home | Problems
New links:      Home | Problems | Leaderboard (Trophy) | Feed (Rss)
```
- `Feed` link only shown to authenticated users
- `Leaderboard` link shown to everyone
- Icons: `Trophy` for Leaderboard, `Rss` for Feed (from lucide-react)

### Files to Modify
- `frontend/src/pages/Homepage/components/HomepageHeader.jsx` — add nav links
- `frontend/src/pages/Homepage/components/constants.js` — add nav items

---

## Implementation Order

| Week | Task | Priority |
|---|---|---|
| **Week 5** | 3.1 Backend: Leaderboard model + endpoints + scoring sync | HIGH |
| **Week 5** | 3.1 Frontend: LeaderboardPage + table + rank cards | HIGH |
| **Week 5** | Nav update: Add Leaderboard + Feed links to HomepageHeader | HIGH |
| **Week 6** | 3.2 Backend: Comment model + endpoints | HIGH |
| **Week 6** | 3.2 Frontend: CommentSection + CommentCard + ReplyThread in ProblemPage | HIGH |
| **Week 7** | 3.3 Backend: User model update + follow endpoints + feed | MEDIUM |
| **Week 7** | 3.3 Frontend: FollowButton + ActivityFeed + PublicProfile | MEDIUM |

---

## Dependencies & Notes

- **No Redis** — MongoDB sort handles leaderboard at current scale
- **User model migration** — add `followers[]`/`following[]` with defaults `[]`, no data migration needed
- **Comment upvotes** — array of user IDs, toggle add/remove
- **Follow is bidirectional** — both users' arrays updated
- **Feed is pull-based** — Socket.io real-time comes in Phase 4
- **Reuse existing components** — `TimelineActivity`, `StatsOverview`, `HomepageHeader`, `EmptyState`
- **No framer-motion on new pages** — keep consistent with current patterns (animations added in Phase 1)

---

## Files Summary

### Backend — New Files (8)
```
backend/src/models/leaderboard.js
backend/src/controllers/leaderboard.js
backend/src/Routes/leaderboard.js
backend/src/models/comment.js
backend/src/controllers/comment.js
backend/src/Routes/comment.js
backend/src/controllers/follow.js
backend/src/Routes/follow.js
```

### Backend — Modified Files (3)
```
backend/src/index.js                    — mount leaderboard, comment, follow routes
backend/src/models/user.js               — add followers[], following[]
backend/src/controllers/submission.js    — trigger leaderboard update on accept
```

### Frontend — New Files (22)
```
frontend/src/api/leaderboard.js
frontend/src/api/comments.js
frontend/src/api/follow.js
frontend/src/pages/Leaderboard/LeaderboardPage.jsx
frontend/src/pages/Leaderboard/LeaderboardPage.scss
frontend/src/pages/Leaderboard/hooks/useLeaderboard.js
frontend/src/pages/Leaderboard/components/LeaderboardTable.jsx
frontend/src/pages/Leaderboard/components/LeaderboardTable.scss
frontend/src/pages/Leaderboard/components/RankBadge.jsx
frontend/src/pages/Leaderboard/components/YourRank.jsx
frontend/src/pages/Leaderboard/components/YourRank.scss
frontend/src/pages/Leaderboard/constants.js
frontend/src/components/Comments/CommentSection.jsx
frontend/src/components/Comments/CommentSection.scss
frontend/src/components/Comments/CommentCard.jsx
frontend/src/components/Comments/CommentCard.scss
frontend/src/components/Comments/ReplyThread.jsx
frontend/src/components/Comments/CommentForm.jsx
frontend/src/components/Comments/CommentForm.scss
frontend/src/components/Comments/hooks/useComments.js
frontend/src/components/Comments/constants.js
frontend/src/components/Follow/FollowButton.jsx
frontend/src/components/Follow/FollowButton.scss
frontend/src/pages/Feed/ActivityFeed.jsx
frontend/src/pages/Feed/ActivityFeed.scss
frontend/src/pages/Feed/components/FeedCard.jsx
frontend/src/pages/Feed/components/FeedCard.scss
frontend/src/pages/Feed/hooks/useFeed.js
frontend/src/pages/Feed/constants.js
frontend/src/pages/PublicProfile/PublicProfile.jsx
frontend/src/pages/PublicProfile/PublicProfile.scss
frontend/src/pages/PublicProfile/hooks/usePublicProfile.js
```

### Frontend — Modified Files (5)
```
frontend/src/App.jsx                                        — add /leaderboard, /feed, /user/:userId routes
frontend/src/pages/Homepage/components/HomepageHeader.jsx    — add Leaderboard + Feed nav links
frontend/src/pages/Homepage/components/constants.js         — add nav item constants
frontend/src/pages/ProblemPage/utils/problemData.js         — add comments tab
frontend/src/pages/ProblemPage/ProblemPage.jsx              — add comments icon mapping
frontend/src/pages/ProblemPage/components/LeftPanel.jsx     — add CommentsTab rendering
```

---

*Extracted from nextlevel.md Phase 3. Updated with detailed frontend UI/UX, component specs, and integration points.*
