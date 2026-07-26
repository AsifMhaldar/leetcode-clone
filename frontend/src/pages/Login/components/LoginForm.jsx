import React from 'react';
import { NavLink } from 'react-router';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../../utils/motion';
import {
  LOGIN_FORM_HEADING, LOGIN_FORM_SUBHEADING,
  EMAIL_LABEL, PASSWORD_LABEL, EMAIL_PLACEHOLDER, PASSWORD_PLACEHOLDER,
  LOADING_TEXT, SUBMIT_TEXT, REMEMBER_LABEL, FORGOT_LABEL,
  FOOTER_TEXT, FOOTER_LINK_TEXT
} from '../constants';
import './LoginForm.scss';

const LoginForm = ({
  showPassword,
  setShowPassword,
  loading,
  error,
  register,
  handleSubmit,
  errors,
  onSubmit
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="lg:w-1/2 w-full max-w-md"
    >
      <div className="login-form__card">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="login-form__header"
        >
          <h3>{LOGIN_FORM_HEADING}</h3>
          <p>{LOGIN_FORM_SUBHEADING}</p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: [0, -8, 8, -8, 8, 0] }}
            transition={{ duration: 0.4 }}
            className="login-form__error"
          >
            <div className="login-form__error-text">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="login-form__group"
          >
            <label>{EMAIL_LABEL}</label>
            <input
              type="email"
              placeholder={EMAIL_PLACEHOLDER}
              className={`login-form__input ${errors.emailId ? 'login-form__input--error' : ''}`}
              {...register('emailId')}
            />
            {errors.emailId && (
              <motion.span
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="login-form__error-message"
              >
                {errors.emailId.message}
              </motion.span>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="login-form__group"
          >
            <label>{PASSWORD_LABEL}</label>
            <div className="login-form__input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={PASSWORD_PLACEHOLDER}
                className={`login-form__input login-form__input--password ${errors.password ? 'login-form__input--error' : ''}`}
                {...register('password')}
              />
              <button
                type="button"
                className="login-form__toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <motion.span
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="login-form__error-message"
              >
                {errors.password.message}
              </motion.span>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="login-form__remember"
          >
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm glass-bg border-theme-strong" />
              <span>{REMEMBER_LABEL}</span>
            </label>
            <a href="#">{FORGOT_LABEL}</a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              className="login-form__submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="login-form__spinner" />
                  <span>{LOADING_TEXT}</span>
                </div>
              ) : (
                SUBMIT_TEXT
              )}
            </motion.button>
          </motion.div>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="login-form__footer"
        >
          <span>
            {FOOTER_TEXT}{' '}
            <NavLink to="/signup">{FOOTER_LINK_TEXT}</NavLink>
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoginForm;
