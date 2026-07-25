# Codify-CODE: Next Level Roadmap

> A phased plan to transform Codify-CODE from a functional LeetCode clone into a full-featured, multi-user competitive coding platform with animations, real-time collaboration, and social features.

---

## Tech Additions Required

| Technology | Purpose | Package |
|---|---|---|
| **Framer Motion** | Page transitions, scroll animations, micro-interactions | `framer-motion` |
| **Socket.io** | Real-time notifications, study rooms, collaboration | `socket.io` + `socket.io-client` |
| **Recharts** | Charts for progress dashboard, analytics | `recharts` |
| **React Error Boundaries** | Graceful error handling | `react-error-boundary` |
| **React Hot Toast** | Toast notifications (non-realtime) | `react-hot-toast` |
| **date-fns** | Date formatting for streaks, activity | `date-fns` |
| **Redis (re-enable)** | Leaderboard sorted sets, caching, session blacklisting | Already in project (disabled) |

---

## Phase 1: Foundation & Animations (Weeks 1-2)

> Goal: Polish the existing UI with Framer Motion, fix bugs, add dark/light theme.

### 1.1 Framer Motion Integration

**Install & Setup**
- Install `framer-motion`
- Create a `motion` utility wrapper for consistent animation configs

**Page Transitions**
- Wrap route transitions in `<AnimatePresence>` in `App.jsx`
- Add enter/exit animations for all page components:
  - Fade + slide up for content pages
  - Scale + fade for modal-like pages (Login, Signup)

**Component Animations**
| Component | Animation |
|---|---|
| `ProblemCard` | Staggered fade-in on list load, hover scale + shadow |
| `StatCard` | Number count-up animation on mount |
| `FilterSection` | Slide-down reveal on toggle |
| `LeftPanel / RightPanel` | Smooth panel resize/swap |
| `ChatAi` | Slide-in from right, message fade-in |
| `LoginForm / SignupForm` | Field-by-field staggered entrance |
| `AdminCard` | Hover lift + glow effect |
| `SubmissionHistory` | Row stagger animation |
| `Profile badges` | Pop-in with spring physics |
| `Streak calendar` | Cell-by-cell fade-in |

**Micro-interactions**
- Button press: scale-down spring (`whileTap={{ scale: 0.95 }}`)
- Card hover: subtle lift + shadow expansion
- Input focus: border glow animation
- Tab switching: sliding underline indicator
- Success/error states: color pulse

**Scroll Animations**
- Landing page sections: `useInView` fade-in-up on scroll
- Tutorial/Course cards: staggered reveal as they enter viewport
- Stats section: counter animation when scrolled into view

### 1.2 Dark/Light Theme System

**Architecture**
- Create a `ThemeContext` provider wrapping the app
- Store preference in `localStorage` + respect `prefers-color-scheme`
- Toggle accessible from navbar and profile settings

**Implementation**
- Use Tailwind's `dark:` variant classes throughout
- Define color tokens in `index.css`:
  - Light: white backgrounds, dark text, subtle grays
  - Dark: dark gray backgrounds, light text, muted accents
- Smooth theme transition: `transition-colors duration-300` on `body`
- Theme-aware components:
  - Code editor: switch Monaco theme (`vs-dark` / `vs-light`)
  - Auth pages: adjust gradient backgrounds
  - Landing pages: adjust white/dark sections

**Files to create/modify**
- `frontend/src/contexts/ThemeContext.jsx`
- `frontend/src/hooks/useTheme.js`
- `frontend/src/components/ThemeToggle.jsx`
- All page components (add `dark:` classes)

### 1.3 Bug Fixes & Code Quality

- [ ] Fix `style jsx` blocks (replace with Tailwind classes or styled-components)
- [ ] Fix broken `waiting()` utility in `problemUtility.js` (use async/await with proper delays)
- [ ] Fix `SubmissionHistory` population (populate `problemId` reference in submission queries)
- [ ] Add route guard for `/problem/:problemId` (require auth or clearly mark as public)
- [ ] Fix typo: rename `Execise` folder to `Exercise`
- [ ] Re-enable Redis for token blacklisting on logout
- [ ] Add React Error Boundaries around route components
- [ ] Add environment variable documentation to `.env.example`

---

## Phase 2: Progress Tracking Dashboard (Weeks 3-4)

> Goal: Give users real insights into their coding journey with charts and stats.

### 2.1 Backend: Stats API

