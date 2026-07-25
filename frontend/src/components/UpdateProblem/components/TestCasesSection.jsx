import React from 'react';
import { FileText } from 'lucide-react';

const TestCasesSection = ({ 
  register, errors, 
  visibleFields, appendVisible, removeVisible,
  hiddenFields, appendHidden, removeHidden 
}) => {
  return (
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
  );
};

export default TestCasesSection;
