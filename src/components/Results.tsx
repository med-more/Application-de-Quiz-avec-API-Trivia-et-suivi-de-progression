import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnswerObject } from '../types/types';
import Button from './Button';

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
  
  const getResultMessage = () => {
    if (percentage >= 80) return 'Excellent!';
    if (percentage >= 60) return 'Good job!';
    if (percentage >= 40) return 'Not bad!';
    return 'Keep practicing!';
  };
  
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold text-center mb-4">Quiz Results</h1>
          
          <div className="text-center mb-6">
            <div className="text-4xl font-bold mb-2">{percentage}%</div>
            <div className="text-xl font-semibold text-blue-600 mb-2">{getResultMessage()}</div>
            <div className="text-lg">
              {playerName}, you scored {score} out of {totalQuestions}
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <div className="space-y-4">
              {answers.map((item, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-md border ${item.correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
                >
                  <div className="font-medium mb-1">Question {index + 1}: {item.question}</div>
                  <div className="text-sm">
                    <span className="font-medium">Your answer:</span> {item.answer}
                    {!item.correct && (
                      <span className="block mt-1">
                        <span className="font-medium">Correct answer:</span> {item.correctAnswer}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button onClick={() => navigate('/')}>Start New Quiz</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;