**New endpoints:**
```
GET /user/stats/overview     -> total solved, streak, acceptance rate, rank
GET /user/stats/difficulty   -> solved count per difficulty over time
GET /user/stats/tags         -> solved count per tag
GET /user/stats/timeline     -> submissions per day (last 30/90 days)
GET /user/stats/heatmap      -> contribution-style heatmap data
```

**New model additions:**
- Add `solvedAt` timestamp to each entry in `user.problemSolved[]` array
- Add `UserStats` model for cached/aggregated stats

### 2.2 Frontend: Dashboard Page

**New route:** `/dashboard`

**Components:**
- `DashboardPage` - main layout
- `OverviewCards` - total solved, current streak, longest streak, global rank
- `DifficultyChart` - pie/donut chart of easy/medium/hard solved
- `TagRadar` - radar chart showing strength per topic (array, string, graph, dp, linkedList)
- `SubmissionHeatmap` - GitHub-style contribution heatmap (last 365 days)
- `SolveTimeline` - line chart showing problems solved over time
- `RecentActivity` - recent submissions feed
- `WeeklyGoal` - progress bar toward weekly solve target

**Charts library:** Recharts (clean React-native charts)

### 2.3 Enhanced Profile Page

- Replace hardcoded stats with real API data
- Add the submission heatmap to profile
- Show rank percentile badge
- Add "Days Active" stat
- Activity feed showing recent solves with timestamps

---

## Phase 3: Leaderboard & Social Features (Weeks 5-7)

> Goal: Make it multi-user with competition and community.

### 3.1 Leaderboard System

**Backend:**
- Re-enable and configure Redis for sorted sets
- New model: `Leaderboard` (or use Redis sorted sets directly)
- Sync job: update leaderboard after each accepted submission
- Endpoints:
  ```
  GET /leaderboard/global         -> top 100 users
  GET /leaderboard/weekly         -> this week's top performers
  GET /leaderboard/monthly        -> this month's top performers
  GET /leaderboard/tag/:tag       -> top users for specific tag
  GET /leaderboard/rank/:userId   -> user's current rank
  ```

**Scoring formula:**
- Easy: 1 point, Medium: 3 points, Hard: 5 points
- Bonus: Speed bonus (faster solve = more points)
- Streak multiplier: 1.1x for 7+ day streaks

**Frontend:**
- New route: `/leaderboard`
- `LeaderboardPage` - tabs: Global / Weekly / Monthly / By Tag
- `LeaderboardTable` - sortable table with rank, avatar, name, score, problems solved
- `RankBadge` - gold/silver/bronze for top 3
- `YourRank` - sticky card showing current user's position
- `RankChange` - arrow indicator showing rank movement

### 3.2 Comments & Discussions

**Backend:**
- New model: `Comment`
  ```
  { problemId, userId, content, parentCommentId (for replies), 
    upvotes: [userId], createdAt, updatedAt }
  ```
- Endpoints:
  ```
  GET /comment/problem/:problemId     -> all comments (threaded)
  POST /comment                       -> create comment
  PUT /comment/:commentId             -> edit comment
  DELETE /comment/:commentId          -> delete (own or admin)
  POST /comment/:commentId/upvote     -> toggle upvote
  ```

**Frontend:**
- `CommentSection` component on `ProblemPage` (new tab or below editorial)
- `CommentCard` - avatar, name, timestamp, content, upvote button
- `ReplyThread` - nested replies (1 level deep)
- `CommentForm` - textarea with markdown preview
- Sort: Newest / Most Upvoted

### 3.3 User Following & Activity Feed

**Backend:**
- Add `followers[]` and `following[]` arrays to User model
- New endpoints:
  ```
  POST /user/follow/:targetId       -> follow/unfollow toggle
  GET /user/followers/:userId       -> followers list
  GET /user/following/:userId       -> following list
  GET /feed                         -> activity feed of followed users
  ```

**Frontend:**
- `FollowButton` component (reusable)
- `ActivityFeed` page: `/feed`
  - Shows: solves, contest participation, badges earned by followed users
- `PublicProfile` page: `/user/:userId`
  - Public stats, recent solves, follow button

---

## Phase 4: Real-time Features with Socket.io (Weeks 8-10)

> Goal: Add live notifications, study rooms, and real-time collaboration.

### 4.1 Socket.io Infrastructure

**Backend setup:**
- Install `socket.io` alongside Express
- Create `SocketManager` utility class
- Authentication middleware: verify JWT on socket connection
- Room management system

**Frontend setup:**
- Install `socket.io-client`
- Create `SocketContext` provider
- `useSocket` hook for component access

### 4.2 Notification System

