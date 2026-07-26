# Phase 1: Foundation & Animations — Detailed Plan

## Overview
**Duration:** Weeks 1-2  
**Goal:** Replace all CSS animations with Framer Motion, add dark/light theme, fix critical bugs  
**Total files to modify:** ~30  
**Total new files:** ~7 (motion.js, ThemeContext.jsx, useTheme.js, ThemeToggle.jsx, .env.example x2, AnimatedPage.jsx)

---

## Part A: Framer Motion Migration

### A1. Install & Create Animation Utilities

**Install:**
```bash
cd frontend && npm install framer-motion
```

**New files:**
- `frontend/src/utils/motion.js` — shared animation variants (fade, slide, stagger, spring configs)
- `frontend/src/components/AnimatedPage.jsx` — reusable page transition wrapper with `AnimatePresence`

### A2. Route-Level Transitions (App.jsx)

**Modify:** `frontend/src/App.jsx`
- Wrap all `<Routes>` in `<AnimatePresence mode="wait">`
- Wrap each page component in `<AnimatedPage>` for enter/exit transitions
- Add `useLocation` key to trigger transitions on route change

### A3. Remove All `<style jsx>` / `<style>` Blocks (11 files)

Every one of these will be replaced with Framer Motion or Tailwind:

| # | File | Lines | What to do |
|---|---|---|---|
| 1 | `pages/Login/Login.jsx` | 61-89 | Remove `<style jsx>` entirely, use Framer Motion for all 13 keyframes |
| 2 | `pages/Signup/Signup.jsx` | 59-87 | Same as Login (identical block) |
| 3 | `pages/Homepage/Homepage.jsx` | 59-77 | Remove, replace with `motion.div` fade-in variants |
| 4 | `pages/Admin/Admin.jsx` | 31-46 | Remove, use motion variants |
| 5 | `components/AdminPanel/AdminPanel.jsx` | 65-90 | Remove, use motion variants |
| 6 | `components/AdminUpload/AdminUpload.jsx` | 78-103 | Remove, use motion variants |
| 7 | `components/AdminDelete/AdminDelete.jsx` | 110-132 | Remove (also has `.line-clamp-2` utility — move to Tailwind) |
| 8 | `components/AdminUpdate/AdminUpdate.jsx` | 106-128 | Same as AdminDelete |
| 9 | `components/AdminVideo/AdminVideo.jsx` | 61-68 | Remove `.line-clamp-1` utility — move to Tailwind |
| 10 | `components/UpdateProblem/UpdateProblem.jsx` | 84-109 | Remove plain `<style>` block |
| 11 | `landingPages/LandingPage/LandingPage.jsx` | 41 (dangerouslySetInnerHTML) | Remove, use motion variants |

### A4. Component-Level Animation Migration

**Login & Signup (biggest changes):**
- Background orbs (10 elements): Replace CSS infinite animations with `motion.div` `animate={{ y: [0, -20, 0], rotate: [0, 180, 0] }}` with `repeat: Infinity`
- Form stagger: Use `motion.div` with `variants={{ visible: { transition: { staggerChildren: 0.1 } } }}`
- Error shake: Replace with `motion.div animate={{ x: [0, -8, 8, -8, 8, 0] }}`
- All child components (AuthBranding, LoginForm, SignupForm): Convert class-based animations to `motion.div` with `initial`/`animate`/`exit`

**Homepage:**
- `ProblemCard` staggered entrance: Replace `animationDelay` CSS with Framer Motion `staggerChildren`
- `StatCard` count-up: Add `useInView` + animated counter
- Section fade-in: Add `motion.div` with `whileInView`

**ProblemPage:**
- Tab content transitions: Wrap tab content in `<AnimatePresence mode="wait">` with `motion.div` fade
- Panel swap animation: Add `layoutId` for smooth tab indicator sliding

**Admin pages (all admin CRUD components):**
- Replace `fade-in-up` with `motion.div` variants
- Replace `shake` with motion shake variant
- Staggered card lists in AdminDelete, AdminUpdate

**Landing Pages:**
- Section scroll reveal: Wrap sections in `motion.div` with `whileInView={{ opacity: 1, y: 0 }}`
- Card hover: Replace CSS `hover:scale-105` with `whileHover={{ scale: 1.05 }}`

### A5. New Animation Features (Additions, not migrations)

- **Button micro-interactions:** `whileTap={{ scale: 0.95 }}` on all primary buttons
- **Card hover glow:** `whileHover={{ y: -4, boxShadow: "..." }}` on problem cards
- **Input focus glow:** Animated border color on focus
- **Success toast animation:** Custom toast entrance with Framer Motion
- **Loading skeleton:** Animated shimmer effect for data-loading states

---

## Part B: Dark/Light Theme System

### B1. Theme Infrastructure

**New files:**
- `frontend/src/contexts/ThemeContext.jsx` — React context with `theme`, `toggleTheme`, `setTheme`
- `frontend/src/hooks/useTheme.js` — convenience hook
- `frontend/src/components/ThemeToggle.jsx` — sun/moon toggle button with Framer Motion rotation

