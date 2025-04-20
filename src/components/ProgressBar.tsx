import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className="w-full">
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-3 uppercase rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md">
              Progress
            </span>
          </div>
          <div className="text-right">
            <motion.span 
              className="text-xs font-semibold inline-block py-1 px-3 uppercase rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md"
              key={percentage}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {percentage}%
            </motion.span>
          </div>
        </div>
        <div className="overflow-hidden h-6 mb-2 text-xs flex rounded-full bg-gray-200 backdrop-filter backdrop-blur-sm shadow-inner border border-gray-300">
          <motion.div 
            className="shadow-lg rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white flex items-center justify-center text-xs"
            style={{ width: `${percentage}%` }}
            initial={{ width: '0%' }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mr-1"
              >
                🧠
              </motion.div>
              <span className="font-bold text-xs">Question {current} of {total}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;