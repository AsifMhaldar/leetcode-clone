import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axiosClient from '../../../utils/axiosClient';
import { calculateStreak, generateEmptyCalendar, formatTimeAgo } from '../utils/profileUtils';

export const useProfile = () => {
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
  const [error, setError] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    github: '',
    linkedin: '',
    website: ''
  });

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

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!user) return;

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
            const response = await axiosClient.get(endpoint.url);
            results[endpoint.name] = response.data;
          } catch (err) {
            try {
              const fallbackResponse = await axiosClient.get(endpoint.fallback);
              results[endpoint.name] = fallbackResponse.data;
            } catch (fallbackErr) {
              results[endpoint.name] = [];
            }
          }
        }

        const solvedProblems = results.solvedProblems || [];
        const submissions = results.submissions || [];
        const allProblems = results.allProblems || [];

        const easySolved = solvedProblems.filter(p => p.difficulty?.toLowerCase() === 'easy').length;
        const mediumSolved = solvedProblems.filter(p => p.difficulty?.toLowerCase() === 'medium').length;
        const hardSolved = solvedProblems.filter(p => p.difficulty?.toLowerCase() === 'hard').length;
        
        const totalEasy = allProblems.filter(p => p.difficulty?.toLowerCase() === 'easy').length;
        const totalMedium = allProblems.filter(p => p.difficulty?.toLowerCase() === 'medium').length;
        const totalHard = allProblems.filter(p => p.difficulty?.toLowerCase() === 'hard').length;
        
        const totalSubmissions = submissions.length;
        const acceptedSubmissions = submissions.filter(s => s.status === 'accepted').length;
        const acceptanceRate = totalSubmissions > 0 ? Math.round((acceptedSubmissions / totalSubmissions) * 100) : 0;

        const recentSubmissions = submissions.slice(0, 3).map(sub => ({
          title: sub.problem?.title || 'Unknown Problem',
          difficulty: sub.problem?.difficulty?.toLowerCase() || 'easy',
          time: formatTimeAgo(sub.submittedAt || sub.createdAt)
        }));

        const streakData = calculateStreak(submissions);

        setUserStats({
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
          languages: [{ name: 'C++', problems: solvedProblems.length }],
          communityStats: {
            views: totalSubmissions,
            solutions: acceptedSubmissions,
            discussions: 0,
            reputation: (easySolved * 5) + (mediumSolved * 10) + (hardSolved * 20)
          },
          streak: streakData
        });

      } catch (error) {
        setError('Failed to load profile data. Please try again.');
        
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setSaveLoading(true);
      setSaveMessage('');
      
      if (!editForm.firstName.trim() || !editForm.lastName.trim() || !editForm.email.trim()) {
        setSaveMessage('Please fill in all required fields');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(editForm.email)) {
        setSaveMessage('Please enter a valid email address');
        return;
      }

      await axiosClient.put('/user/profile', editForm);
      
      setSaveMessage('Profile updated successfully!');
      setIsEditing(false);
      
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (error) {
      setSaveMessage(error.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCancelEdit = () => {
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

  return {
    user,
    userStats,
    isEditing,
    setIsEditing,
    loading,
    error,
    saveLoading,
    saveMessage,
    editForm,
    handleInputChange,
    handleSaveProfile,
    handleCancelEdit
  };
};
