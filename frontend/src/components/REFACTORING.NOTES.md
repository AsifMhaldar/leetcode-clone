# Component & Landing Pages Refactoring Notes

All monolithic component files in `frontend/src/components/` and `frontend/src/landingPages/` have been refactored into modular folder structures following a consistent pattern:

```
ComponentName/
├── ComponentName.jsx          (main - clean composition of sub-components)
├── hooks/
│   └── useComponentName.js    (all state, logic, API calls, handlers)
├── components/
│   ├── SubComponentA.jsx      (individual UI sections)
│   ├── SubComponentB.jsx
│   └── ...
└── utils/                     (optional - schemas, helpers, constants)
    └── ...
```

## Shared Components (`src/shared/components/`)

Reusable UI components shared across multiple landing pages:

| Component | Used By | Purpose |
|-----------|---------|---------|
| `StatsSection` | Courses, Execise, Tutorial, Certifications | Stats card grid with icon, value, label |
| `SearchFilters` | Courses, Execise, Tutorial, Certifications | Search input, view toggle, category/level/price filters |
| `HeroSection` | Courses, Execise, Tutorial, Certifications | Gradient hero with badge, title, description, CTAs, stats |

```
ComponentName/
├── ComponentName.jsx          (main - clean composition of sub-components)
├── hooks/
│   └── useComponentName.js    (all state, logic, API calls, handlers)
├── components/
│   ├── SubComponentA.jsx      (individual UI sections)
│   ├── SubComponentB.jsx
│   └── ...
└── utils/                     (optional - schemas, helpers, constants)
    └── ...
```

---

## Refactored Components

### 1. AdminPanel/ (already refactored)
```
AdminPanel/
├── AdminPanel.jsx
├── hooks/useAdminPanel.js
├── utils/schema.js
└── components/
    ├── AdminPanelHeader.jsx
    ├── BasicInfoFields.jsx
    ├── TestCasesSection.jsx
    ├── CodeTemplatesSection.jsx
    └── SubmitButton.jsx
```

### 2. AdminUpdate/ (already refactored)
```
AdminUpdate/
├── AdminUpdate.jsx
├── hooks/useAdminUpdate.js
├── utils/colors.js
└── components/
    ├── AdminUpdateHeader.jsx
    ├── AdminUpdateFilters.jsx
    ├── GuidelinesBanner.jsx
    └── ProblemCard.jsx
```

### 3. AdminDelete/ (already refactored)
```
AdminDelete/
├── AdminDelete.jsx
├── hooks/useAdminDelete.js
├── utils/colors.js
└── components/
    ├── AdminDeleteHeader.jsx
    ├── AdminDeleteFilters.jsx
    ├── ProblemCard.jsx
    └── WarningBanner.jsx
```

### 4. AdminUpload/ (refactored)
**Original:** `AdminUpload.jsx` (368 lines)
**Split into:** 8 files

| File | Responsibility |
|------|---------------|
| `AdminUpload.jsx` | Main component - clean composition |
| `hooks/useAdminUpload.js` | State, form, upload logic, formatFileSize, formatDuration |
| `components/AdminUploadHeader.jsx` | Nav bar with back button |
| `components/FileUploadArea.jsx` | File input, drop zone, selected file info |
| `components/UploadProgress.jsx` | Progress bar during upload |
| `components/UploadStatus.jsx` | Error + success messages |
| `components/UploadButton.jsx` | Submit button |
| `components/UploadGuidelines.jsx` | Upload guidelines card |

### 5. AdminVideo/ (refactored)
**Original:** `AdminVideo.jsx` (249 lines)
**Split into:** 6 files

| File | Responsibility |
|------|---------------|
| `AdminVideo.jsx` | Main component with loading/error states |
| `hooks/useAdminVideo.js` | State, fetchProblems, handleDelete |
| `components/AdminVideoHeader.jsx` | Nav bar with refresh + back |
| `components/StatsCard.jsx` | Total problems count |
| `components/ProblemsTable.jsx` | Problems list table + empty state |
| `components/VideoTipsCard.jsx` | Tips info card |

### 6. Analytics/ (refactored)
**Original:** `Analytics.jsx` (288 lines)
**Split into:** 8 files

| File | Responsibility |
|------|---------------|
| `Analytics.jsx` | Main component |
| `hooks/useAnalytics.js` | Time range state |
| `data/analyticsData.js` | Static demo data (extracted from component) |
| `components/AnalyticsHeader.jsx` | Header with filter + export |
| `components/OverviewCards.jsx` | 6 overview stat cards |
| `components/ChartsGrid.jsx` | User growth + language distribution charts |
| `components/PerformanceMetrics.jsx` | 4 metric cards |
| `components/ActivitySection.jsx` | Difficulty distribution + recent activity |

### 7. ChatAi/ (refactored)
**Original:** `ChatAi.jsx` (88 lines)
**Split into:** 4 files

