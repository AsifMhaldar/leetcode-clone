import React from 'react';
import { FileText } from 'lucide-react';
import {
  SECTION_TEST_CASES, VISIBLE_TEST_CASES_TITLE, VISIBLE_TEST_CASES_DESC,
  HIDDEN_TEST_CASES_TITLE, HIDDEN_TEST_CASES_DESC,
  LABEL_INPUT, LABEL_OUTPUT, LABEL_EXPLANATION,
  PLACEHOLDER_INPUT, PLACEHOLDER_OUTPUT, PLACEHOLDER_EXPLANATION, PLACEHOLDER_HIDDEN_INPUT,
  ADD_VISIBLE_CASE, ADD_HIDDEN_CASE
} from '../constants';
import './TestCasesSection.scss';

const TestCasesSection = ({ 
  register, errors, 
  visibleFields, appendVisible, removeVisible,
  hiddenFields, appendHidden, removeHidden 
}) => {
  return (
    <div className="glass-bg backdrop-blur-lg rounded-2xl p-8 border border-theme shadow-2xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
          <FileText className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-theme-primary">{SECTION_TEST_CASES}</h2>
      </div>
      
      {/* Visible Test Cases */}
      <div className="space-y-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-theme-primary mb-1">{VISIBLE_TEST_CASES_TITLE}</h3>
            <p className="text-theme-muted text-sm">{VISIBLE_TEST_CASES_DESC}</p>
          </div>
          <button
            type="button"
            onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
            className="flex items-center space-x-2 bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-2 rounded-lg hover:bg-green-500/30 transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <span>{ADD_VISIBLE_CASE}</span>
          </button>
        </div>
        
        {visibleFields.map((field, index) => (
          <div key={field.id} className="glass-bg border border-theme rounded-xl p-6 space-y-4 group hover:border-theme-strong transition-all duration-300">
            <div className="flex items-center justify-between">
              <h4 className="text-theme-primary font-medium">Test Case {index + 1}</h4>
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
                <label className="block text-theme-muted text-sm mb-2">{LABEL_INPUT}</label>
                <textarea
                  {...register(`visibleTestCases.${index}.input`)}
                  placeholder={PLACEHOLDER_INPUT}
                  rows={3}
                  className="w-full px-3 py-2 glass-bg border border-theme-strong rounded text-theme-primary text-sm font-mono focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                {errors.visibleTestCases?.[index]?.input && (
                  <span className="text-red-400 text-xs mt-1 block">
                    {errors.visibleTestCases[index].input.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-theme-muted text-sm mb-2">{LABEL_OUTPUT}</label>
                <textarea
                  {...register(`visibleTestCases.${index}.output`)}
                  placeholder={PLACEHOLDER_OUTPUT}
                  rows={3}
                  className="w-full px-3 py-2 glass-bg border border-theme-strong rounded text-theme-primary text-sm font-mono focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                {errors.visibleTestCases?.[index]?.output && (
                  <span className="text-red-400 text-xs mt-1 block">
                    {errors.visibleTestCases[index].output.message}
                  </span>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-theme-muted text-sm mb-2">{LABEL_EXPLANATION}</label>
              <textarea
                {...register(`visibleTestCases.${index}.explanation`)}
                placeholder={PLACEHOLDER_EXPLANATION}
                rows={2}
                className="w-full px-3 py-2 glass-bg border border-theme-strong rounded text-theme-primary text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
            <h3 className="text-lg font-semibold text-theme-primary mb-1">{HIDDEN_TEST_CASES_TITLE}</h3>
            <p className="text-theme-muted text-sm">{HIDDEN_TEST_CASES_DESC}</p>
          </div>
          <button
            type="button"
            onClick={() => appendHidden({ input: '', output: '' })}
            className="flex items-center space-x-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <span>{ADD_HIDDEN_CASE}</span>
          </button>
        </div>
        
        {hiddenFields.map((field, index) => (
          <div key={field.id} className="glass-bg border border-theme rounded-xl p-6 space-y-4 group hover:border-theme-strong transition-all duration-300">
            <div className="flex items-center justify-between">
              <h4 className="text-theme-primary font-medium">Hidden Test {index + 1}</h4>
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
                <label className="block text-theme-muted text-sm mb-2">{LABEL_INPUT}</label>
                <textarea
                  {...register(`hiddenTestCases.${index}.input`)}
                  placeholder={PLACEHOLDER_HIDDEN_INPUT}
                  rows={3}
                  className="w-full px-3 py-2 glass-bg border border-theme-strong rounded text-theme-primary text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.hiddenTestCases?.[index]?.input && (
                  <span className="text-red-400 text-xs mt-1 block">
                    {errors.hiddenTestCases[index].input.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-theme-muted text-sm mb-2">{LABEL_OUTPUT}</label>
                <textarea
                  {...register(`hiddenTestCases.${index}.output`)}
                  placeholder={PLACEHOLDER_OUTPUT}
                  rows={3}
                  className="w-full px-3 py-2 glass-bg border border-theme-strong rounded text-theme-primary text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
  );
};

export default TestCasesSection;
