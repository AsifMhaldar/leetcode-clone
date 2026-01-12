import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router';
import { Edit3, Eye, MessageCircle, Star, Code, Calendar, Award, Lock, ChevronRight, Menu, X, Save, User, Mail, FileText, Flame } from 'lucide-react';
import axiosClient from '../utils/axiosClient';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [userStats, setUserStats] = useState({
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    totalProblems: 0,
    totalSubmissions: 0,
    acceptanceRate: 0,
    recentSubmissions: [],
    languages: [],
    communityStats: {
      views: 0,
      solutions: 0,
      discussions: 0,
      reputation: 0
    },
    streak: {
      current: 0,
      longest: 0,
      lastActive: null,
      calendar: []
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [error, setError] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Edit form state
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    github: '',
    linkedin: '',
    website: ''
  });

  // Initialize edit form when user data is available
  useEffect(() => {
    if (user) {
      setEditForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        bio: user.bio || 'Passionate coder solving challenges one problem at a time. 🚀',
        github: user.github || '',
        linkedin: user.linkedin || '',
        website: user.website || ''
      });
    }
  }, [user]);

  // Fetch real data with debugging
  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Starting to fetch user stats...');
        
        // Test if user is available
        if (!user) {
          console.log('No user found, skipping fetch');
          return;
        }

        console.log('User found:', user);

        // Try different endpoint combinations
        const endpoints = [
          { 
            name: 'solvedProblems', 
            url: '/problem/userSolvedProblems',
            fallback: '/problem/problemSolvedByUser'
          },
          { 
            name: 'submissions', 
            url: '/problem/userSubmissions',
            fallback: '/submission/userSubmissions'
          },
          { 
            name: 'allProblems', 
            url: '/problem/allProblems',
            fallback: '/problem/getAllProblem'
          }
        ];

        const results = {};

        for (const endpoint of endpoints) {
          try {
            console.log(`Trying endpoint: ${endpoint.url}`);
            const response = await axiosClient.get(endpoint.url);
            results[endpoint.name] = response.data;
            console.log(`Success for ${endpoint.name}:`, response.data);
          } catch (err) {
            console.log(`Failed for ${endpoint.url}, trying fallback: ${endpoint.fallback}`);
            try {
              const fallbackResponse = await axiosClient.get(endpoint.fallback);
              results[endpoint.name] = fallbackResponse.data;
              console.log(`Fallback success for ${endpoint.name}:`, fallbackResponse.data);
            } catch (fallbackErr) {
              console.error(`Both endpoints failed for ${endpoint.name}:`, fallbackErr);
              results[endpoint.name] = [];
            }
          }
        }

        const solvedProblems = results.solvedProblems || [];
        const submissions = results.submissions || [];
        const allProblems = results.allProblems || [];

        console.log('Processed data:', {
          solvedProblemsCount: solvedProblems.length,
          submissionsCount: submissions.length,
          allProblemsCount: allProblems.length
        });

        // Calculate statistics
        const easySolved = solvedProblems.filter(p => p.difficulty?.toLowerCase() === 'easy').length;
        const mediumSolved = solvedProblems.filter(p => p.difficulty?.toLowerCase() === 'medium').length;
        const hardSolved = solvedProblems.filter(p => p.difficulty?.toLowerCase() === 'hard').length;
        
        const totalEasy = allProblems.filter(p => p.difficulty?.toLowerCase() === 'easy').length;
        const totalMedium = allProblems.filter(p => p.difficulty?.toLowerCase() === 'medium').length;
        const totalHard = allProblems.filter(p => p.difficulty?.toLowerCase() === 'hard').length;
        
        const totalSubmissions = submissions.length;
        const acceptedSubmissions = submissions.filter(s => s.status === 'accepted').length;
        const acceptanceRate = totalSubmissions > 0 ? Math.round((acceptedSubmissions / totalSubmissions) * 100) : 0;

        // Get recent submissions
        const recentSubmissions = submissions.slice(0, 3).map(sub => ({
          title: sub.problem?.title || 'Unknown Problem',
          difficulty: sub.problem?.difficulty?.toLowerCase() || 'easy',
          time: formatTimeAgo(sub.submittedAt || sub.createdAt)
        }));

        // Calculate streak data
        const streakData = calculateStreak(submissions);

        const newStats = {
          totalSolved: solvedProblems.length,
          easySolved,
          mediumSolved,
          hardSolved,
          totalProblems: allProblems.length,
          totalEasy,
          totalMedium,
          totalHard,
          totalSubmissions,
          acceptanceRate,
          recentSubmissions,
          languages: [{ name: 'C++', problems: solvedProblems.length }], // Default for now
          communityStats: {
            views: totalSubmissions,
            solutions: acceptedSubmissions,
            discussions: 0,
            reputation: (easySolved * 5) + (mediumSolved * 10) + (hardSolved * 20)
          },
          streak: streakData
        };

        console.log('Final stats:', newStats);
        setUserStats(newStats);

      } catch (error) {
        console.error('Error in fetchUserStats:', error);
        setError('Failed to load profile data. Please try again.');
        
        // Set fallback data
        setUserStats({
          totalSolved: 0,
          easySolved: 0,
          mediumSolved: 0,
          hardSolved: 0,
          totalProblems: 0,
          totalSubmissions: 0,
          acceptanceRate: 0,
          recentSubmissions: [],
          languages: [],
          communityStats: {
            views: 0,
            solutions: 0,
            discussions: 0,
            reputation: 0
          },
          streak: {
            current: 0,
            longest: 0,
            lastActive: null,
            calendar: generateEmptyCalendar()
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [user]);

  // Calculate streak from submissions
  const calculateStreak = (submissions) => {
    if (!submissions || submissions.length === 0) {
      return {
        current: 0,
        longest: 0,
        lastActive: null,
        calendar: generateEmptyCalendar()
      };
    }

    // Get unique dates when user was active (submitted code)
    const activeDates = new Set();
    submissions.forEach(sub => {
      if (sub.submittedAt || sub.createdAt) {
        const date = new Date(sub.submittedAt || sub.createdAt);
        const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD
        activeDates.add(dateString);
      }
    });

    const activeDatesArray = Array.from(activeDates).sort();
    
    // Calculate current streak
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if user was active today or yesterday for current streak
    const todayString = today.toISOString().split('T')[0];
    const yesterdayString = yesterday.toISOString().split('T')[0];

    if (activeDates.has(todayString)) {
      currentStreak = 1;
      // Count backwards
      let checkDate = new Date(yesterday);
      while (true) {
        const checkDateString = checkDate.toISOString().split('T')[0];
        if (activeDates.has(checkDateString)) {
          currentStreak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }
    } else if (activeDates.has(yesterdayString)) {
      currentStreak = 1;
      // Count backwards from yesterday
      let checkDate = new Date(yesterday);
      checkDate.setDate(checkDate.getDate() - 1);
      while (true) {
        const checkDateString = checkDate.toISOString().split('T')[0];
        if (activeDates.has(checkDateString)) {
          currentStreak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }
    }

    // Calculate longest streak
    if (activeDatesArray.length > 0) {
      tempStreak = 1;
      longestStreak = 1;
      
      for (let i = 1; i < activeDatesArray.length; i++) {
        const prevDate = new Date(activeDatesArray[i - 1]);
        const currDate = new Date(activeDatesArray[i]);
        const diffTime = currDate - prevDate;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        
        if (diffDays === 1) {
          tempStreak++;
          longestStreak = Math.max(longestStreak, tempStreak);
        } else {
          tempStreak = 1;
        }
      }
    }

    // Generate calendar data for the last 4 weeks
    const calendar = generateStreakCalendar(activeDates);

    return {
      current: currentStreak,
      longest: longestStreak,
      lastActive: activeDatesArray[activeDatesArray.length - 1] || null,
      calendar
    };
  };

  // Generate empty calendar
  function generateEmptyCalendar() {
    const calendar = [];
    const today = new Date();
    
    // Last 4 weeks (28 days)
    for (let i = 27; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      calendar.push({
        date: date.toISOString().split('T')[0],
        active: false,
        isToday: i === 0
      });
    }
    
    return calendar;
  }

  // Generate streak calendar with activity data
  function generateStreakCalendar(activeDates) {
    const calendar = [];
    const today = new Date();
    
    // Last 4 weeks (28 days)
    for (let i = 27; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      const isActive = activeDates.has(dateString);
      const isToday = i === 0;
      
      calendar.push({
        date: dateString,
        active: isActive,
        isToday: isToday
      });
    }
    
    return calendar;
  }

  // Get streak color based on count
  const getStreakColor = (count) => {
    if (count === 0) return 'bg-gray-600';
    if (count <= 7) return 'bg-green-500';
    if (count <= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Handle edit form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle save profile
  const handleSaveProfile = async () => {
    try {
      setSaveLoading(true);
      setSaveMessage('');
      
      // Validate required fields
      if (!editForm.firstName.trim() || !editForm.lastName.trim() || !editForm.email.trim()) {
        setSaveMessage('Please fill in all required fields');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(editForm.email)) {
        setSaveMessage('Please enter a valid email address');
        return;
      }

      console.log('Saving profile:', editForm);

      // Make API call to update profile
      const response = await axiosClient.put('/user/profile', editForm);
      
      console.log('Profile saved successfully:', response.data);
      
      setSaveMessage('Profile updated successfully!');
      setIsEditing(false);
      
      // Reload the page to reflect changes (or update Redux state if you prefer)
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (error) {
      console.error('Error saving profile:', error);
      setSaveMessage(error.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    // Reset form to original user data
    setEditForm({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      bio: user.bio || 'Passionate coder solving challenges one problem at a time. 🚀',
      github: user.github || '',
      linkedin: user.linkedin || '',
      website: user.website || ''
    });
    setIsEditing(false);
    setSaveMessage('');
  };

  // Helper function to format time ago
  const formatTimeAgo = (dateString) => {
    if (!dateString) return 'Recently';
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      return `${Math.floor(diffDays / 30)} months ago`;
    } catch (err) {
      return 'Recently';
    }
  };

  const difficultyColors = {
    easy: 'text-green-400',
    medium: 'text-yellow-400',
    hard: 'text-red-400'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <div className="text-white">Loading your profile...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-lg mb-4">Error</div>
          <div className="text-white mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10 shadow-2xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <NavLink to="/home">
                <img src='/src/assets/codifycode2.png' alt="Codify-CODE Logo" className="w-12 h-12 lg:w-20 lg:h-20 rounded-lg" />
              </NavLink>
              <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Codify-CODE
              </span>
            </div>
            
            <NavLink 
              to="/home"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 lg:px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 text-sm lg:text-base"
            >
              Back to Home
            </NavLink>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Debug Info - Remove in production */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
          <div className="text-yellow-400 text-sm">
            <strong>Debug Info:</strong> Problems: {userStats.totalSolved} solved, {userStats.totalProblems} total | 
            Submissions: {userStats.totalSubmissions} | Acceptance: {userStats.acceptanceRate}% |
            Streak: {userStats.streak.current} days
          </div>
        </div>

        {/* Save Message */}
        {saveMessage && (
          <div className={`mb-6 p-4 rounded-lg ${
            saveMessage.includes('successfully') 
              ? 'bg-green-500/10 border border-green-500/30 text-green-400' 
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}>
            {saveMessage}
          </div>
        )}

        {/* Profile Header */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl mb-6">
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </div>
            
            <div className="flex-1 text-center lg:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={editForm.firstName}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="First Name"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={editForm.lastName}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Email"
                    />
                  </div>

                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Bio</label>
                    <textarea
                      name="bio"
                      value={editForm.bio}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">GitHub</label>
                      <input
                        type="url"
                        name="github"
                        value={editForm.github}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="https://github.com/username"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">LinkedIn</label>
                      <input
                        type="url"
                        name="linkedin"
                        value={editForm.linkedin}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">Website</label>
                      <input
                        type="url"
                        name="website"
                        value={editForm.website}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-white mb-2">{user?.firstName} {user?.lastName}</h1>
                  <p className="text-gray-400 mb-2">{user?.email}</p>
                  <p className="text-gray-300 mb-3">{editForm.bio}</p>
                  
                  {/* Social Links */}
                  {(editForm.github || editForm.linkedin || editForm.website) && (
                    <div className="flex flex-wrap gap-4 mt-3">
                      {editForm.github && (
                        <a href={editForm.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                          GitHub
                        </a>
                      )}
                      {editForm.linkedin && (
                        <a href={editForm.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                          LinkedIn
                        </a>
                      )}
                      {editForm.website && (
                        <a href={editForm.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                          Website
                        </a>
                      )}
                    </div>
                  )}
                  
                  <div className="text-gray-400 text-sm mt-2">
                    Rank #{userStats.communityStats.reputation > 0 ? Math.max(1, 2331261 - userStats.communityStats.reputation) : '2,331,261'}
                  </div>
                </>
              )}
            </div>

            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveProfile}
                    disabled={saveLoading}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 cursor-pointer"
                  >
                    {saveLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>{saveLoading ? 'Saving...' : 'Save'}</span>
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-white/10 text-white px-6 py-2 rounded-lg font-medium hover:bg-white/20 transition-all duration-200 border border-white/20 cursor-pointer"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2 cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Stats */}
          <div className="space-y-6">
            {/* Community Stats */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl">
              <h3 className="text-lg font-semibold text-white mb-4">Community Stats</h3>
              <div className="space-y-4">
                <StatItem icon={<Eye className="w-4 h-4" />} label="Views" value={userStats.communityStats.views} />
                <StatItem icon={<Code className="w-4 h-4" />} label="Solutions" value={userStats.communityStats.solutions} />
                <StatItem icon={<MessageCircle className="w-4 h-4" />} label="Discuss" value={userStats.communityStats.discussions} />
                <StatItem icon={<Star className="w-4 h-4" />} label="Reputation" value={userStats.communityStats.reputation} />
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl">
              <h3 className="text-lg font-semibold text-white mb-4">Languages</h3>
              <div className="space-y-3">
                {userStats.languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-white font-medium">{lang.name}</span>
                    <span className="text-gray-400 text-sm">{lang.problems} problems solved</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column - Progress */}
          <div className="space-y-6">
            {/* Solved Problems */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  {userStats.totalSolved}/{userStats.totalProblems}
                </h2>
                <div className="text-gray-400 text-sm">
                  Acceptance: <span className="text-green-400 font-medium">{userStats.acceptanceRate}%</span>
                </div>
              </div>

              <div className="space-y-4">
                <ProgressSection 
                  label="Easy"
                  solved={userStats.easySolved}
                  total={userStats.totalEasy}
                  color="green"
                />
                <ProgressSection 
                  label="Medium"
                  solved={userStats.mediumSolved}
                  total={userStats.totalMedium}
                  color="yellow"
                />
                <ProgressSection 
                  label="Hard"
                  solved={userStats.hardSolved}
                  total={userStats.totalHard}
                  color="red"
                />
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl">
              <h3 className="text-lg font-semibold text-white mb-4">Badges</h3>
              <div className="text-center py-4">
                {userStats.totalSolved > 0 ? (
                  <>
                    <Award className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
                    <div className="text-yellow-400">Problem Solver</div>
                    <div className="text-gray-400 text-sm mt-2">{userStats.totalSolved} problems solved</div>
                  </>
                ) : (
                  <>
                    <Lock className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                    <div className="text-gray-400">No badges yet</div>
                    <div className="text-gray-400 text-sm mt-2">Solve problems to earn badges</div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Activity */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              
              <div className="space-y-3">
                {userStats.recentSubmissions.length > 0 ? (
                  userStats.recentSubmissions.map((submission, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors duration-200">
                      <div className="flex-1">
                        <div className="text-white font-medium text-sm">{submission.title}</div>
                        <div className="text-gray-400 text-xs">{submission.time}</div>
                      </div>
                      <div className={`text-xs font-medium ${difficultyColors[submission.difficulty]}`}>
                        {submission.difficulty}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-400">
                    <Code className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <div className="text-sm">No recent activity</div>
                  </div>
                )}
              </div>
            </div>

            {/* Streak Calendar */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <Flame className={`w-5 h-5 ${userStats.streak.current > 0 ? 'text-orange-500' : 'text-gray-500'}`} />
                  <span>Current Streak</span>
                </h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{userStats.streak.current}</div>
                  <div className="text-gray-400 text-xs">days</div>
                </div>
              </div>

              {/* Streak Calendar Grid */}
              <div className="mb-4">
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                    <div key={index} className="text-center text-gray-400 text-xs font-medium">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {userStats.streak.calendar.map((day, index) => (
                    <div
                      key={index}
                      className={`aspect-square rounded-sm border-2 ${
                        day.active
                          ? getStreakColor(userStats.streak.current) + ' border-white/20'
                          : day.isToday
                          ? 'bg-white/5 border-purple-500/50'
                          : 'bg-white/5 border-white/10'
                      } ${day.isToday ? 'ring-1 ring-purple-500' : ''}`}
                      title={`${day.date}${day.active ? ' - Active' : ''}${day.isToday ? ' - Today' : ''}`}
                    />
                  ))}
                </div>
              </div>

              {/* Streak Stats */}
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-gray-400 text-xs mb-1">Longest Streak</div>
                  <div className="text-white font-semibold">{userStats.streak.longest} days</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-1">Last Active</div>
                  <div className="text-white font-semibold text-sm">
                    {userStats.streak.lastActive 
                      ? formatTimeAgo(userStats.streak.lastActive)
                      : 'Never'
                    }
                  </div>
                </div>
              </div>

              {/* Streak Message */}
              <div className="mt-4 text-center">
                {userStats.streak.current > 0 ? (
                  <div className="text-green-400 text-sm">
                    🔥 Keep going! You're on a {userStats.streak.current}-day streak
                  </div>
                ) : (
                  <div className="text-gray-400 text-sm">
                    Solve a problem today to start your streak!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stat Item Component
const StatItem = ({ icon, label, value }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-2">
      <div className="text-blue-400">{icon}</div>
      <span className="text-gray-300 text-sm">{label}</span>
    </div>
    <div className="text-right">
      <div className="text-white font-medium">{value}</div>
      <div className="text-gray-400 text-xs">Last week: 0</div>
    </div>
  </div>
);

// Progress Section Component
const ProgressSection = ({ label, solved, total, color }) => {
  const percentage = total > 0 ? (solved / total) * 100 : 0;
  const colorClasses = {
    green: { text: 'text-green-400', bg: 'bg-green-500' },
    yellow: { text: 'text-yellow-400', bg: 'bg-yellow-500' },
    red: { text: 'text-red-400', bg: 'bg-red-500' }
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-300">{label}</span>
        <span className={colorClasses[color].text}>
          {solved}/{total}
        </span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${colorClasses[color].bg} transition-all duration-1000 ease-out`}
          style={{ width: `${Math.max(5, percentage)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Profile;