import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div 
        className="bg-blue-600 h-4 rounded-full transition-all duration-300" 
        style={{ width: `${percentage}%` }}
      ></div>
      <div className="text-xs text-gray-600 mt-1 text-center">
        Question {current} of {total} ({percentage}%)
      </div>
    </div>
  );
};

export default ProgressBar;