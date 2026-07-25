import { useState, useEffect } from 'react';
import axiosClient from '../../../utils/axiosClient';

export const useAdminUpdate = () => {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  useEffect(() => {
    fetchProblems();
  }, []);

  useEffect(() => {
    filterProblems();
  }, [problems, searchTerm, difficultyFilter]);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axiosClient.get('/problem/getAllProblem');
      setProblems(data);
    } catch (err) {
      setError('Failed to fetch problems');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterProblems = () => {
    let filtered = problems;

    if (searchTerm) {
      filtered = filtered.filter(problem =>
        problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.tags.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (difficultyFilter !== 'all') {
      filtered = filtered.filter(problem =>
        problem.difficulty.toLowerCase() === difficultyFilter.toLowerCase()
      );
    }

    setFilteredProblems(filtered);
  };

  return {
    problems,
    filteredProblems,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    difficultyFilter,
    setDifficultyFilter,
    fetchProblems
  };
};
