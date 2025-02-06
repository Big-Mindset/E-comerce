import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBolls = ({ x, y, color,  }) => {
  return (
    <motion.div
      className={`${color} -z-20  absolute w-96 h-96 rounded-full`} // Use w-96 h-96 instead of size-96
      initial={{ x, y }}
      animate={{
        x: [x, x + 100, x],
        y: [y, y + 100, y],
      }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration: 20,
        ease: "easeInOut",
      }}
    ></motion.div>
  );
};

export default AnimatedBolls;
