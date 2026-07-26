import { motion, AnimatePresence } from "framer-motion";
import { pageVariants, pageTransition } from "../utils/motion";

export default function AnimatedPage({ children, className = "" }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
