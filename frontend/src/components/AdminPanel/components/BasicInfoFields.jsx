import React from 'react';
import { FileText } from 'lucide-react';
import {
  SECTION_BASIC_INFO, LABEL_PROBLEM_TITLE, LABEL_PROBLEM_DESC,
  LABEL_DIFFICULTY, LABEL_TAG, PLACEHOLDER_TITLE, PLACEHOLDER_DESC,
  DIFFICULTY_OPTIONS, TAG_OPTIONS
} from '../constants';
import './BasicInfoFields.scss';

const BasicInfoFields = ({ register, errors }) => {
  return (
    <div className="basic-info">
      <div className="basic-info__header">
        <div className="basic-info__icon">
          <FileText className="w-4 h-4 text-white" />
        </div>
        <h2 className="basic-info__title">{SECTION_BASIC_INFO}</h2>
      </div>
      
      <div className="space-y-6">
        <div className="basic-info__field">
          <label className="basic-info__label">
            {LABEL_PROBLEM_TITLE}
          </label>
          <input
            {...register('title')}
            placeholder={PLACEHOLDER_TITLE}
            className={`basic-info__input ${errors.title ? 'basic-info__input--error animate-shake' : ''}`}
          />
          {errors.title && (
            <span className="basic-info__error animate-fade-in">
              {errors.title.message}
            </span>
          )}
        </div>

        <div className="basic-info__field">
          <label className="basic-info__label">
            {LABEL_PROBLEM_DESC}
          </label>
          <textarea
            {...register('description')}
            placeholder={PLACEHOLDER_DESC}
            rows={6}
            className={`basic-info__textarea ${errors.description ? 'basic-info__textarea--error animate-shake' : ''}`}
          />
          {errors.description && (
            <span className="basic-info__error animate-fade-in">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="basic-info__field">
            <label className="basic-info__label">
              {LABEL_DIFFICULTY}
            </label>
            <select
              {...register('difficulty')}
              className={`basic-info__select ${errors.difficulty ? 'basic-info__select--error' : ''}`}
            >
              {DIFFICULTY_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value} className={`bg-slate-800 ${opt.value === 'easy' ? 'text-green-400' : opt.value === 'medium' ? 'text-yellow-400' : 'text-red-400'}`}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="basic-info__field">
            <label className="basic-info__label">
              {LABEL_TAG}
            </label>
            <select
              {...register('tags')}
              className={`basic-info__select ${errors.tags ? 'basic-info__select--error' : ''}`}
            >
              {TAG_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value} className="bg-slate-800">{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoFields;
