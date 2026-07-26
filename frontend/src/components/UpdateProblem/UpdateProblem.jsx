import React from 'react';
import { useUpdateProblem } from './hooks/useUpdateProblem';
import UpdateProblemHeader from './components/UpdateProblemHeader';
import ProblemInfoCard from './components/ProblemInfoCard';
import UpdateStatus from './components/UpdateStatus';
import BasicInfoFields from './components/BasicInfoFields';
import TestCasesSection from './components/TestCasesSection';
import CodeTemplatesSection from './components/CodeTemplatesSection';
import UpdateSubmitButton from './components/UpdateSubmitButton';
import { PAGE_TITLE, PAGE_SUBTITLE, LOADING_TEXT } from './constants';
import './UpdateProblem.scss';

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
      <div className="update-problem flex items-center justify-center">
        <div className="text-center">
          <div className="update-problem__spinner"></div>
          <p className="text-gray-300 text-lg">{LOADING_TEXT}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="update-problem">
      <UpdateProblemHeader
        problem={problem}
        problemId={problemId}
        loading={loading}
        onRefresh={fetchProblem}
        onBack={() => navigate('/admin/update')}
      />

      <div className="update-problem__container">
        <div className="update-problem__header">
          <h1>
            {PAGE_TITLE}
          </h1>
          <p>
            {PAGE_SUBTITLE}
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
    </div>
  );
}

export default UpdateProblem;
