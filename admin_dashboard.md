# Admin Dashboard — Live Data Implementation Plan

## Overview
Replace all hardcoded dashboard data with real MongoDB queries via a single optimized API endpoint, consumed by React Query with 30-second auto-refresh, visualized with Recharts.

---

## Packages to Install
```bash
cd frontend
npm install @tanstack/react-query recharts
```

| Package | Purpose |
|---|---|
| `@tanstack/react-query` | Data fetching, caching, auto-refresh (30s polling) |
| `recharts` | Charting library (PieChart, BarChart, AreaChart) |

---

## Backend (3 files)

### 1. Create `backend/src/controllers/adminDashboard.js`

Single `getDashboardStats` controller — one `Promise.all` with **13 parallel queries**.

**Queries performed:**
- `Problem.countDocuments()` — total problems
- `User.countDocuments()` — total users
- `Submission.countDocuments()` — total submissions
- `Submission.countDocuments({ status: 'accepted' })` — success rate numerator
- `Problem.countDocuments({ _id: { $gte: ObjectId.createFromTime(...) } })` — problems this month (uses ObjectId timestamp, no schema change)
- `Problem.countDocuments({ _id: { $gte: ..., $lt: ... } })` — problems last month
- `User.countDocuments({ createdAt: { $gte: thisMonthStart } })` — users this month
- `User.countDocuments({ createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd } })` — users last month
- `Submission.countDocuments({ createdAt: { $gte: thisMonthStart } })` — submissions this month
- `Submission.countDocuments({ createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd } })` — submissions last month
- `Submission.find({}).sort({ createdAt: -1 }).limit(10).populate(...)` — recent 10 submissions
- `Problem.aggregate([{ $group: { _id: '$difficulty', count: { $sum: 1 } } }])` — difficulty distribution
- `Submission.aggregate(...)` — 7-day submission trends (gap-filled)
- `User.aggregate(...)` — 30-day user growth (gap-filled)

**Key design decisions:**
- All 13 queries run in parallel via `Promise.all` — single round-trip
- Problem has no timestamps → use `ObjectId.createFromTime()` for date filtering
- Charts are gap-filled (always 7 or 30 data points, missing days get `count: 0`)
- Difficulty distribution always returns all 3 keys (easy/medium/hard)
- Uses `.lean()` on populate for performance
- Response via `res.status(200).send(data)` — matches existing backend convention

**Response shape:**
```json
{
  "stats": {
    "totalProblems": 42,
    "totalUsers": 187,
    "totalSubmissions": 3421,
    "successRate": 72,
    "problemsChange": 12,
    "usersChange": 8,
    "submissionsChange": 23
  },
  "recentActivity": [
    {
      "_id": "64a...",
      "userName": "John Doe",
      "problemTitle": "Two Sum",
      "status": "accepted",
      "createdAt": "2026-07-25T10:30:00.000Z"
    }
  ],
  "difficultyDistribution": [
    { "name": "Easy", "value": 15, "color": "#22c55e" },
    { "name": "Medium", "value": 20, "color": "#facc15" },
    { "name": "Hard", "value": 7, "color": "#ef4444" }
  ],
  "submissionTrends": [
    { "date": "2026-07-19", "label": "Sat, Jul 19", "count": 45 }
  ],
  "userGrowth": [
    { "date": "2026-06-26", "label": "Jun 26", "count": 2 }
  ]
}
```

### 2. Create `backend/src/Routes/adminDashboard.js`

```js
GET /dashboard  →  adminMiddleware  →  getDashboardStats
```

Follows existing Router pattern (`express.Router()`, middleware + controller, `module.exports = router`).

### 3. Modify `backend/src/index.js`

Add import + mount:
```js
const adminDashboardRouter = require('./Routes/adminDashboard');
// ...
app.use('/admin', adminDashboardRouter);
```

Full endpoint: `GET {VITE_API_URL}/admin/dashboard`

---

## Frontend (11 files)

### 4. Modify `frontend/src/main.jsx`

Wrap `<App />` with `<QueryClientProvider>`:
```jsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Inside render: <QueryClientProvider client={queryClient}><App /></QueryClientProvider>
```

### 5. Create `frontend/src/api/adminDashboard.js`

First file in a new `api/` directory:
```js
import axiosClient from '../utils/axiosClient';
export const fetchDashboardData = async () => {
  const { data } = await axiosClient.get('/admin/dashboard');
  return data;
};
```

