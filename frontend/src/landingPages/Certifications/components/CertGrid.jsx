import React from 'react';
import { X, Award, ChevronDown } from 'lucide-react';
import CertCard from './CertCard';
import {
  CERT_GRID_SORT_OPTIONS, CERT_GRID_EMPTY_TITLE, CERT_GRID_EMPTY_DESC,
  CERT_GRID_LOAD_MORE, CERT_GRID_CLEAR_FILTERS
} from '../constants';
import './CertGrid.scss';

export default function CertGrid({
  filteredCerts,
  expandedCert,
  setExpandedCert,
  getLevelBadge,
  selectedCategory,
  selectedLevel,
  searchQuery,
  clearFilters
}) {
  return (
    <>
      <div className="cert-grid__header">
        <div className="cert-grid__count">
          <h2 className="cert-grid__count-text">
            {filteredCerts.length} Certifications Available
          </h2>
          {(selectedCategory !== 'all' || selectedLevel !== 'all' || searchQuery) && (
            <button onClick={clearFilters} className="cert-grid__clear-btn">
              <X className="w-4 h-4 mr-1" />
              {CERT_GRID_CLEAR_FILTERS}
            </button>
          )}
        </div>
        <select className="cert-grid__sort">
          {CERT_GRID_SORT_OPTIONS.map((option, idx) => (
            <option key={idx}>{option}</option>
          ))}
        </select>
      </div>

      <div className="cert-grid__grid">
        {filteredCerts.map((cert) => (
          <CertCard
            key={cert.id}
            cert={cert}
            getLevelBadge={getLevelBadge}
            expanded={expandedCert === cert.id}
            onToggleExpand={() => setExpandedCert(expandedCert === cert.id ? null : cert.id)}
          />
        ))}
      </div>

      {filteredCerts.length > 0 && (
        <div className="cert-grid__load-more">
          <button className="cert-grid__load-more-btn">
            <span className="relative flex items-center">
              {CERT_GRID_LOAD_MORE}
              <ChevronDown className="w-5 h-5 ml-2" />
            </span>
          </button>
        </div>
      )}

      {filteredCerts.length === 0 && (
        <div className="cert-grid__empty">
          <div className="cert-grid__empty-icon">
            <Award className="w-12 h-12 text-theme-muted" />
          </div>
          <h3 className="cert-grid__empty-title">{CERT_GRID_EMPTY_TITLE}</h3>
          <p className="cert-grid__empty-desc">
            {CERT_GRID_EMPTY_DESC}
          </p>
          <button onClick={clearFilters} className="cert-grid__empty-btn">
            {CERT_GRID_CLEAR_FILTERS}
          </button>
        </div>
      )}
    </>
  );
}
