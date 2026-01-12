import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosClient from '../utils/axiosClient';
import { Save, ArrowLeft, RefreshCw, AlertCircle, CheckCircle, Code, FileText, Settings } from 'lucide-react';

// Zod schema for problem update
const updateProblemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  tags: z.enum(['array', 'string', 'linkedList', 'graph', 'dp']),
  visibleTestCases: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required'),
      explanation: z.string().min(1, 'Explanation is required')
    })
  ).min(1, 'At least one visible test case required'),
  hiddenTestCases: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required')
    })
  ).min(1, 'At least one hidden test case required'),
  startCode: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'JavaScript']),
      initialCode: z.string().min(1, 'Initial code is required')
    })
  ).length(3, 'All three languages required'),
  referenceSolution: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'JavaScript']),
      completeCode: z.string().min(1, 'Complete code is required')
    })
  ).length(3, 'All three languages required')
});

function UpdateProblem() {
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
      
      // Add debugging to verify the endpoint
      // console.log('Fetching from endpoint:', `/problem/problemById/${problemId}`);
      
      const response = await axiosClient.get(`/problem/problemById/${problemId}`);
      const problem = response.data;
      
      // console.log('Problem data received:', problem);
      
      if (!problem) {
        setError('Problem not found');
        return;
      }
      
      setProblem(problem);
      
      // Enhanced form reset with better error handling
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

      // console.log('Form data after reset:', formData);
      reset(formData);

    } catch (err) {
      // console.error('Fetch error details:', {
      //   message: err.message,
      //   response: err.response?.data,
      //   status: err.response?.status,
      //   url: err.config?.url
      // });
      setError(err.response?.data?.message || 'Failed to fetch problem details');
    } finally {
      setLoading(false);
    }
  }, [problemId, reset]);

  useEffect(() => {
    fetchProblem();
  }, [fetchProblem]);

  // Debug form changes
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      // if (name === 'tags') {
      //   console.log('Tags field changed:', value.tags);
      // }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (formData) => {
    try {
      setUpdating(true);
      setError(null);
      setSuccess(false);
      
      // console.log('=== FORM SUBMISSION DEBUG ===');
      // console.log('Form data:', JSON.stringify(formData, null, 2));
      // console.log('Selected tag:', formData.tags);
      // console.log('Problem ID:', problemId);
      
      // Validate form data before sending
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

      // console.log('Sending update data:', JSON.stringify(updateData, null, 2));
      
      const response = await axiosClient.put(`/problem/update/${problemId}`, updateData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000 // 30 second timeout
      });
      
      // console.log('Update response:', response.data) ;
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/admin/update');
      }, 2000);
      
    } catch (err) {
      console.error('Update error details:', {
        message: err.message,
        code: err.code,
        response: err.response?.data,
        status: err.response?.status,
        url: err.config?.url
      });
      
      const errorMessage = err.response?.data?.message 
        || err.response?.data 
        || err.message 
        || 'Failed to update problem';
      
      setError(errorMessage);
    } finally {
      setUpdating(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-400 border-green-400/20 bg-green-400/10';
      case 'medium': return 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10';
      case 'hard': return 'text-red-400 border-red-400/20 bg-red-400/10';
      default: return 'text-gray-400 border-gray-400/20 bg-gray-400/10';
    }
  };

  const getTagColor = (tag) => {
    switch (tag?.toLowerCase()) {
      case 'array': return 'text-blue-400 border-blue-400/20 bg-blue-400/10';
      case 'string': return 'text-green-400 border-green-400/20 bg-green-400/10';
      case 'linkedlist': return 'text-purple-400 border-purple-400/20 bg-purple-400/10';
      case 'graph': return 'text-cyan-400 border-cyan-400/20 bg-cyan-400/10';
      case 'dp': return 'text-orange-400 border-orange-400/20 bg-orange-400/10';
      default: return 'text-gray-400 border-gray-400/20 bg-gray-400/10';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading problem details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation Header */}
      <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Update Problem</h1>
                <p className="text-sm text-gray-400">
                  {problem ? problem.title : `Problem ID: ${problemId}`}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchProblem}
                disabled={loading}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                <span>Refresh</span>
              </button>
              <button
                onClick={() => navigate('/admin/update')}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <ArrowLeft size={20} />
                <span>Back to Update</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
            Update Problem
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Modify the problem details, test cases, and code templates
          </p>
        </div>

        {/* Problem Info Card */}
        {problem && (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl mb-8 max-w-6xl mx-auto">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Problem Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-gray-400 text-sm mb-4">Current Difficulty</p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-4">Current Tag</p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getTagColor(problem.tags)}`}>
                  {problem.tags}
                </span>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-4">Problem ID</p>
                <p className="text-white font-mono text-sm">{problem.title}</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-6 h-6 text-red-400" />
              <div>
                <h4 className="text-red-400 font-medium mb-1">Update Failed</h4>
                <p className="text-red-300/80 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <h4 className="text-green-400 font-medium mb-1">Update Successful!</h4>
                <p className="text-green-300/80 text-sm">Problem updated successfully. Redirecting...</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-6xl mx-auto">
          
          {/* Basic Information */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Basic Information</h2>
            </div>
            
            <div className="space-y-6">
              <div className="form-group">
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Problem Title
                </label>
                <input
                  {...register('title')}
                  placeholder="Enter problem title..."
                  className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.title 
                      ? 'border-red-500 focus:ring-red-500 animate-shake' 
                      : 'border-white/20 focus:ring-yellow-500 focus:border-yellow-500'
                  }`}
                />
                {errors.title && (
                  <span className="text-red-400 text-sm mt-1 animate-fade-in block">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Problem Description
                </label>
                <textarea
                  {...register('description')}
                  placeholder="Describe the problem, constraints, and examples..."
                  rows={6}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                    errors.description 
                      ? 'border-red-500 focus:ring-red-500 animate-shake' 
                      : 'border-white/20 focus:ring-yellow-500 focus:border-yellow-500'
                  }`}
                />
                {errors.description && (
                  <span className="text-red-400 text-sm mt-1 animate-fade-in block">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Difficulty Level
                  </label>
                  <select
                    {...register('difficulty')}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.difficulty 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-white/20 focus:ring-yellow-500 focus:border-yellow-500'
                    }`}
                  >
                    <option value="easy" className="bg-slate-800 text-green-400">Easy</option>
                    <option value="medium" className="bg-slate-800 text-yellow-400">Medium</option>
                    <option value="hard" className="bg-slate-800 text-red-400">Hard</option>
                  </select>
                  {errors.difficulty && (
                    <span className="text-red-400 text-sm mt-1 animate-fade-in block">
                      {errors.difficulty.message}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Problem Tag
                  </label>
                  <select
                    {...register('tags')}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.tags 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-white/20 focus:ring-yellow-500 focus:border-yellow-500'
                    }`}
                  >
                    <option value="array" className="bg-slate-800">Array</option>
                    <option value="string" className="bg-slate-800">String</option>
                    <option value="linkedList" className="bg-slate-800">Linked List</option>
                    <option value="graph" className="bg-slate-800">Graph</option>
                    <option value="dp" className="bg-slate-800">Dynamic Programming</option>
                  </select>
                  {errors.tags && (
                    <span className="text-red-400 text-sm mt-1 animate-fade-in block">
                      {errors.tags.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Test Cases Section */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Test Cases</h2>
            </div>
            
            {/* Visible Test Cases */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Visible Test Cases</h3>
                  <p className="text-gray-400 text-sm">Test cases visible to users during practice</p>
                </div>
                <button
                  type="button"
                  onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
                  className="flex items-center space-x-2 bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-2 rounded-lg hover:bg-green-500/30 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <span>Add Visible Case</span>
                </button>
              </div>
              
              {visibleFields.map((field, index) => (
                <div key={field.id} className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4 group hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-medium">Test Case {index + 1}</h4>
                    {visibleFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVisible(index)}
                        className="text-red-400 hover:text-red-300 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Input</label>
                      <textarea
                        {...register(`visibleTestCases.${index}.input`)}
                        placeholder="Test case input..."
                        rows={3}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      {errors.visibleTestCases?.[index]?.input && (
                        <span className="text-red-400 text-xs mt-1 block">
                          {errors.visibleTestCases[index].input.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Output</label>
                      <textarea
                        {...register(`visibleTestCases.${index}.output`)}
                        placeholder="Expected output..."
                        rows={3}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      {errors.visibleTestCases?.[index]?.output && (
                        <span className="text-red-400 text-xs mt-1 block">
                          {errors.visibleTestCases[index].output.message}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Explanation</label>
                    <textarea
                      {...register(`visibleTestCases.${index}.explanation`)}
                      placeholder="Explain the test case..."
                      rows={2}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    {errors.visibleTestCases?.[index]?.explanation && (
                      <span className="text-red-400 text-xs mt-1 block">
                        {errors.visibleTestCases[index].explanation.message}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Hidden Test Cases */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Hidden Test Cases</h3>
                  <p className="text-gray-400 text-sm">Test cases used for final evaluation</p>
                </div>
                <button
                  type="button"
                  onClick={() => appendHidden({ input: '', output: '' })}
                  className="flex items-center space-x-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <span>Add Hidden Case</span>
                </button>
              </div>
              
              {hiddenFields.map((field, index) => (
                <div key={field.id} className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4 group hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-medium">Hidden Test {index + 1}</h4>
                    {hiddenFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeHidden(index)}
                        className="text-red-400 hover:text-red-300 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Input</label>
                      <textarea
                        {...register(`hiddenTestCases.${index}.input`)}
                        placeholder="Hidden test input..."
                        rows={3}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.hiddenTestCases?.[index]?.input && (
                        <span className="text-red-400 text-xs mt-1 block">
                          {errors.hiddenTestCases[index].input.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Output</label>
                      <textarea
                        {...register(`hiddenTestCases.${index}.output`)}
                        placeholder="Expected output..."
                        rows={3}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.hiddenTestCases?.[index]?.output && (
                        <span className="text-red-400 text-xs mt-1 block">
                          {errors.hiddenTestCases[index].output.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Templates */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Code className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Code Templates & Solutions</h2>
            </div>
            
            <div className="space-y-8">
              {[0, 1, 2].map((index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {index === 0 ? 'C++' : index === 1 ? 'Java' : 'JavaScript'}
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="block text-gray-400 text-sm font-medium">Initial Code Template</label>
                      <div className="bg-black/50 border border-white/10 rounded-lg p-4">
                        <textarea
                          {...register(`startCode.${index}.initialCode`)}
                          rows={8}
                          className="w-full bg-transparent text-white font-mono text-sm focus:outline-none resize-none"
                          placeholder={`Enter ${index === 0 ? 'C++' : index === 1 ? 'Java' : 'JavaScript'} starter code...`}
                        />
                      </div>
                      {errors.startCode?.[index]?.initialCode && (
                        <span className="text-red-400 text-xs mt-1 block">
                          {errors.startCode[index].initialCode.message}
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <label className="block text-gray-400 text-sm font-medium">Reference Solution</label>
                      <div className="bg-black/50 border border-white/10 rounded-lg p-4">
                        <textarea
                          {...register(`referenceSolution.${index}.completeCode`)}
                          rows={8}
                          className="w-full bg-transparent text-white font-mono text-sm focus:outline-none resize-none"
                          placeholder={`Enter ${index === 0 ? 'C++' : index === 1 ? 'Java' : 'JavaScript'} solution...`}
                        />
                      </div>
                      {errors.referenceSolution?.[index]?.completeCode && (
                        <span className="text-red-400 text-xs mt-1 block">
                          {errors.referenceSolution[index].completeCode.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={updating || loading}
              className={`flex items-center cursor-pointer space-x-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-500 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-500/50 disabled:opacity-70 disabled:cursor-not-allowed ${
                updating ? 'animate-pulse' : ''
              }`}
            >
              {updating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Updating Problem...</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>Update Problem</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        
        @keyframes fade-in {
          from { 
            opacity: 0; 
            transform: translateY(-10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default UpdateProblem;