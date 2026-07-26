// Shared Framer Motion animation variants for Codify-CODE

// Page transition variants
export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3,
};

// Fade variants
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

// Slide variants
export const slideInLeft = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export const slideInRight = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export const slideInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

// Stagger container (for lists)
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Stagger item (used with staggerContainer)
export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Scale variants
export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: "easeOut" },
};

// Shake variant (for errors)
export const shake = {
  initial: { x: 0 },
  animate: {
    x: [0, -8, 8, -8, 8, 0],
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

// Float variants (for background decorations)
export const floatSlow = {
  animate: {
    y: [0, -30, 0],
    rotate: [0, 180, 0],
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
  },
};

export const floatMedium = {
  animate: {
    y: [0, -20, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

export const floatFast = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

// Pulse variants (for background orbs)
export const pulseSlow = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.1, 0.15, 0.1],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

export const pulseMedium = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.1, 0.12, 0.1],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

export const pulseFast = {
  animate: {
    opacity: [0.1, 0.2, 0.1],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

// Hover / tap interactions
export const hoverLift = {
  whileHover: { y: -4, transition: { duration: 0.2 } },
};

export const hoverScale = {
  whileHover: { scale: 1.03, transition: { duration: 0.2 } },
};

export const tapScale = {
  whileTap: { scale: 0.95 },
};

// Scroll-triggered fade-in
export const scrollFadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

// Tab content transition
export const tabContent = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 },
};