| File | Responsibility |
|------|---------------|
| `ChatAi.jsx` | Main component |
| `hooks/useChatAi.js` | Messages state, form, onSubmit, scroll ref |
| `components/MessageList.jsx` | Chat message list |
| `components/ChatInput.jsx` | Input form |

### 8. Editorial/ (refactored)
**Original:** `Editorial.jsx` (107 lines)
**Split into:** 3 files

| File | Responsibility |
|------|---------------|
| `Editorial.jsx` | Main component |
| `hooks/useVideoPlayer.js` | isPlaying, currentTime, togglePlayPause, formatTime, handleSeek |
| `components/VideoPlayer.jsx` | Video element + controls overlay |

### 9. Profile/ (refactored)
**Original:** `Profile.jsx` (923 lines)
**Split into:** 10 files

| File | Responsibility |
|------|---------------|
| `Profile.jsx` | Main component with 3-column grid layout |
| `hooks/useProfile.js` | All state, fetch data, edit form handlers, save/cancel |
| `utils/profileUtils.js` | calculateStreak, generateStreakCalendar, generateEmptyCalendar, formatTimeAgo, getStreakColor, difficultyColors |
| `components/ProfileNav.jsx` | Top navigation bar |
| `components/ProfileHeader.jsx` | Avatar + info (view/edit modes) + action buttons |
| `components/StatsSidebar.jsx` | Community stats + languages (left column) |
| `components/ProgressCard.jsx` | Solved problems + ProgressSection bars (middle column) |
| `components/BadgesCard.jsx` | Badges display |
| `components/RecentActivity.jsx` | Recent submissions list |
| `components/StreakCalendar.jsx` | Streak calendar grid + stats |

### 10. SubmissionHistory/ (refactored)
**Original:** `SubmissionHistory.jsx` (213 lines)
**Split into:** 4 files

| File | Responsibility |
|------|---------------|
| `SubmissionHistory.jsx` | Main component with loading/error/empty states |
| `hooks/useSubmissionHistory.js` | State, fetch, getStatusColor, formatMemory, formatDate, getSafeValue |
| `components/SubmissionTable.jsx` | Table display |
| `components/CodeModal.jsx` | Code view modal |

### 11. UpdateProblem/ (refactored)
**Original:** `UpdateProblem.jsx` (754 lines)
**Split into:** 10 files

| File | Responsibility |
|------|---------------|
| `UpdateProblem.jsx` | Main component |
| `hooks/useUpdateProblem.js` | State, form, fetchProblem, onSubmit, field arrays |
| `utils/schema.js` | Zod validation schema |
| `components/UpdateProblemHeader.jsx` | Nav bar with refresh + back |
| `components/ProblemInfoCard.jsx` | Current problem info display |
| `components/UpdateStatus.jsx` | Error + success messages |
| `components/BasicInfoFields.jsx` | Title, description, difficulty, tags |
| `components/TestCasesSection.jsx` | Visible + hidden test cases with add/remove |
| `components/CodeTemplatesSection.jsx` | C++, Java, JavaScript code editors |
| `components/UpdateSubmitButton.jsx` | Submit button |

### 12. UserManagement/ (refactored)
**Original:** `userManagement.jsx` (399 lines)
**Split into:** 5 files

| File | Responsibility |
|------|---------------|
| `UserManagement.jsx` | Main component with loading state |
| `hooks/useUserManagement.js` | State, fetch, CRUD, search/filter, pagination, helpers |
| `components/StatsCards.jsx` | 4 stat cards (total, admins, active, solutions) |
| `components/SearchControls.jsx` | Search input + role filter + refresh |
| `components/UsersTable.jsx` | Table + pagination + role select + delete |

---

## Landing Pages Refactoring

All monolithic landing page files in `frontend/src/landingPages/` have been refactored into modular folder structures.

### 13. LandingPage/ (refactored)
**Original:** `LandingPage.jsx` (377 lines)
**Split into:** 10 files

| File | Responsibility |
|------|---------------|
| `LandingPage.jsx` | Main composition - layout with Outlet |
| `hooks/useLandingPage.js` | Sidebar state, scroll handler, section label |
| `data/navigationSections.js` | Navigation sections array |
| `data/programmingLanguages.js` | Programming languages array |
| `data/stats.js` | Stats data array |
| `components/StickyNav.jsx` | Top navigation bar |
| `components/Sidebar.jsx` | Desktop sidebar with nav + promo card |
| `components/MobileSidebar.jsx` | Mobile sidebar overlay |
| `components/Breadcrumb.jsx` | Breadcrumb navigation |
| `components/Footer.jsx` | Footer with links |

### 14. Execise/ (refactored)
**Original:** `Execise.jsx` (838 lines)
**Split into:** 6 files (Hero, Stats, SearchFilters → shared)

