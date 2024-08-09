import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const StepLayout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default StepLayout;
