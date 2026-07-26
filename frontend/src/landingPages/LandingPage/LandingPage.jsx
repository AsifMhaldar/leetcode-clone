import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useLandingPage from './hooks/useLandingPage';
import StickyNav from './components/StickyNav';
import Sidebar from './components/Sidebar';
import MobileSidebar from './components/MobileSidebar';
import Breadcrumb from './components/Breadcrumb';
import Footer from './components/Footer';
import './LandingPage.scss';

const LandingPage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isSidebarOpen, setIsSidebarOpen, scrolled, location, getCurrentSectionLabel } = useLandingPage();

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="landing-page">
      <div className="landing-page__bg-orb">
        <div className="landing-page__bg-orb-1"></div>
        <div className="landing-page__bg-orb-2"></div>
      </div>

      <StickyNav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} scrolled={scrolled} />

      <div className="landing-page__container">
        <div className="landing-page__layout">
          <Sidebar location={location} />
          <MobileSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} location={location} />

          <div className="landing-page__main">
            <Breadcrumb location={location} getCurrentSectionLabel={getCurrentSectionLabel} />

            <div className="landing-page__content">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
