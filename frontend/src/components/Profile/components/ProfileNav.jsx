import React from 'react';
import { NavLink } from 'react-router';
import { BRAND_NAME, LOGO_PATH, HOME_BUTTON } from '../constants';
import './ProfileNav.scss';

const ProfileNav = () => {
  return (
    <nav className="profile-nav">
      <div className="container mx-auto px-4">
        <div className="profile-nav__container">
          <div className="profile-nav__brand">
            <NavLink to="/home">
              <img src={LOGO_PATH} alt={`${BRAND_NAME} Logo`} className="profile-nav__logo" />
            </NavLink>
            <span className="profile-nav__text">
              {BRAND_NAME}
            </span>
          </div>
          
          <NavLink 
            to="/home"
            className="profile-nav__home-btn"
          >
            {HOME_BUTTON}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default ProfileNav;
