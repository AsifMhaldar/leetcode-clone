import React from 'react';
import { Save } from 'lucide-react';
import { SUBMIT_BTN_TEXT, SUBMIT_BTN_LOADING } from '../constants';
import './SubmitButton.scss';

const SubmitButton = ({ isSubmitting }) => {
  return (
    <div className="submit-section">
      <button
        type="submit"
        disabled={isSubmitting}
        className="submit-section__btn"
      >
        {isSubmitting ? (
          <>
            <div className="submit-section__spinner"></div>
            <span>{SUBMIT_BTN_LOADING}</span>
          </>
        ) : (
          <>
            <Save size={20} />
            <span>{SUBMIT_BTN_TEXT}</span>
          </>
        )}
      </button>
    </div>
  );
};

export default SubmitButton;