### 6. Create `frontend/src/pages/Admin/hooks/useAdminDashboard.js`

React Query hook with 30s auto-refresh:
```js
useQuery({
  queryKey: ['adminDashboard'],
  queryFn: fetchDashboardData,
  staleTime: 30 * 1000,
  refetchInterval: 30 * 1000,
})
```

Returns: `stats`, `recentActivity`, `difficultyDistribution`, `submissionTrends`, `userGrowth`, `isLoading`, `isError`, `error`, `refetch`

### 7. Create `frontend/src/pages/Admin/components/Chart.scss`

Shared chart styling for all 3 chart components:
- `@include glass-card` for glassmorphism container
- Skeleton shimmer animation (gradient pulse)
- Responsive padding via `@include sm/md`
- Custom tooltip styling using CSS custom properties

### 8. Create `frontend/src/pages/Admin/components/DifficultyChart.jsx`

Recharts **PieChart** (donut style):
- `Pie` with `innerRadius={60}` `outerRadius={110}`
- Custom label showing percentages inside slices
- Tooltip with problem count + percentage
- Legend at bottom
- Colors: Easy=#22c55e, Medium=#facc15, Hard=#ef4444

### 9. Create `frontend/src/pages/Admin/components/SubmissionTrendsChart.jsx`

Recharts **BarChart**:
- 7 bars (one per day), maxBarSize=48
- Blue→purple gradient fill (`#60a5fa` → `#a855f7`)
- Rounded top corners (`radius={[6, 6, 0, 0]}`)
- Grid lines using `var(--glass-border)`
- X-axis: short day labels, Y-axis: count

### 10. Create `frontend/src/pages/Admin/components/UserGrowthChart.jsx`

