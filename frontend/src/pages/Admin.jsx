import React, { useState } from 'react';
import { Plus, Edit, Trash2, Home, RefreshCw, Zap, Video, Settings, Users, BarChart3, Code2 } from 'lucide-react';
import { NavLink } from 'react-router';

function Admin() {
  const [selectedOption, setSelectedOption] = useState(null);

  const adminOptions = [
    {
      id: 'create',
      title: 'Create Problem',
      description: 'Add a new coding challenge with test cases and solutions',
      icon: Plus,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      route: '/admin/create'
    },
    {
      id: 'update',
      title: 'Update Problem',
      description: 'Edit existing problems, test cases, and descriptions',
      icon: Edit,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
      route: '/admin/update'
    },
    {
      id: 'delete',
      title: 'Delete Problem',
      description: 'Remove problems and associated data from platform',
      icon: Trash2,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      route: '/admin/delete'
    },
    {
      id: 'video',
      title: 'Video Solutions',
      description: 'Upload and manage video explanations for problems',
      icon: Video,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      route: '/admin/video'
    },
    {
      id: 'users',
      title: 'User Management',
      description: 'Manage user accounts, roles, and permissions',
      icon: Users,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      route: '/admin/users'
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'View platform statistics and user performance metrics',
      icon: BarChart3,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
      route: '/admin/analytics'
    }
  ];

  const stats = [
    { label: 'Total Problems', value: '156', change: '+12%', trend: 'up' },
    { label: 'Active Users', value: '2.4k', change: '+8%', trend: 'up' },
    { label: 'Submissions', value: '45.2k', change: '+23%', trend: 'up' },
    { label: 'Success Rate', value: '68%', change: '+5%', trend: 'up' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation Header */}
      <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                <p className="text-sm text-gray-400">Platform Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <NavLink 
                to="/" 
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <Home size={20} />
                <span>Back to Home</span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

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

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${
                  stat.trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                } group-hover:scale-110 transition-transform duration-300`}>
                  <BarChart3 size={20} />
                </div>
              </div>
              <div className={`flex items-center space-x-1 mt-2 text-sm ${
                stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                <span>{stat.change}</span>
                <span>this month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {adminOptions.slice(0, 4).map((option) => {
              const IconComponent = option.icon;
              return (
                <NavLink
                  key={option.id}
                  to={option.route}
                  className="block group"
                >
                  <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 h-full">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${option.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">{option.title}</h3>
                        <p className="text-gray-400 text-sm">{option.description}</p>
                      </div>
                    </div>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Admin Options Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Management Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <NavLink
                  key={option.id}
                  to={option.route}
                  className="block group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl h-full">
                    {/* Icon with Gradient Background */}
                    <div className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent size={28} className="text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                      {option.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {option.description}
                    </p>
                    
                    {/* Action Indicator */}
                    <div className="flex items-center justify-between">
                      <span className="text-blue-400 text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                        Manage →
                      </span>
                      <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300">
                        <Code2 size={16} className="text-gray-400 group-hover:text-blue-400" />
                      </div>
                    </div>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'New problem created', user: 'John Doe', time: '2 minutes ago', type: 'create' },
              { action: 'User registration', user: 'Alice Smith', time: '5 minutes ago', type: 'user' },
              { action: 'Problem updated', user: 'Admin', time: '1 hour ago', type: 'update' },
              { action: 'Video solution uploaded', user: 'Bob Wilson', time: '2 hours ago', type: 'video' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors duration-200">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'create' ? 'bg-green-500/20 text-green-400' :
                  activity.type === 'user' ? 'bg-blue-500/20 text-blue-400' :
                  activity.type === 'update' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-purple-500/20 text-purple-400'
                }`}>
                  {activity.type === 'create' && <Plus size={20} />}
                  {activity.type === 'user' && <Users size={20} />}
                  {activity.type === 'update' && <Edit size={20} />}
                  {activity.type === 'video' && <Video size={20} />}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-gray-400 text-sm">by {activity.user}</p>
                </div>
                <div className="text-gray-400 text-sm">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
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