| File | Responsibility |
|------|---------------|
| `Execise.jsx` | Main composition |
| `hooks/useExecise.js` | Filter state, search, viewMode, sortBy, helpers |
| `data/exercises.js` | Exercises, categories, difficulties, stats data |
| `components/ExerciseCard.jsx` | Individual exercise card |
| `components/ExerciseGrid.jsx` | Grid/list, results count, empty state, load more |
| `components/RecommendedPath.jsx` | Recommended learning path section |
| `components/SkillProgress.jsx` | Skill progress cards |

### 15. Tutorial/ (refactored)
**Original:** `Tutorial.jsx` (795 lines)
**Split into:** 7 files (Hero, Stats, SearchFilters → shared)

| File | Responsibility |
|------|---------------|
| `Tutorial.jsx` | Main composition |
| `hooks/useTutorial.js` | Filter state, search, viewMode, expand, helpers |
| `data/tutorials.js` | Tutorials, categories, levels, stats data |
| `components/FeaturedTrending.jsx` | Featured & trending tutorials |
| `components/TutorialCard.jsx` | Individual tutorial card |
| `components/TutorialGrid.jsx` | Grid/list, empty state, load more |
| `components/Newsletter.jsx` | Newsletter section |

### 16. Certifications/ (refactored)
**Original:** `Certifications.jsx` (938 lines)
**Split into:** 10 files (Hero, Stats, SearchFilters → shared)

| File | Responsibility |
|------|---------------|
| `Certifications.jsx` | Main composition |
| `hooks/useCertifications.js` | Filter state, search, expand, getLevelBadge |
| `data/certifications.js` | Certifications, categories, levels, testimonials, FAQs, stats |
| `components/FeaturedCert.jsx` | Featured certification banner |
| `components/CertCard.jsx` | Individual certification card |
| `components/CertGrid.jsx` | Grid, load more, empty state |
| `components/WhyCertified.jsx` | Why get certified section |
| `components/Testimonials.jsx` | Testimonials section |
| `components/FAQ.jsx` | FAQ section |
| `components/CertCTA.jsx` | Call to action |

### 17. Courses/ (refactored)
**Original:** `Courses.jsx` (1084 lines)
**Split into:** 7 files (Hero, Stats, SearchFilters → shared)

| File | Responsibility |
|------|---------------|
| `Courses.jsx` | Main composition |
| `hooks/useCourses.js` | Filter state, search, viewMode, expand, price filter, helpers |
| `data/courses.js` | Courses, categories, levels, price filters, stats data |
| `components/FeaturedCourse.jsx` | Featured course banner |
| `components/CourseCard.jsx` | Individual course card |
| `components/CourseGrid.jsx` | Grid/list, load more, empty state |
| `components/WhyChooseUs.jsx` | Why choose us section |
| `components/CourseCTA.jsx` | Call to action |

---

## Import Updates

### App.jsx
```diff
- import AdminUpload from "./components/AdminUpload";
+ import AdminUpload from "./components/AdminUpload/AdminUpload";

- import AdminVideo from "./components/AdminVideo";
+ import AdminVideo from "./components/AdminVideo/AdminVideo";

- import Profile from "./components/Profile";
+ import Profile from "./components/Profile/Profile";

- import Analytics from "./components/Analytics.jsx";
+ import Analytics from "./components/Analytics/Analytics";

- import UpdateProblem from "./components/UpdateProblem";
+ import UpdateProblem from "./components/UpdateProblem/UpdateProblem";

- import UserManagement from "./components/userManagement.jsx";
+ import UserManagement from "./components/UserManagement/UserManagement";

- import LandingPage from './landingPages/LandingPage.jsx';
+ import LandingPage from './landingPages/LandingPage/LandingPage.jsx';

- import Execise from "./landingPages/Execise.jsx";
+ import Execise from "./landingPages/Execise/Execise.jsx";

- import Tutorial from "./landingPages/Tutorial.jsx";
+ import Tutorial from "./landingPages/Tutorial/Tutorial.jsx";

- import Certifications from './landingPages/Certifications.jsx';
+ import Certifications from './landingPages/Certifications/Certifications.jsx';

- import Courses from './landingPages/Courses.jsx';
+ import Courses from './landingPages/Courses/Courses.jsx';
```

### pages/ProblemPage.jsx
```diff
- import ChatAi from '../components/ChatAi';
+ import ChatAi from '../components/ChatAi/ChatAi';

- import Editorial from '../components/Editorial';
+ import Editorial from '../components/Editorial/Editorial';

- import SubmissionHistory from "../components/SubmissionHistory";
+ import SubmissionHistory from "../components/SubmissionHistory/SubmissionHistory";
```

---

## Pattern Summary

| Concern | Location |
|---------|----------|
| Component state & business logic | `hooks/use*.js` |
| Validation schemas | `utils/schema.js` |
| Helper functions & constants | `utils/*.js` |
| UI sections | `components/*.jsx` |
| Main composition | `ComponentName/ComponentName.jsx` |
