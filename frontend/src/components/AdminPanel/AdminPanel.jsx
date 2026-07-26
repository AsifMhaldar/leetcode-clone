import React from 'react';
import { useAdminPanel } from './hooks/useAdminPanel';
import AdminPanelHeader from './components/AdminPanelHeader';
import BasicInfoFields from './components/BasicInfoFields';
import TestCasesSection from './components/TestCasesSection';
import CodeTemplatesSection from './components/CodeTemplatesSection';
import SubmitButton from './components/SubmitButton';
import { PAGE_TITLE, PAGE_SUBTITLE } from './constants';
import './AdminPanel.scss';

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
    <div className="admin-panel">
      {/* Navigation Header */}
      <AdminPanelHeader onBack={() => navigate('/admin')} />

      <div className="admin-panel__container">
        {/* Header Section */}
        <div className="admin-panel__header">
          <h1>
            {PAGE_TITLE}
          </h1>
          <p>
            {PAGE_SUBTITLE}
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
    </div>
  );
}

export default AdminPanel;
