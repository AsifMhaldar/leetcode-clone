# Phase 2: Progress Tracking Dashboard — Implementation Plan

> **Goal:** Give users real insights into their coding journey with charts and stats.
> **Timeline:** Weeks 3-4 (original estimate)
> **Status:** ~90% complete — backend fully done, frontend has bugs to fix

---

## 2.1 Backend: Stats API — ✅ COMPLETE

All 5 endpoints fully implemented with real MongoDB aggregation logic.

### Existing Endpoints

| Endpoint | Handler | Returns |
|---|---|---|
| `GET /user/stats/overview` | `getStatsOverview` | totalSolved, totalProblems, difficulty breakdown, acceptanceRate, rank, totalUsers, currentStreak, longestStreak, daysSinceJoin |
| `GET /user/stats/difficulty` | `getStatsDifficulty` | distribution[] with { name, solved, total, color } per difficulty |
| `GET /user/stats/tags` | `getStatsTags` | tags[] with { tag, solved, total, percentage } sorted by desc |
| `GET /user/stats/timeline` | `getStatsTimeline` | timeline[] with { date, label, total, accepted } per day, accepts `?days=` query param (default 30, max 365) |
| `GET /user/stats/heatmap` | `getStatsHeatmap` | calendar[] with { date, count, level } for last 365 days + totalActiveDays |

### Files
- `backend/src/controllers/userStats.js` — Controller (lines 1-283)
- `backend/src/Routes/userStats.js` — Route definitions
- `frontend/src/api/userStats.js` — Axios client functions
- `frontend/src/pages/Dashboard/hooks/useStats.js` — React Query hooks (60s refetch)

### No changes needed for backend

---

## 2.2 Frontend: Dashboard Page — ✅ COMPLETE (with bugs)

### Route
- `/dashboard` — Protected (auth required), renders `Dashboard` component
- File: `frontend/src/App.jsx:59`

### Components

| Component | Status | Issues |
|---|---|---|
| `Dashboard.jsx` | ✅ Complete | Main layout — Header > OverviewCards > DifficultyChart + TagRadar > SolveTimeline > SubmissionHeatmap + WeeklyGoal |
| `OverviewCards.jsx` | ✅ Complete | 6 KPI cards: Problems Solved, Day Streak, Acceptance Rate, Global Rank, Days Active, Total Submissions |
| `DifficultyChart.jsx` | ✅ Complete | Recharts donut chart — easy/medium/hard breakdown |
| `TagRadar.jsx` | ✅ Complete | Recharts radar chart — topic strengths |
| `SolveTimeline.jsx` | ✅ Complete | Recharts area chart — submissions over time (7/30/90/365 day toggle) |
| `SubmissionHeatmap.jsx` | ✅ Complete | GitHub-style 365-day heatmap (pure CSS grid) |
| `WeeklyGoal.jsx` | ⚠️ BUG | Uses `totalSolved` (all-time) instead of actual weekly submission count |

### Files
```
frontend/src/pages/Dashboard/
├── Dashboard.jsx
├── Dashboard.scss
├── constants.js
├── hooks/
│   └── useStats.js
└── components/
    ├── OverviewCards.jsx + OverviewCards.scss
    ├── DifficultyChart.jsx
    ├── TagRadar.jsx
    ├── SubmissionHeatmap.jsx
    ├── SolveTimeline.jsx
    ├── WeeklyGoal.jsx
    └── DashboardCharts.scss
```

---

## 2.3 Enhanced Profile Page — ✅ COMPLETE (with simulated data)

### Components

