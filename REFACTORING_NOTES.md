# Leetcode Platform - Refactoring & Fixes Reference Notes

This file details all the database fixes, middleware reference bug fixes, and components refactoring executed on the platform.

---

## 1. Backend Fixes & Configuration

### A. Database Connection Startup Fix
* **File**: `backend/src/index.js`
* **Issue**: The database connection function `main()` was commented out because it was grouped with `redisClient.connect()` inside a `Promise.all`. As a result, the server was listening but queries to the DB (such as logins or problem creation) were timed out after 10000ms.
* **Fix**: Uncommented `main()` by invoking `await Promise.all([main()]);` so MongoDB connects correctly on startup even if Redis is disabled.

### B. Middleware `isBlocked` ReferenceError Fix
* **Files**: 
  1. `backend/src/middleware/userMiddleware.js`
  2. `backend/src/middleware/adminMiddleware.js`
* **Issue**: The definition of `isBlocked` was commented out (since Redis client is disabled), but the code still tried to evaluate `if (isBlocked)`. This raised a runtime `ReferenceError: isBlocked is not defined`.
* **Fix**: Commented out/removed the `if (isBlocked)` check blocks entirely from both middleware files since Redis token blacklisting is disabled.

---

## 2. Frontend Component Refactoring

The `AdminDelete`, `AdminPanel`, and `AdminUpdate` components have been refactored from single monolithic files into clean, modular folders following modern architecture guidelines:
* Separation of logic (using custom hooks)
* Extraction of configurations/validators (Zod schema and color helpers)
* Modular subcomponents for specific sections of the UI

### A. AdminDelete Refactoring
* **Main Entry Component**: `frontend/src/components/AdminDelete/AdminDelete.jsx`
* **Old File Deleted**: `frontend/src/components/AdminDelete.jsx`
* **New File Structure**:
  * `AdminDelete.jsx`: Coordinates page layout, utilizing the custom hook and importing smaller subcomponents.
  * `hooks/useAdminDelete.js`: Custom hook encapsulating state (loading, error, filtering, searching) and API triggers (`fetchProblems`, `handleDelete`).
  * `utils/colors.js`: Styling maps that return classes for difficulty level and problem tag badges.
  * `components/AdminDeleteHeader.jsx`: Top navbar structure containing reload/refresh buttons and home links.
  * `components/AdminDeleteFilters.jsx`: Stats indicators, search textfield, and difficulty select dropdown.
  * `components/ProblemCard.jsx`: Layout card showing each problem's details, tags, difficulty, and a delete button with a loader.
  * `components/WarningBanner.jsx`: Static bottom card explaining the risks of deleting a problem.

---

### B. AdminPanel Refactoring
* **Main Entry Component**: `frontend/src/components/AdminPanel/AdminPanel.jsx`
* **Old File Deleted**: `frontend/src/components/AdminPanel.jsx`
* **New File Structure**:
  * `AdminPanel.jsx`: Layout parent that configures the form submissions and links form contexts.
  * `hooks/useAdminPanel.js`: Custom hook setting up React Hook Form controller refs, schema resolver, dynamic field arrays (`useFieldArray` for visible/hidden test cases), and standard form submit logic.
  * `utils/schema.js`: Contains the Zod validation validation schema `problemSchema`.
  * `components/AdminPanelHeader.jsx`: Form header and navigation back link.
  * `components/BasicInfoFields.jsx`: General inputs (Title input, Description textarea, Tag, and Difficulty select menus) and validation error displays.
  * `components/TestCasesSection.jsx`: List elements of visible and hidden test case arrays, containing input/output fields and action buttons to add or remove test cases.
  * `components/CodeTemplatesSection.jsx`: Starter template text areas and complete solutions editor grids for C++, Java, and JavaScript.
  * `components/SubmitButton.jsx`: Trigger button handling form submission with inline loading spinner.

---

### C. AdminUpdate Refactoring
* **Main Entry Component**: `frontend/src/components/AdminUpdate/AdminUpdate.jsx`
* **Old File Deleted**: `frontend/src/components/AdminUpdate.jsx`
* **New File Structure**:
  * `AdminUpdate.jsx`: Main entry rendering coordinator that binds the hook with visual subcomponents.
  * `hooks/useAdminUpdate.js`: Custom hook managing problem list data retrieval, search string mutations, and difficulty filtering.
  * `utils/colors.js`: Local styling badge colors for difficulties and tags.
  * `components/AdminUpdateHeader.jsx`: Navigation bars, back routes, and problem refresh actions.
  * `components/AdminUpdateFilters.jsx`: Problem search input, difficulty select options, and statistics counts.
  * `components/ProblemCard.jsx`: Individual problem details layout with an "Edit Problem" navigation link routing to `/admin/update/:id`.
  * `components/GuidelinesBanner.jsx`: Info guidelines detailing guidelines/rules when updating.

---

### D. App Routing Updates
* **File**: `frontend/src/App.jsx`
* **Updates**: Modified import statements to point to the new directory structures:
  * `import AdminDelete from "./components/AdminDelete/AdminDelete";`
  * `import AdminPanel from "./components/AdminPanel/AdminPanel";`
  * `import AdminUpdate from "./components/AdminUpdate/AdminUpdate";`
