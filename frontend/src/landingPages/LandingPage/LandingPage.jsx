import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useLandingPage from './hooks/useLandingPage';
import StickyNav from './components/StickyNav';
import Sidebar from './components/Sidebar';
import MobileSidebar from './components/MobileSidebar';
import Breadcrumb from './components/Breadcrumb';
import Footer from './components/Footer';

const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideIn {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out;
  }
  
  .animate-slideIn {
    animation: slideIn 0.3s ease-out;
  }
`;

const LandingPage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isSidebarOpen, setIsSidebarOpen, scrolled, location, getCurrentSectionLabel } = useLandingPage();

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Floating Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <StickyNav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} scrolled={scrolled} />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8">
            <Sidebar location={location} />
            <MobileSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} location={location} />

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              <Breadcrumb location={location} getCurrentSectionLabel={getCurrentSectionLabel} />

              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
                <Outlet />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
