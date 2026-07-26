import React from 'react';
import { Code } from 'lucide-react';
import { SECTION_CODE_TEMPLATES, LABEL_INITIAL_CODE, LABEL_REFERENCE_SOLUTION, LANGUAGE_LABELS } from '../constants';
import './CodeTemplatesSection.scss';

const CodeTemplatesSection = ({ register, errors }) => {
  return (
    <div className="glass-bg backdrop-blur-lg rounded-2xl p-8 border border-theme shadow-2xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <Code className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-theme-primary">{SECTION_CODE_TEMPLATES}</h2>
      </div>
      
      <div className="space-y-8">
        {[0, 1, 2].map((index) => (
          <div key={index} className="glass-bg border border-theme rounded-xl p-6">
            <h3 className="text-lg font-semibold text-theme-primary mb-4">
              {LANGUAGE_LABELS[index]}
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block text-theme-muted text-sm font-medium">{LABEL_INITIAL_CODE}</label>
                <div className="bg-theme-alt border border-theme rounded-lg p-4">
                  <textarea
                    {...register(`startCode.${index}.initialCode`)}
                    rows={8}
                    className="w-full bg-transparent text-theme-primary font-mono text-sm focus:outline-none resize-none"
                    placeholder={`Enter ${LANGUAGE_LABELS[index]} starter code...`}
                  />
                </div>
                {errors.startCode?.[index]?.initialCode && (
                  <span className="text-red-400 text-xs mt-1 block">
                    {errors.startCode[index].initialCode.message}
                  </span>
                )}
              </div>
              
              <div className="space-y-3">
                <label className="block text-theme-muted text-sm font-medium">{LABEL_REFERENCE_SOLUTION}</label>
                <div className="bg-theme-alt border border-theme rounded-lg p-4">
                  <textarea
                    {...register(`referenceSolution.${index}.completeCode`)}
                    rows={8}
                    className="w-full bg-transparent text-theme-primary font-mono text-sm focus:outline-none resize-none"
                    placeholder={`Enter ${LANGUAGE_LABELS[index]} solution...`}
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
  );
};

export default CodeTemplatesSection;
