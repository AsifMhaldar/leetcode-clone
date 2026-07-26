import React from 'react';
import { Rocket } from 'lucide-react';
import { CERT_CTA_TITLE, CERT_CTA_DESC, CERT_CTA_BUTTON, CERT_CTA_NOTE } from '../constants';
import './CertCTA.scss';

export default function CertCTA() {
  return (
    <div className="cert-cta">
      <h2 className="cert-cta__title">{CERT_CTA_TITLE}</h2>
      <p className="cert-cta__desc">
        {CERT_CTA_DESC}
      </p>
      <button className="cert-cta__btn">
        <span className="cert-cta__btn-label">
          <Rocket className="w-5 h-5 mr-2" />
          {CERT_CTA_BUTTON}
        </span>
      </button>
      <p className="cert-cta__note">
        {CERT_CTA_NOTE}
      </p>
    </div>
  );
}
