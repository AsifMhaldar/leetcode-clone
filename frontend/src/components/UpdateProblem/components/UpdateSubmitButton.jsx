import React from 'react';
import { Save } from 'lucide-react';
import { SUBMIT_BTN_TEXT, SUBMIT_BTN_LOADING } from '../constants';
import './UpdateSubmitButton.scss';

const UpdateSubmitButton = ({ updating, loading }) => {
  return (
    <div className="update-submit">
      <button
        type="submit"
        disabled={updating || loading}
        className={`update-submit__btn ${updating ? 'update-submit__btn--updating' : ''}`}
      >
        {updating ? (
          <>
            <div className="update-submit__spinner"></div>
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

export default UpdateSubmitButton;
