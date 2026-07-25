import React from 'react';
import { useAdminPanel } from './hooks/useAdminPanel';
import AdminPanelHeader from './components/AdminPanelHeader';
import BasicInfoFields from './components/BasicInfoFields';
import TestCasesSection from './components/TestCasesSection';
import CodeTemplatesSection from './components/CodeTemplatesSection';
import SubmitButton from './components/SubmitButton';

function AdminPanel() {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    visibleFields,
    appendVisible,
    removeVisible,
    hiddenFields,
    appendHidden,
    removeHidden,
    onSubmit,
    navigate
  } = useAdminPanel();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation Header */}
      <AdminPanelHeader onBack={() => navigate('/admin')} />

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Create New Problem
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Add a new coding challenge to the platform with test cases and solutions
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-6xl mx-auto">
          {/* Basic Information */}
          <BasicInfoFields register={register} errors={errors} />

          {/* Test Cases Section */}
          <TestCasesSection
            register={register}
            visibleFields={visibleFields}
            appendVisible={appendVisible}
            removeVisible={removeVisible}
            hiddenFields={hiddenFields}
            appendHidden={appendHidden}
            removeHidden={removeHidden}
          />

          {/* Code Templates & Solutions */}
          <CodeTemplatesSection register={register} />

          {/* Submit Button */}
          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
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

export default AdminPanel;
