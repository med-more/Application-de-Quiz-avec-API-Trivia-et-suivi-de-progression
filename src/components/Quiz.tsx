import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchQuizQuestions } from '../utils/api';
import { Question, QuizState, Difficulty } from '../types/types';
import QuestionComponent from './Question';
import ProgressBar from './ProgressBar';
import Button from './Button';

const TOTAL_QUESTIONS = 10;

const Quiz: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const difficulty = location.state?.difficulty || 'medium';
  const playerName = localStorage.getItem('quizPlayerName') || 'Player';
  
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, difficulty as Difficulty);
        setQuestions(newQuestions);
        
        // Load saved progress if exists
        const savedProgress = localStorage.getItem('quizProgress');
        if (savedProgress) {
          const { 
            savedQuestions, 
            savedCurrentIndex, 
            savedScore, 
            savedAnswers 
          } = JSON.parse(savedProgress);
          
          if (savedQuestions.length === newQuestions.length) {
            setQuestions(savedQuestions);
            setCurrentQuestionIndex(savedCurrentIndex);
            setScore(savedScore);
            setAnswers(savedAnswers);
          }
        }
      } catch (err) {
        if (retryCount < 2) {
          // Auto-retry after a delay
          setTimeout(() => setRetryCount(prev => prev + 1), 2000);
        } else {
          setError(err instanceof Error ? err.message : 'Failed to load questions. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadQuestions();
  }, [difficulty, retryCount]);
  
  useEffect(() => {
    // Save progress to localStorage
    if (questions.length > 0) {
      const progress = {
        savedQuestions: questions,
        savedCurrentIndex: currentQuestionIndex,
        savedScore: score,
        savedAnswers: answers,
      };
      localStorage.setItem('quizProgress', JSON.stringify(progress));
    }
  }, [questions, currentQuestionIndex, score, answers]);
  
  const handleAnswerSelected = (answer: string) => {
    if (currentQuestionIndex >= questions.length) return;
    
    const isCorrect = answer === questions[currentQuestionIndex].correct_answer;
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Quiz completed
      localStorage.removeItem('quizProgress');
      navigate('/results', { 
        state: { 
          score, 
          totalQuestions: questions.length,
          answers: questions.map((q, i) => ({
            question: q.question,
            answer: answers[i],
            correct: answers[i] === q.correct_answer,
            correctAnswer: q.correct_answer,
          }))
        } 
      });
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleRetry = () => {
    setRetryCount(0);
    setError(null);
    setLoading(true);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading questions...</p>
          {retryCount > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              Attempt {retryCount + 1} of 3
            </p>
          )}
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
          <p className="mb-4">{error}</p>
          <div className="space-y-3">
            <Button onClick={handleRetry}>
              Try Again
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => navigate('/')}
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-md">
          <h2 className="text-xl font-bold mb-4">No questions available</h2>
          <Button onClick={() => navigate('/')}>Go Back</Button>
        </div>
      </div>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestionIndex];
  
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Player: {playerName}</h2>
            <div className="text-lg font-semibold">
              Score: {score}/{questions.length}
            </div>
          </div>
          
          <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
        </div>
        
        <QuestionComponent
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          onAnswerSelected={handleAnswerSelected}
          selectedAnswer={selectedAnswer}
        />
        
        <div className="flex justify-between mt-6">
          <Button 
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            variant="secondary"
          >
            Previous
          </Button>
          
          <Button 
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;