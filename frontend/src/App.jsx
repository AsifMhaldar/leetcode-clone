import {Routes, Route, Navigate} from "react-router";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Homepage from "./pages/Homepage/Homepage";
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from "./authSlice";
import { useEffect } from "react";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import ProblemPage from "./pages/ProblemPage/ProblemPage"
import Admin from "./pages/Admin/Admin";
import AdminDelete from "./components/AdminDelete/AdminDelete";
import AdminVideo from "./components/AdminVideo/AdminVideo";
import AdminUpload from "./components/AdminUpload/AdminUpload";
import AdminUpdate from "./components/AdminUpdate/AdminUpdate";
import UpdateProblem from "./components/UpdateProblem/UpdateProblem";
import LandingPage from './landingPages/LandingPage/LandingPage.jsx';
import Profile from "./components/Profile/Profile";
import Dashboard from "./pages/Dashboard/Dashboard";
import UserManagement from "./components/UserManagement/UserManagement";
import Analytics from "./components/Analytics/Analytics";
import Exercise from "./landingPages/Execise/Execise.jsx";
import Tutorial from "./landingPages/Tutorial/Tutorial.jsx";
import Certifications from './landingPages/Certifications/Certifications.jsx';
import Courses from './landingPages/Courses/Courses.jsx';
import { ThemeProvider } from "./contexts/ThemeContext";

function App(){

  const dispatch = useDispatch();
  const {isAuthenticated,user,loading} = useSelector((state)=>state.auth);

  // check initial authentication
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }

  return(
  <ThemeProvider>
    <Routes>
      {/* Landing page for all users */}
      <Route path="/" element={<LandingPage />} />
      <Route path="exercises" element={<Exercise/>}/>
      <Route path="tutorials" element={<Tutorial/>}/>
      <Route path="certifications" element={<Certifications/>}/>
      <Route path="courses" element={<Courses/>}/>
      {/* Auth routes */}
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />

      {/* Homepage for authenticated users */}
      <Route path="/home" element={isAuthenticated ? <Homepage /> : <Navigate to="/login" />} />
      <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
      <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />

      {/* Admin routes */}
      <Route path="/admin" element={isAuthenticated && user?.role === 'admin' ? <Admin /> : <Navigate to="/" />} />
      <Route path="/admin/create" element={isAuthenticated && user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/" />} />
      <Route path="/admin/update" element={isAuthenticated && user?.role === 'admin' ? <AdminUpdate /> : <Navigate to="/" />} />
      <Route path="/admin/users" element={isAuthenticated && user?.role === 'admin' ? <UserManagement /> : <Navigate to="/" />} />
      <Route path="/admin/analytics" element={isAuthenticated && user?.role === 'admin' ? <Analytics /> : <Navigate to="/" />} />
      <Route path="/admin/update/:problemId" element={isAuthenticated && user?.role === 'admin' ? <UpdateProblem /> : <Navigate to="/" />} />
      <Route path="/admin/delete" element={isAuthenticated && user?.role === 'admin' ? <AdminDelete /> : <Navigate to="/" />} />
      <Route path="/admin/video" element={isAuthenticated && user?.role === 'admin' ? <AdminVideo /> : <Navigate to="/" />} />
      <Route path="/admin/upload/:problemId" element={isAuthenticated && user?.role === 'admin' ? <AdminUpload /> : <Navigate to="/" />} />

      {/* Problem pages (public) */}
      <Route path="/problem/:problemId" element={<ProblemPage />} />
    </Routes>
  </ThemeProvider>
  )
}

export default App;