Recharts **AreaChart** (filled area):
- Green stroke (#22c55e) with gradient fill to transparent
- `interval={4}` on X-axis (every 5th label shown)
- Custom dots (r=3) and active dots (r=5 with border)
- Tooltip shows "New Users" label

### 11. Create `frontend/src/pages/Admin/components/RecentActivityLive.jsx`

Live activity feed component:
- Status config map: accepted (green), wrong (red), error (yellow), pending (blue)
- `formatTimeAgo()` helper (Just now → Xm ago → Xh ago → Xd ago → date)
- Loading skeleton (5 shimmer rows)
- Empty state message
- Reuses existing `RecentActivity.scss`

### 12. Modify `frontend/src/pages/Admin/components/StatsCards.jsx`

**Complete rewrite** — no longer imports hardcoded `stats`:
- Receives `stats`, `isLoading`, `isError` as props
- `StatsCardSkeleton` component (4 shimmer cards)
- Error state with retry message
- `statsConfig` array mapping keys → labels → icons
- Large number formatting (1000 → "1.0k", 1000000 → "1.0M")
- `TrendingUp` / `TrendingDown` icons for trend direction
- Success Rate shown as percentage

### 13. Modify `frontend/src/pages/Admin/components/StatsCards.scss`

Append skeleton styles:
- `&__card--skeleton` — glass card with shimmer
- `&__skeleton-line` — animated gradient bars (label/value/trend sizes)
- `&__skeleton-icon` — animated gradient circle
- `&__error` — red-tinted glass card with error message
- `@keyframes skeleton-shimmer` — background-position animation

### 14. Modify `frontend/src/pages/Admin/components/RecentActivity.scss`

Append new styles:
- `&__status` — inline badge with `border-radius: $radius-full`
  - `--accepted`: green bg/text
  - `--wrong`: red bg/text
  - `--error`: yellow bg/text
  - `--pending`: blue bg/text
- `&__empty` — centered, muted text
- Skeleton styles for loading state

### 15. Modify `frontend/src/pages/Admin/Admin.jsx`

Integrate all live components:
```jsx
const { stats, recentActivity, difficultyDistribution, submissionTrends, userGrowth, isLoading, isError } = useAdminDashboard();

// Render order:
<StatsCards stats={stats} isLoading={isLoading} isError={isError} />
<QuickActions />
<DifficultyChart data={difficultyDistribution} isLoading={isLoading} />
<div className="admin-page__charts-grid">
  <SubmissionTrendsChart data={submissionTrends} isLoading={isLoading} />
  <UserGrowthChart data={userGrowth} isLoading={isLoading} />
</div>
<AdminOptionsGrid />
<RecentActivityLive activities={recentActivity} isLoading={isLoading} />
```

### 16. Modify `frontend/src/pages/Admin/Admin.scss`

Add chart layout classes:
```scss
&__charts-single { margin-bottom: 1.5rem; }
&__charts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  @include md { grid-template-columns: 1fr 1fr; gap: 2rem; }
}
```

### 17. Modify `frontend/src/pages/Admin/constants.js`

Remove hardcoded arrays (lines 89-101):
- Delete `stats` array
- Delete `recentActivity` array
- Keep: all title constants, `adminOptions`, `activityIconMap`, `STATS_MONTH_SUFFIX`

---

## File Inventory

### New Files (9)

| # | Path | Purpose |
|---|---|---|
| 1 | `backend/src/controllers/adminDashboard.js` | Dashboard controller (13 parallel queries) |
| 2 | `backend/src/Routes/adminDashboard.js` | Express Router (GET /dashboard) |
| 3 | `frontend/src/api/adminDashboard.js` | Axios fetch function |
| 4 | `frontend/src/pages/Admin/hooks/useAdminDashboard.js` | React Query hook (30s refresh) |
| 5 | `frontend/src/pages/Admin/components/Chart.scss` | Shared chart styling |
| 6 | `frontend/src/pages/Admin/components/DifficultyChart.jsx` | PieChart (difficulty) |
| 7 | `frontend/src/pages/Admin/components/SubmissionTrendsChart.jsx` | BarChart (7-day) |
| 8 | `frontend/src/pages/Admin/components/UserGrowthChart.jsx` | AreaChart (30-day) |
| 9 | `frontend/src/pages/Admin/components/RecentActivityLive.jsx` | Live activity feed |

### Modified Files (8)

| # | Path | Change |
|---|---|---|
| 1 | `backend/src/index.js` | Add import + mount for adminDashboardRouter |
| 2 | `frontend/src/main.jsx` | Add QueryClientProvider wrapper |
| 3 | `frontend/src/pages/Admin/Admin.jsx` | Integrate hook + all new components |
| 4 | `frontend/src/pages/Admin/Admin.scss` | Add chart grid layout classes |
| 5 | `frontend/src/pages/Admin/constants.js` | Remove hardcoded stats/activity |
| 6 | `frontend/src/pages/Admin/components/StatsCards.jsx` | Rewrite: props-driven, skeleton, error |
| 7 | `frontend/src/pages/Admin/components/StatsCards.scss` | Add skeleton shimmer styles |
| 8 | `frontend/src/pages/Admin/components/RecentActivity.scss` | Add status badges + skeleton |

---

## Execution Order

```
1.  npm install @tanstack/react-query recharts
2.  Create backend/src/controllers/adminDashboard.js
3.  Create backend/src/Routes/adminDashboard.js
4.  Modify backend/src/index.js (mount route)
5.  Modify frontend/src/main.jsx (QueryClientProvider)
6.  Create frontend/src/api/adminDashboard.js
7.  Create frontend/src/pages/Admin/hooks/useAdminDashboard.js
8.  Create frontend/src/pages/Admin/components/Chart.scss
9.  Create frontend/src/pages/Admin/components/DifficultyChart.jsx
10. Create frontend/src/pages/Admin/components/SubmissionTrendsChart.jsx
11. Create frontend/src/pages/Admin/components/UserGrowthChart.jsx
12. Modify frontend/src/pages/Admin/components/StatsCards.jsx + StatsCards.scss
13. Create frontend/src/pages/Admin/components/RecentActivityLive.jsx
14. Modify frontend/src/pages/Admin/components/RecentActivity.scss
15. Modify frontend/src/pages/Admin/Admin.jsx + Admin.scss
16. Modify frontend/src/pages/Admin/constants.js (remove hardcoded data)
17. Build verification (npm run build)
```

---

## Notes

- **No Redis** — re-comment if any Redis references appear
- **No TypeScript** — all JavaScript/JSX
- **Problem timestamps** — use `ObjectId.createFromTime()` (schema has no `{ timestamps: true }`)
- **User/Submission timestamps** — use native `createdAt` from `{ timestamps: true }`
- **CORS** — no changes needed (same Express server)
- **Cookie auth** — `axiosClient` has `withCredentials: true`, admin middleware reads `req.cookies.token`
- **Recharts + CSS variables** — `contentStyle` on Tooltip uses `var(--xxx)` which works because browser resolves inline styles
- **React Query + StrictMode** — v5 is fully compatible with React 19 StrictMode