### B2. Theme Configuration

**Modify:** `frontend/src/index.css`
- Add CSS custom properties for theme tokens (`--bg-primary`, `--bg-secondary`, `--text-primary`, etc.)
- Define `:root` (light) and `[data-theme="dark"]` (dark) variants
- DaisyUI integration: Set `data-theme` attribute on `<html>` to switch DaisyUI themes

**Modify:** `frontend/src/App.jsx`
- Wrap app in `<ThemeProvider>`

### B3. Component Updates

**Toggle placement (3 navbars):**
| Component | File | Toggle Position |
|---|---|---|
| `StickyNav` | `landingPages/LandingPage/components/StickyNav.jsx` | After "Sign Up Free" button (line ~44) |
| `HomepageHeader` | `pages/Homepage/components/HomepageHeader.jsx` | After avatar dropdown (line ~48) |
| `AdminHeader` | `pages/Admin/components/AdminHeader.jsx` | After title section |

**Color conversion approach:**
- Replace hardcoded `bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900` with theme-aware classes
- Replace `bg-white/5` glass-morphism with CSS custom properties
- Replace `text-white` / `text-gray-900` with `text-primary` theme tokens
- Replace `border-white/10` / `border-gray-100` with `border-base-300`

**Monaco Editor:** Switch theme prop between `vs-dark` and `vs` based on current theme

**4 color utility files** need to return theme-aware classes:
- `pages/Homepage/utils/homepageData.js`
- `pages/ProblemPage/utils/problemData.js`
- `components/AdminDelete/utils/colors.js`
- `components/AdminUpdate/utils/colors.js`

### B4. Theme Persistence
- Store in `localStorage` under key `codify-theme`
- Read `prefers-color-scheme` on first visit
- Smooth transition: `transition-colors duration-300` on `<html>` element

---

## Part C: Bug Fixes

### C1. Critical Bugs

| # | Bug | File | Lines | Fix |
|---|---|---|---|---|
| 1 | `waiting()` broken — no delay, hammers Judge0 | `backend/src/utils/problemUtility.js` | 50-54 | Replace with `return new Promise(resolve => setTimeout(resolve, timer))` |
| 2 | `submittedProblem` sends string + double-response crash | `backend/src/controllers/userProblem.js` | 273-291 | Send `[]` instead of string, add `return` before first `res.send()` |
| 3 | `GEMINI_API_KEY` vs `GEMINI_KEY` mismatch — AI broken | `backend/.env:6` vs `backend/src/controllers/solveDoubt.js:10` | — | Rename env var in `.env` to `GEMINI_KEY` OR update code to read `GEMINI_API_KEY` |

### C2. High-Severity Bugs

| # | Bug | File | Lines | Fix |
|---|---|---|---|---|
| 4 | Redis entirely disabled — JWT blacklist doesn't work | `backend/src/config/redis.js` + 4 other files | Multiple | Uncomment Redis config, add `REDIS_URL` to `.env`, re-enable in `index.js`, `userAuthinticate.js`, `userMiddleware.js`, `adminMiddleware.js` |
| 5 | `NODE_ENV` not defined — cookies always insecure | `backend/.env` + `userAuthinticate.js` | 9 | Add `NODE_ENV=development` to `.env` (set `production` in deployed env) |
| 6 | `<style jsx>` CSS leaks globally (9 files) | See Part A section A3 | Multiple | Resolved by removing all style blocks in Part A |
| 7 | No `.env.example` — secrets undocumented | Root directories | — | Create both `backend/.env.example` and `frontend/.env.example` |

### C3. Medium-Severity Bugs

| # | Bug | File | Lines | Fix |
|---|---|---|---|---|
| 8 | `/problem/:problemId` no auth guard but API requires auth | `frontend/src/App.jsx` | 71 | Add optional auth: show page but handle 401 gracefully for code execution |
| 9 | Submission index uses wrong field name `userid` | `backend/src/models/submission.js` | 55 | Change to `userId` |

### C4. Low-Severity Fixes

| # | Bug | File | Fix |
|---|---|---|---|
| 10 | "Execise" typo folder | `frontend/src/landingPages/Execise/` (7 files) | Rename folder to `Exercise`, update import in `App.jsx:20` |

---

## Implementation Order

```
Step 1:  Install framer-motion, create motion.js variants, AnimatedPage wrapper
Step 2:  Fix all critical + high bugs (Part C) — fixes foundation
Step 3:  Add ThemeContext + ThemeToggle component
Step 4:  Migrate Login + Signup animations (most complex, most visible)
Step 5:  Migrate Homepage + ProblemPage animations
Step 6:  Migrate all Admin page animations
Step 7:  Migrate Landing Page animations
Step 8:  Add theme-aware colors to all pages
Step 9:  Add new micro-interactions (button taps, card hovers, loading skeletons)
Step 10: Rename Execise -> Exercise
Step 11: Create .env.example files
Step 12: Test across all routes and themes
```

---

## New Dependencies

### Frontend
```json
{
  "framer-motion": "^12.x"
}
```

---

## Files Modified Summary

