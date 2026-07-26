import React from 'react';
import { Video, ArrowLeft } from 'lucide-react';
import { HEADER_BRAND_TITLE, HEADER_BACK_TEXT } from '../constants';
import './AdminUploadHeader.scss';

const AdminUploadHeader = ({ onBack }) => {
  return (
    <nav className="admin-nav">
      <div className="admin-nav__inner">
        <div className="admin-nav__brand">
          <div className="admin-nav__icon">
            <Video className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-theme-primary">{HEADER_BRAND_TITLE}</h1>
          </div>
        </div>

        <div className="admin-nav__actions">
          <button
            onClick={onBack}
            className="admin-nav__btn"
          >
            <ArrowLeft size={20} />
            <span>{HEADER_BACK_TEXT}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminUploadHeader;
