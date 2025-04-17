export type Difficulty = 'easy' | 'medium' | 'hard';
export type QuestionType = 'multiple' | 'boolean';

export interface Question{
    category: string;
    type: QuestionType;
    difficulty: Difficulty;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export interface QuizState{
    playerName: string;
    questions: Question[];
    currentQuestionIndex: number;
    score: number;
    answers: string[];
    isQuizCompleted: boolean;
}

export interface AnswerObject{
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
}