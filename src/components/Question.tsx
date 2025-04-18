import React from 'react';
import { Question } from '../types/types';
import Button from './Button';

interface QuestionProps {
  question: Question;
  questionNumber: number;
  onAnswerSelected: (answer: string) => void;
  selectedAnswer?: string;
}

const QuestionComponent: React.FC<QuestionProps> = ({
  question,
  questionNumber,
  onAnswerSelected,
  selectedAnswer,
}) => {
  const allAnswers = [...question.incorrect_answers, question.correct_answer]
    .sort(() => Math.random() - 0.5);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">
        Question {questionNumber}: {question.question}
      </h3>
      <div className="space-y-3">
        {allAnswers.map((answer, index) => (
          <div key={index}>
            <Button
              variant={selectedAnswer === answer ? 'primary' : 'secondary'}
              className="w-full text-left justify-start"
              onClick={() => onAnswerSelected(answer)}
            >
              {answer}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionComponent;