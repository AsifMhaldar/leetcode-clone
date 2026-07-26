import { Link } from 'react-router-dom';
import { Code, Github, Linkedin } from 'lucide-react';
import {
  BRAND_NAME, FOOTER_SUBTITLE, FOOTER_DESCRIPTION,
  FOOTER_CATEGORIES, FOOTER_LINKS, SOCIAL_LINKS,
  COPYRIGHT_TEXT, COPYRIGHT_HEART
} from '../constants';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="landing-footer">
      <div className="landing-footer__container">
        <div className="landing-footer__grid">
          <div className="landing-footer__brand">
            <div className="landing-footer__logo">
              <div className="landing-footer__logo-icon">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="landing-footer__logo-text">{BRAND_NAME}</span>
                <p className="landing-footer__logo-subtitle">{FOOTER_SUBTITLE}</p>
              </div>
            </div>
            <p className="landing-footer__description">
              {FOOTER_DESCRIPTION}
            </p>
          </div>

          {FOOTER_CATEGORIES.map((category, idx) => (
            <div key={idx}>
              <h3 className="landing-footer__category-title">{category}</h3>
              <ul className="landing-footer__links">
                {FOOTER_LINKS[category].map((link, linkIdx) => (
                  <li key={linkIdx}><Link to={link.path} className="landing-footer__link">{link.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="landing-footer__divider">
          <div className="landing-footer__social">
            {SOCIAL_LINKS.map((social, idx) => (
              <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className="landing-footer__social-link">
                {social.platform === 'GitHub' ? <Github className="w-6 h-6" /> : <Linkedin className="w-6 h-6" />}
              </a>
            ))}
          </div>

          <div className="landing-footer__copyright">
            <p className="landing-footer__copyright-text">{COPYRIGHT_TEXT}</p>
            <p className="landing-footer__copyright-heart">{COPYRIGHT_HEART}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