**Notification types:**
| Event | Trigger |
|---|---|
| `submission_result` | Code submission accepted/wrong |
| `badge_earned` | User reaches milestone |
| `streak_update` | Daily streak increment |
| `leaderboard_change` | Rank goes up/down |
| `comment_reply` | Someone replies to your comment |
| `contest_start` | Upcoming contest starting |
| `contest_result` | Contest results published |

**Backend:**
- New model: `Notification`
  ```
  { userId, type, title, message, read: false, link, createdAt }
  ```
- Endpoints:
  ```
  GET /notification              -> user's notifications (paginated)
  PUT /notification/:id/read     -> mark as read
  PUT /notification/read-all     -> mark all as read
  GET /notification/unread-count -> count badge
  ```

**Frontend:**
- `NotificationBell` in navbar with unread count badge
- `NotificationDropdown` - scrollable list with mark-as-read
- `NotificationToast` - real-time toast via Socket.io
- `NotificationPage` - `/notifications` for full history

### 4.3 Study Rooms (Real-time Collaboration)

**Concept:** Users can create/join "rooms" to solve problems together in real-time.

**Backend:**
- New model: `StudyRoom`
  ```
  { name, hostId, participants: [userId], problemId, 
    isActive, maxParticipants: 6, createdAt }
  ```
- Socket events:
  ```
  room:create    -> create new room
  room:join      -> join existing room
  room:leave     -> leave room
  room:code_sync -> broadcast code changes
  room:chat      -> in-room text chat
  room:cursor    -> cursor position sharing
  ```

**Frontend:**
- New route: `/rooms`
- `StudyRoomsPage` - list of active rooms + create button
- `RoomCard` - room name, host, participants count, problem being solved
- `StudyRoomView` - split view: shared code editor + chat panel
- `CreateRoomModal` - select problem, set room name, invite link
- `ParticipantList` - avatars of people in room
- `RoomChat` - real-time text chat within room

---

## Phase 5: Contest System (Weeks 11-13)

> Goal: Run timed coding contests with scoring and rankings.

### 5.1 Backend: Contest Engine

**New models:**
```
Contest:
  { title, description, startTime, duration (minutes),
    problems: [{ problemId, points, order }],
    status: 'upcoming' | 'live' | 'ended',
    createdBy, maxParticipants }

ContestRegistration:
  { contestId, userId, registeredAt }

ContestSubmission:
  { contestId, userId, problemId, code, language,
    status, runtime, submittedAt, points }

ContestLeaderboard:
  (computed from ContestSubmissions)
```

**Endpoints:**
```
GET /contest                    -> list all contests
GET /contest/:id                -> contest details
POST /contest                   -> create contest (admin)
POST /contest/:id/register      -> register for contest
POST /contest/:id/submit        -> submit during contest
GET /contest/:id/leaderboard    -> live leaderboard
GET /contest/:id/results        -> final results
```

**Contest logic:**
- Timer starts at `startTime`, ends at `startTime + duration`
- Problems hidden until contest starts
- Submissions only accepted during contest window
- Scoring: first-solve bonus, penalty for wrong submissions (time-based)
- Anti-cheating: basic measures (submission pattern analysis)

### 5.2 Frontend: Contest Experience

**New routes:**
- `/contests` - contest listing
- `/contest/:id` - contest arena
- `/contest/:id/leaderboard` - live scoreboard

**Components:**
- `ContestList` - upcoming, live, past contests with tabs
- `ContestCard` - title, time, status badge, participant count, prize info
- `ContestArena` - timed problem list, code editor, submission panel
- `ContestTimer` - countdown timer (server-synced)
- `ContestLeaderboard` - real-time ranking updates via Socket.io
- `ContestResults` - final standings with medal animations

**Contest creation (admin):**
- Select problems from existing pool
- Set start time and duration
- Preview and publish

---

## Phase 6: Polish & Production Readiness (Weeks 14-16)

> Goal: Make it production-ready, performant, and maintainable.

### 6.1 Testing

- Add Vitest + React Testing Library for frontend
- Add Jest + Supertest for backend API tests
- Write tests for critical paths:
  - Auth flow (register, login, logout)
  - Problem CRUD
  - Code submission flow
  - Leaderboard updates
- Target: 70%+ coverage on core business logic

### 6.2 Performance Optimization

- **Code splitting:** Lazy load routes with `React.lazy` + `Suspense`
- **Image optimization:** Lazy load avatars, problem images
- **API optimization:** Pagination for all list endpoints
- **Caching:** Re-enable Redis for frequently accessed data
- **Bundle analysis:** Check and optimize bundle size

