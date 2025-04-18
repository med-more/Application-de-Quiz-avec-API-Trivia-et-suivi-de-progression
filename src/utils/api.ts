import { Question, Difficulty } from '../types/types';

const API_URL = 'https://opentdb.com/api.php';

// Simple in-memory cache
const questionCache: Record<string, Question[]> = {};

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty,
  retries = 3
): Promise<Question[]> => {
  const cacheKey = `${amount}-${difficulty}`;
  
  // Return cached questions if available
  if (questionCache[cacheKey]) {
    return questionCache[cacheKey];
  }

  try {
    const endpoint = `${API_URL}?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      if (response.status === 429 && retries > 0) {
        // Wait for a bit and retry
        await new Promise(resolve => setTimeout(resolve, 1000 * (4 - retries)));
        return fetchQuizQuestions(amount, difficulty, retries - 1);
      }
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.response_code !== 0) {
      throw new Error('Failed to fetch questions');
    }
    
    const processedQuestions = data.results.map((question: Question) => ({
      ...question,
      question: decodeHtmlEntities(question.question),
      correct_answer: decodeHtmlEntities(question.correct_answer),
      incorrect_answers: question.incorrect_answers.map(answer => decodeHtmlEntities(answer)),
    }));

    // Cache the questions
    questionCache[cacheKey] = processedQuestions;
    
    return processedQuestions;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw new Error('Failed to load questions. Please try again later.');
  }
};

const decodeHtmlEntities = (text: string): string => {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
};