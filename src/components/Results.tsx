import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnswerObject } from '../types/types';
import Button from './Button';
import confetti from 'canvas-confetti';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const answerVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({ 
    opacity: 1, 
    x: 0,
    transition: { 
      delay: 0.5 + i * 0.1,
      duration: 0.4
    }
  })
};

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { score, totalQuestions, answers } = location.state as {
    score: number;
    totalQuestions: number;
    answers: AnswerObject[];
  };
  
  const percentage = Math.round((score / totalQuestions) * 100);
  const playerName = localStorage.getItem('quizPlayerName') || 'Player';
  
  useEffect(() => {
    // Trigger confetti if score is good
    if (percentage >= 70) {
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const triggerConfetti = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#3b82f6', '#8b5cf6']
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#3b82f6', '#8b5cf6']
        });

        if (Date.now() < end) {
          requestAnimationFrame(triggerConfetti);
        }
      };
      
      triggerConfetti();
    }
  }, [percentage]);

  const getResultMessage = () => {
    if (percentage >= 90) return '🏆 Outstanding Master!';
    if (percentage >= 80) return '🎯 Excellent Work!';
    if (percentage >= 70) return '🌟 Great Performance!';
    if (percentage >= 60) return '👍 Good Effort!';
    if (percentage >= 50) return '😊 Not Bad!';
    if (percentage >= 30) return '🤔 Keep Practicing!';
    return '📚 Time to Study More!';
  };

  const getPerformanceColor = () => {
    if (percentage >= 80) return 'from-green-500 to-blue-500';
    if (percentage >= 60) return 'from-blue-500 to-purple-500';
    if (percentage >= 40) return 'from-yellow-500 to-orange-500';
    return 'from-orange-500 to-red-500';
  };

  const getMotivationalQuote = () => {
    if (percentage >= 80) return "Knowledge is power, and you've got plenty of it!";
    if (percentage >= 60) return "You're on the right track! Keep expanding your knowledge.";
    if (percentage >= 40) return "Progress is progress, no matter how small.";
    return "The greatest glory in living lies not in never falling, but in rising every time we fall.";
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-12">
      <motion.div 
        className="max-w-3xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="bg-white p-8 rounded-xl shadow-xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants}
            className="mb-6"
          >
            <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Quiz Results
            </h1>
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>
          
          <motion.div 
            className="text-center mb-12"
            variants={itemVariants}
          >
            <motion.div 
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.div 
                className={`w-40 h-40 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-r ${getPerformanceColor()} text-white relative z-10`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20,
                  delay: 0.3
                }}
              >
                <div className="text-5xl font-bold">{percentage}%</div>
              </motion.div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <motion.div 
                  className={`w-48 h-48 rounded-full border-4 border-dashed border-blue-300 absolute`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </motion.div>

            <motion.div 
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: 0, delay: 1 }}
            >
              {getResultMessage()}
            </motion.div>
            
            <motion.div 
              className="text-xl text-gray-700 font-medium mb-4"
              variants={itemVariants}
            >
              {playerName}, you scored {score} out of {totalQuestions}
            </motion.div>
            
            <motion.div
              className="text-sm text-gray-600 italic bg-gray-50 p-4 rounded-lg mx-auto max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              "{getMotivationalQuote()}"
            </motion.div>
          </motion.div>
          
          <motion.div className="mb-8" variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 pb-2 border-b border-gray-200 flex items-center">
              <motion.span
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ delay: 1.8, duration: 0.5 }}
              >
                📋
              </motion.span>
              <span className="ml-2">Question Summary</span>
            </h2>
            
            <div className="space-y-4">
              {answers.map((item, index) => (
                <motion.div 
                  key={index} 
                  className={`p-5 rounded-lg shadow-md border-l-4 ${
                    item.correct 
                      ? 'border-l-green-500 bg-gradient-to-r from-green-50 to-white' 
                      : 'border-l-red-500 bg-gradient-to-r from-red-50 to-white'
                  }`}
                  custom={index}
                  variants={answerVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-start">
                    <div className={`mt-0.5 mr-3 h-6 w-6 flex-shrink-0 rounded-full flex items-center justify-center ${
                      item.correct ? 'bg-green-500' : 'bg-red-500'
                    } text-white font-medium text-sm`}>
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      <div 
                        className="font-medium mb-2 text-gray-800"
                        dangerouslySetInnerHTML={{ __html: item.question }}
                      />
                      <div className="grid gap-2">
                        <div className={`text-sm p-2 rounded ${
                          item.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          <span className="font-medium">Your answer: </span>
                          <span dangerouslySetInnerHTML={{ __html: item.answer }} />
                        </div>
                        
                        {!item.correct && (
                          <div className="text-sm p-2 rounded bg-blue-100 text-blue-800">
                            <span className="font-medium">Correct answer: </span>
                            <span dangerouslySetInnerHTML={{ __html: item.correctAnswer }} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="flex justify-center space-x-4"
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            <Button 
              onClick={() => navigate('/')} 
              className="px-8 py-3"
            >
              Play Again
            </Button>
            
            <Button 
              variant="secondary"
              onClick={() => {
                // Share functionality could be added here
                alert("Share functionality would be implemented here!");
              }}
              className="px-8 py-3"
            >
              Share Results
            </Button>
          </motion.div>
          
          <motion.div
            className="mt-8 text-center text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            Thanks for playing our trivia quiz! Come back soon for more challenges.
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Results;