| Component | Status | Issues |
|---|---|---|
| `HeroProfile.jsx` | ✅ Complete | Real rank, KPI stat cards, edit mode, social links |
| `StatsOverview.jsx` | ⚠️ MINOR | Discussions count hardcoded to `0` (line 101) |
| `ActivityCalendar.jsx` | ✅ Complete | Monthly heatmap, coding trend, monthly summary, achievement badges |
| `AnalyticsCharts.jsx` | ⚠️ SIMULATED | Acceptance trend (line 53) uses random fluctuations around real rate. Rank progress (lines 63-77) generates random history from current rank |
| `TimelineActivity.jsx` | ✅ Complete | Vertical timeline of recent submissions |
| `StreakGoals.jsx` | ✅ Complete | Streak cards, weekly goal ring, badges |

---

## Remaining Work (Bugs to Fix)

### Bug 1: WeeklyGoal uses all-time total instead of weekly count
**File:** `frontend/src/pages/Dashboard/components/WeeklyGoal.jsx:18`
**Current:** `const solved = data?.totalSolved || 0;`
**Fix:** Should filter timeline data for the current week (Mon-Sun) and count submissions in that range.
**Approach:** Use the `useStatsTimeline` hook with `days=7`, then count accepted submissions from Monday to today.

### Bug 2: Acceptance trend is simulated
**File:** `frontend/src/components/Profile/components/AnalyticsCharts.jsx:53`
**Current:** Generates `baseRate + Math.random() * 10 - 5` for each day
**Fix:** Use real daily acceptance data from `GET /user/stats/timeline?days=30` — compute `(accepted / total) * 100` for each day.
**Approach:** Accept timeline data as prop, compute daily acceptance rate from `accepted/total` ratio per day.

### Bug 3: Rank progress is simulated
**File:** `frontend/src/components/Profile/components/AnalyticsCharts.jsx:63-77`
**Current:** Creates random rank values `rank + Math.floor(Math.random() * 2000) - 1000`
**Fix:** Two options:
  - **Option A:** Track rank history in a new `RankHistory` collection (update on each accepted submission)
  - **Option B (simpler):** Use submission count over time as a proxy — more submissions = higher engagement = better implied rank. Show `problemsSolved` over time instead.
**Recommended:** Option B — avoids new model/collection, still shows meaningful progress.

### Bug 4: Discussions count hardcoded to 0
**File:** `frontend/src/components/Profile/components/StatsOverview.jsx:101`
**Current:** `stat.value = '0';` for discussions
**Fix:** Either remove this stat card (discussions feature doesn't exist yet), or replace with "Total Submissions" or another meaningful metric.

---

## Model Consideration (Optional Enhancement)

The User model stores `problemSolved: [ObjectId]` without timestamps. All temporal analytics query the Submission collection as a workaround.

**Optional improvement:** Add `solvedAt` to each entry:
```diff
- problemSolved: [ObjectId]
+ problemSolved: [{ problemId: ObjectId, solvedAt: Date }]
```

**Tradeoff:** Requires data migration for existing users. Current workaround (querying Submissions) works correctly, so this is **low priority** unless performance becomes an issue.

---

## Implementation Order

| Priority | Task | Files | Effort |
|---|---|---|---|
| **HIGH** | Fix WeeklyGoal weekly count | `WeeklyGoal.jsx`, `useStats.js` | Small |
| **HIGH** | Fix acceptance trend (real data) | `AnalyticsCharts.jsx` | Small |
| **MEDIUM** | Fix rank progress (use solved count over time) | `AnalyticsCharts.jsx` | Small |
| **LOW** | Fix discussions count (remove or replace card) | `StatsOverview.jsx` | Trivial |
| **LOW** | Add `solvedAt` to problemSolved (optional) | `user.js` model, migration script | Medium |

---

## Files to Modify

| File | Change |
|---|---|
| `frontend/src/pages/Dashboard/components/WeeklyGoal.jsx` | Fix to use weekly timeline data |
| `frontend/src/components/Profile/components/AnalyticsCharts.jsx` | Replace simulated data with real timeline data |
| `frontend/src/components/Profile/components/StatsOverview.jsx` | Fix discussions count |

---

*This plan is extracted from nextlevel.md Phase 2 and updated to reflect current implementation status.*
