import { useState, useEffect } from 'react';
import axiosClient from '../../../utils/axiosClient';

export const useSubmissionHistory = (problemId) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`/problem/submittedProblem/${problemId}`);
        
        if (Array.isArray(response.data)) {
          setSubmissions(response.data);
        } else {
          setSubmissions([]);
          console.warn('Expected array but got:', typeof response.data);
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to fetch submission history');
        setSubmissions([]);
        console.error('Submission fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (problemId) {
      fetchSubmissions();
    } else {
      setError('Problem ID is required');
      setLoading(false);
    }
  }, [problemId]);

  const getStatusColor = (status) => {
    if (!status) return 'badge-neutral';
    switch (status.toLowerCase()) {
      case 'accepted': return 'badge-success';
      case 'wrong': return 'badge-error';
      case 'error': return 'badge-warning';
      case 'pending': return 'badge-info';
      default: return 'badge-neutral';
    }
  };

  const formatMemory = (memory) => {
    if (!memory || isNaN(memory)) return 'N/A';
    if (memory < 1024) return `${memory} kB`;
    return `${(memory / 1024).toFixed(2)} MB`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString();
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const getSafeValue = (obj, key, defaultValue = 'N/A') => {
    return obj?.[key] ?? defaultValue;
  };

  return {
    submissions,
    loading,
    error,
    selectedSubmission,
    setSelectedSubmission,
    getStatusColor,
    formatMemory,
    formatDate,
    getSafeValue
  };
};
