import React from 'react';
import { useUpdateProblem } from './hooks/useUpdateProblem';
import UpdateProblemHeader from './components/UpdateProblemHeader';
import ProblemInfoCard from './components/ProblemInfoCard';
import UpdateStatus from './components/UpdateStatus';
import BasicInfoFields from './components/BasicInfoFields';
import TestCasesSection from './components/TestCasesSection';
import CodeTemplatesSection from './components/CodeTemplatesSection';
import UpdateSubmitButton from './components/UpdateSubmitButton';

function UpdateProblem() {
  const {
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
  } = useUpdateProblem();

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
      <UpdateProblemHeader
        problem={problem}
        problemId={problemId}
        loading={loading}
        onRefresh={fetchProblem}
        onBack={() => navigate('/admin/update')}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
            Update Problem
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Modify the problem details, test cases, and code templates
          </p>
        </div>

        <ProblemInfoCard problem={problem} />
        <UpdateStatus error={error} success={success} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-6xl mx-auto">
          <BasicInfoFields register={register} errors={errors} />
          <TestCasesSection
            register={register}
            errors={errors}
            visibleFields={visibleFields}
            appendVisible={appendVisible}
            removeVisible={removeVisible}
            hiddenFields={hiddenFields}
            appendHidden={appendHidden}
            removeHidden={removeHidden}
          />
          <CodeTemplatesSection register={register} errors={errors} />
          <UpdateSubmitButton updating={updating} loading={loading} />
        </form>
      </div>

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
