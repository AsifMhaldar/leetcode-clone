import React from 'react';
import AdminHeader from './components/AdminHeader';
import StatsCards from './components/StatsCards';
import QuickActions from './components/QuickActions';
import AdminOptionsGrid from './components/AdminOptionsGrid';
import RecentActivity from './components/RecentActivity';

function Admin() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AdminHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Manage your coding platform, create challenges, and track performance metrics
          </p>
        </div>

        <StatsCards />
        <QuickActions />
        <AdminOptionsGrid />
        <RecentActivity />
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out both;
        }
      `}</style>
    </div>
  );
}

export default Admin;
