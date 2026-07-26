import React from 'react';
import { useSignup } from './hooks/useSignup';
import AuthBranding from '../../shared/components/AuthBranding';
import SignupForm from './components/SignupForm';
import { motion } from 'framer-motion';
import { pulseSlow, pulseMedium, pulseFast, floatSlow, floatFast, floatMedium } from '../../utils/motion';
import { signupFeatures, SIGNUP_HEADING, SIGNUP_SUBHEADING } from './constants';
import './Signup.scss';

function Signup() {
  const {
    showPassword,
    setShowPassword,
    loading,
    register,
    handleSubmit,
    errors,
    onSubmit
  } = useSignup();

  return (
    <div className="signup-page">
      <div className="auth-bg">
        <motion.div {...pulseSlow} className="auth-bg__orb auth-bg__orb--purple" />
        <motion.div {...pulseMedium} className="auth-bg__orb auth-bg__orb--blue" />
        <motion.div {...floatSlow} className="auth-bg__orb auth-bg__orb--indigo" />

        <motion.div {...floatMedium} className="auth-bg__code" style={{ top: '5rem', left: '5rem', color: 'rgba(192, 132, 252, 0.2)' }}>{`{ }`}</motion.div>
        <motion.div {...floatFast} className="auth-bg__code" style={{ bottom: '8rem', right: '8rem', color: 'rgba(96, 165, 250, 0.2)' }}>{`< />`}</motion.div>
        <motion.div {...floatFast} className="auth-bg__code" style={{ top: '10rem', right: '10rem', color: 'rgba(6, 182, 212, 0.2)' }}>{`[ ]`}</motion.div>
        <motion.div {...floatMedium} className="auth-bg__code" style={{ bottom: '10rem', left: '10rem', color: 'rgba(99, 102, 241, 0.2)' }}>{`( )`}</motion.div>

        <motion.div {...pulseFast} className="auth-bg__binary" style={{ top: '2.5rem', left: '25%' }}>1010</motion.div>
        <motion.div {...pulseMedium} className="auth-bg__binary" style={{ top: '8rem', right: '33%' }}>1101</motion.div>
        <motion.div {...pulseSlow} className="auth-bg__binary" style={{ bottom: '5rem', left: '33%' }}>0110</motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl mx-auto relative z-10"
      >
        <AuthBranding
          heading={SIGNUP_HEADING}
          subheading={SIGNUP_SUBHEADING}
          features={signupFeatures}
        />
        <SignupForm
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          loading={loading}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          onSubmit={onSubmit}
        />
      </motion.div>
    </div>
  );
}

export default Signup;