### 6.3 Error Handling & UX

- Global error boundary with fallback UI
- API error interceptor with user-friendly messages
- Loading skeletons for all data-fetching components
- Empty states for lists with no data
- Offline indicator and retry logic

### 6.4 Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation for all components
- Focus management in modals and dropdowns
- Color contrast compliance (WCAG AA)
- Screen reader testing

### 6.5 Documentation

- `.env.example` with all required variables
- `CONTRIBUTING.md` with setup instructions
- API endpoint documentation
- Component storybook (optional)

---

## Database Schema Changes

### User Model Updates
```diff
  User {
    firstName, lastName, emailId, age, role,
-   problemSolved: [ObjectId],
+   problemSolved: [{ problemId: ObjectId, solvedAt: Date }],
+   followers: [ObjectId],
+   following: [ObjectId],
+   avatar: String,
+   bio: String,
+   streak: { current: Number, longest: Number, lastSolvedDate: Date },
+   totalPoints: Number,
+   rank: Number,
    password, timestamps
  }
```

### New Models
```
Comment { problemId, userId, content, parentCommentId, upvotes[], timestamps }
Notification { userId, type, title, message, read, link, timestamps }
StudyRoom { name, hostId, participants[], problemId, isActive, maxParticipants }
Contest { title, description, startTime, duration, problems[], status, createdBy }
ContestRegistration { contestId, userId, registeredAt }
ContestSubmission { contestId, userId, problemId, code, language, status, runtime, points }
```

---

## New Routes Summary

| Route | Component | Auth | Phase |
|---|---|---|---|
| `/dashboard` | Progress Dashboard | User | 2 |
| `/leaderboard` | Leaderboard Page | Public | 3 |
| `/feed` | Activity Feed | User | 3 |
| `/user/:userId` | Public Profile | Public | 3 |
| `/notifications` | Notification Center | User | 4 |
| `/rooms` | Study Rooms | User | 4 |
| `/rooms/:roomId` | Study Room View | User | 4 |
| `/contests` | Contest Listing | Public | 5 |
| `/contest/:id` | Contest Arena | User | 5 |
| `/contest/:id/results` | Contest Results | Public | 5 |

---

## Backend API Additions

### Phase 2 - Stats
- `GET /user/stats/overview`
- `GET /user/stats/difficulty`
- `GET /user/stats/tags`
- `GET /user/stats/timeline`
- `GET /user/stats/heatmap`

### Phase 3 - Social
- `GET /leaderboard/*`
- `GET /comment/*`, `POST /comment`, `PUT /comment/*`, `DELETE /comment/*`
- `POST /user/follow/*`, `GET /user/followers/*`, `GET /user/following/*`
- `GET /feed`

### Phase 4 - Real-time
- `GET /notification/*`, `PUT /notification/*`
- Socket.io events: `room:*`, `notification:*`

### Phase 5 - Contests
- `GET /contest/*`, `POST /contest`, `POST /contest/*`

---

## New Dependencies

### Frontend
```json
{
  "framer-motion": "^12.x",
  "recharts": "^2.x",
  "socket.io-client": "^4.x",
  "react-hot-toast": "^2.x",
  "react-error-boundary": "^5.x",
  "date-fns": "^4.x",
  "react-day-picker": "^9.x"
}
```

### Backend
```json
{
  "socket.io": "^4.x",
  "node-cron": "^3.x"
}
```

---

## Success Metrics

| Metric | Current | Target |
|---|---|---|
| Page load animation | None | Framer Motion on all routes |
| Theme options | Light only | Dark + Light with smooth transition |
| User engagement features | Basic solve/submit | Dashboard, leaderboards, comments, rooms |
| Real-time features | None | Notifications, study rooms, live leaderboards |
| Contest capability | None | Weekly contests with automated scoring |
| Test coverage | 0% | 70%+ on core logic |
| Mobile experience | Basic responsive | Polished with animations and PWA |

---

## Implementation Order

```
Week 1-2:   Phase 1 (Animations + Theme + Bug Fixes)
Week 3-4:   Phase 2 (Dashboard + Stats API)
Week 5-7:   Phase 3 (Leaderboard + Comments + Following)
Week 8-10:  Phase 4 (Socket.io + Notifications + Study Rooms)
Week 11-13: Phase 5 (Contest System)
Week 14-16: Phase 6 (Testing + Performance + Polish)
```

**Estimated total: 16 weeks (4 months) to full next-level platform**

---

*This document is a living plan. Update as features are completed or priorities shift.*
