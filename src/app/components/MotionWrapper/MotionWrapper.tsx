import React, { ReactNode } from 'react';

import { motion } from 'framer-motion';

interface MotionWrapperProps {
  children: ReactNode;
}

const MOTION_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const MotionWrapper = ({ children }: MotionWrapperProps) => {
  return (
    <motion.div
      initial='hidden'
      animate='visible'
      transition={{ duration: 0.5, delay: 0.2 }}
      variants={MOTION_VARIANTS}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