### New Files (7)
| File | Purpose |
|---|---|
| `frontend/src/utils/motion.js` | Shared animation variants |
| `frontend/src/components/AnimatedPage.jsx` | Route transition wrapper |
| `frontend/src/contexts/ThemeContext.jsx` | Theme context provider |
| `frontend/src/hooks/useTheme.js` | Theme convenience hook |
| `frontend/src/components/ThemeToggle.jsx` | Sun/moon toggle button |
| `backend/.env.example` | Documented env vars |
| `frontend/.env.example` | Documented env vars |

### Modified Files (~30)
| File | Changes |
|---|---|
| `frontend/package.json` | Add framer-motion |
| `frontend/src/App.jsx` | Add AnimatePresence, ThemeProvider, fix route guard |
| `frontend/src/index.css` | Add theme CSS custom properties |
| `frontend/src/pages/Login/Login.jsx` | Remove style jsx, add Framer Motion |
| `frontend/src/pages/Login/components/AuthBranding.jsx` | Convert to motion.div |
| `frontend/src/pages/Login/components/LoginForm.jsx` | Convert to motion.div |
| `frontend/src/pages/Signup/Signup.jsx` | Remove style jsx, add Framer Motion |
| `frontend/src/pages/Signup/components/AuthBranding.jsx` | Convert to motion.div |
| `frontend/src/pages/Signup/components/SignupForm.jsx` | Convert to motion.div |
| `frontend/src/pages/Homepage/Homepage.jsx` | Remove style jsx, add Framer Motion |
| `frontend/src/pages/Homepage/components/ProblemCard.jsx` | Staggered entrance |
| `frontend/src/pages/Homepage/components/StatCard.jsx` | Count-up animation |
| `frontend/src/pages/Homepage/components/HomepageHeader.jsx` | Add theme toggle |
| `frontend/src/pages/Homepage/utils/homepageData.js` | Theme-aware colors |
| `frontend/src/pages/ProblemPage/ProblemPage.jsx` | Tab transitions |
| `frontend/src/pages/ProblemPage/utils/problemData.js` | Theme-aware colors |
| `frontend/src/pages/Admin/Admin.jsx` | Remove style jsx, add Framer Motion |
| `frontend/src/pages/Admin/components/AdminHeader.jsx` | Add theme toggle |
| `frontend/src/pages/Admin/components/AdminOptionsGrid.jsx` | Staggered entrance |
| `frontend/src/components/AdminPanel/AdminPanel.jsx` | Remove style jsx, add Framer Motion |
| `frontend/src/components/AdminDelete/AdminDelete.jsx` | Remove style jsx |
| `frontend/src/components/AdminDelete/utils/colors.js` | Theme-aware colors |
| `frontend/src/components/AdminUpdate/AdminUpdate.jsx` | Remove style jsx |
| `frontend/src/components/AdminUpdate/utils/colors.js` | Theme-aware colors |
| `frontend/src/components/AdminUpload/AdminUpload.jsx` | Remove style jsx |
| `frontend/src/components/AdminVideo/AdminVideo.jsx` | Remove style jsx |
| `frontend/src/components/UpdateProblem/UpdateProblem.jsx` | Remove style tag |
| `frontend/src/landingPages/LandingPage/LandingPage.jsx` | Remove dangerouslySetInnerHTML, scroll animations |
| `frontend/src/landingPages/LandingPage/components/StickyNav.jsx` | Add theme toggle |
| `frontend/src/landingPages/Execise/` | Rename to Exercise/ |
| `backend/src/utils/problemUtility.js` | Fix waiting() function |
| `backend/src/controllers/userProblem.js` | Fix submittedProblem response |
| `backend/src/models/submission.js` | Fix index field name |
| `backend/src/config/redis.js` | Uncomment Redis config |
| `backend/src/index.js` | Re-enable Redis connection |
| `backend/src/controllers/userAuthinticate.js` | Re-enable Redis blacklist |
| `backend/src/middleware/userMiddleware.js` | Re-enable Redis check |
| `backend/src/middleware/adminMiddleware.js` | Re-enable Redis check |
| `backend/.env` | Add NODE_ENV, fix GEMINI_KEY name |
| `backend/.env.example` | New file |
| `frontend/.env.example` | New file |

---

## Success Criteria

- [ ] All 11 `<style jsx>` / `<style>` blocks removed
- [ ] Framer Motion animations on every page (fade, slide, stagger, spring)
- [ ] Route transitions with AnimatePresence
- [ ] Dark/Light theme toggle working across all pages
- [ ] Theme persists in localStorage
- [ ] Monaco Editor switches theme with dark/light toggle
- [ ] All 3 critical bugs fixed (waiting, submittedProblem, GEMINI_KEY)
- [ ] All 4 high-severity bugs fixed (Redis, NODE_ENV, style leakage, .env.example)
- [ ] Both medium bugs fixed (route guard, submission index)
- [ ] Execise typo fixed
- [ ] `.env.example` files created
- [ ] No console errors on any page
- [ ] Animations smooth at 60fps

---

*Phase 1 of the Codify-CODE Next Level Roadmap*
