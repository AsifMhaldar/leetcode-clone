import React from 'react';
import { Code } from 'lucide-react';

const CodeTemplatesSection = ({ register, errors }) => {
  return (
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
  );
};

export default CodeTemplatesSection;
