import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axiosClient from '../../../utils/axiosClient';
import { updateProblemSchema } from '../utils/schema';

export const useUpdateProblem = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: zodResolver(updateProblemSchema),
    defaultValues: {
      title: '',
      description: '',
      difficulty: 'easy',
      tags: 'array',
      visibleTestCases: [{ input: '', output: '', explanation: '' }],
      hiddenTestCases: [{ input: '', output: '' }],
      startCode: [
        { language: 'C++', initialCode: '' },
        { language: 'Java', initialCode: '' },
        { language: 'JavaScript', initialCode: '' }
      ],
      referenceSolution: [
        { language: 'C++', completeCode: '' },
        { language: 'Java', completeCode: '' },
        { language: 'JavaScript', completeCode: '' }
      ]
    }
  });

  const {
    fields: visibleFields,
    append: appendVisible,
    remove: removeVisible
  } = useFieldArray({
    control,
    name: 'visibleTestCases'
  });

  const {
    fields: hiddenFields,
    append: appendHidden,
    remove: removeHidden
  } = useFieldArray({
    control,
    name: 'hiddenTestCases'
  });

  const fetchProblem = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosClient.get(`/problem/problemById/${problemId}`);
      const problem = response.data;
      
      if (!problem) {
        setError('Problem not found');
        return;
      }
      
      setProblem(problem);
      
      const formData = {
        title: problem.title || '',
        description: problem.description || '',
        difficulty: problem.difficulty || 'easy',
        tags: problem.tags || 'array',
        visibleTestCases: problem.visibleTestCases?.length > 0 
          ? problem.visibleTestCases 
          : [{ input: '', output: '', explanation: '' }],
        hiddenTestCases: problem.hiddenTestCases?.length > 0 
          ? problem.hiddenTestCases 
          : [{ input: '', output: '' }],
        startCode: problem.startCode || [
          { language: 'C++', initialCode: '' },
          { language: 'Java', initialCode: '' },
          { language: 'JavaScript', initialCode: '' }
        ],
        referenceSolution: problem.referenceSolution || [
          { language: 'C++', completeCode: '' },
          { language: 'Java', completeCode: '' },
          { language: 'JavaScript', completeCode: '' }
        ]
      };

      reset(formData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch problem details');
    } finally {
      setLoading(false);
    }
  }, [problemId, reset]);

  useEffect(() => {
    fetchProblem();
  }, [fetchProblem]);

  const onSubmit = async (formData) => {
    try {
      setUpdating(true);
      setError(null);
      setSuccess(false);
      
      const updateData = {
        title: formData.title?.trim(),
        description: formData.description?.trim(),
        difficulty: formData.difficulty,
        tags: formData.tags,
        visibleTestCases: formData.visibleTestCases.map(tc => ({
          input: tc.input?.trim(),
          output: tc.output?.trim(),
          explanation: tc.explanation?.trim()
        })),
        hiddenTestCases: formData.hiddenTestCases.map(tc => ({
          input: tc.input?.trim(),
          output: tc.output?.trim()
        })),
        startCode: formData.startCode.map(code => ({
          language: code.language,
          initialCode: code.initialCode?.trim()
        })),
        referenceSolution: formData.referenceSolution.map(sol => ({
          language: sol.language,
          completeCode: sol.completeCode?.trim()
        }))
      };

      await axiosClient.put(`/problem/update/${problemId}`, updateData, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 30000
      });
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/update');
      }, 2000);
      
    } catch (err) {
      const errorMessage = err.response?.data?.message 
        || err.response?.data 
        || err.message 
        || 'Failed to update problem';
      setError(errorMessage);
    } finally {
      setUpdating(false);
    }
  };

  return {
    problemId,
    problem,
    loading,
    updating,
    error,
    success,
    register,
    handleSubmit,
    errors,
    visibleFields,
    appendVisible,
    removeVisible,
    hiddenFields,
    appendHidden,
    removeHidden,
    onSubmit,
    fetchProblem,
    navigate
  };
};
