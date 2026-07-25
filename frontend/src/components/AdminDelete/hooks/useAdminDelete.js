import { useState, useEffect } from 'react';
import axiosClient from '../../../utils/axiosClient';

export const useAdminDelete = () => {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [deleteLoading, setDeleteLoading] = useState(null);

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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this problem? This action cannot be undone.')) return;
    
    try {
      setDeleteLoading(id);
      await axiosClient.delete(`/problem/delete/${id}`);
      setProblems(problems.filter(problem => problem._id !== id));
    } catch (err) {
      setError('Failed to delete problem');
      console.error(err);
    } finally {
      setDeleteLoading(null);
    }
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
    deleteLoading,
    fetchProblems,
    handleDelete
  };
};
