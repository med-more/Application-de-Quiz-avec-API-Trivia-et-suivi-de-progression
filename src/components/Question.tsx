import React from 'react';
import { motion } from 'framer-motion';
import { Question } from '../types/types';
import Button from './Button';

interface QuestionProps {
  question: Question;
  questionNumber: number;
  onAnswerSelected: (answer: string) => void;
  selectedAnswer?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: {
    x: '-100vw',
    opacity: 0,
    transition: { ease: 'easeInOut' }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const QuestionComponent: React.FC<QuestionProps> = ({
  question,
  questionNumber,
  onAnswerSelected,
  selectedAnswer,
}) => {
  const allAnswers = [...question.incorrect_answers, question.correct_answer]
    .sort(() => Math.random() - 0.5);

  return (
    <motion.div 
      className="bg-white p-8 rounded-xl shadow-xl border border-blue-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h3 
        className="text-xl font-bold mb-6 text-gray-800 pb-3 border-b-2 border-blue-100"
        variants={itemVariants}
        dangerouslySetInnerHTML={{ __html: `Question ${questionNumber}: ${question.question}` }}
      />
      
      <div className="space-y-4">
        {allAnswers.map((answer, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            custom={index}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              onClick={() => onAnswerSelected(answer)}
              className={`p-4 rounded-lg cursor-pointer border-2 transition-all duration-200 ${
                selectedAnswer === answer 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center">
                <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 ${
                  selectedAnswer === answer ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <div dangerouslySetInnerHTML={{ __html: answer }} />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default QuestionComponent;