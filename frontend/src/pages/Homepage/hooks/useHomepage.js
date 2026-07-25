import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../../../utils/axiosClient';
import { logoutUser } from '../../../authSlice';

export const useHomepage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    difficulty: 'all',
    tag: 'all',
    status: 'all'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Codify-CODE | Home";
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [problemsRes, solvedRes] = await Promise.all([
          axiosClient.get('/problem/getAllProblem'),
          user ? axiosClient.get('/problem/problemSolvedByUser') : Promise.resolve({ data: [] })
        ]);
        
        setProblems(problemsRes.data);
        setSolvedProblems(solvedRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setSolvedProblems([]);
  };

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredProblems = problems.filter((problem) => {
    const searchMatch = searchTerm === '' || 
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.tags.toLowerCase().includes(searchTerm.toLowerCase());

    const difficultyMatch = filters.difficulty === 'all' || 
      problem.difficulty.toLowerCase() === filters.difficulty.toLowerCase();

    const tagMatch = filters.tag === 'all' || 
      problem.tags.toLowerCase() === filters.tag.toLowerCase();

    const statusMatch = filters.status === 'all' || 
      (filters.status === 'solved' && solvedProblems.some((sp) => sp._id === problem._id));

    return searchMatch && difficultyMatch && tagMatch && statusMatch;
  });

  const stats = {
    total: problems.length,
    solved: solvedProblems.length,
    easy: problems.filter((p) => p.difficulty.toLowerCase() === 'easy').length,
    medium: problems.filter((p) => p.difficulty.toLowerCase() === 'medium').length,
    hard: problems.filter((p) => p.difficulty.toLowerCase() === 'hard').length
  };

  return {
    user,
    problems,
    solvedProblems,
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    loading,
    handleLogout,
    filteredProblems,
    stats
  };
};
