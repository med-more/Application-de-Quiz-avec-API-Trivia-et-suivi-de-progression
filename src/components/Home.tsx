import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from './Button';

// Validation schema
const validationSchema = Yup.object().shape({
  playerName: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(20, 'Name must be 20 characters or less')
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  difficulty: Yup.string()
    .oneOf(['easy', 'medium', 'hard'], 'Invalid difficulty level')
    .required('Difficulty is required')
});

const Home: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      playerName: localStorage.getItem('quizPlayerName') || '',
      difficulty: 'medium' as 'easy' | 'medium' | 'hard'
    },
    validationSchema,
    onSubmit: (values) => {
      localStorage.setItem('quizPlayerName', values.playerName);
      navigate('/quiz', { state: { difficulty: values.difficulty } });
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome to the Trivia Quiz😛</h1>
        
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="playerName"
              name="playerName"
              value={formik.values.playerName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                formik.touched.playerName && formik.errors.playerName 
                  ? 'border-red-500' 
                  : 'border-gray-300'
              }`}
            />
            {formik.touched.playerName && formik.errors.playerName && (
              <div className="text-red-600 text-sm mt-1">{formik.errors.playerName}</div>
            )}
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <div className="flex space-x-4">
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <label key={level} className="flex items-center">
                  <input
                    type="radio"
                    name="difficulty"
                    value={level}
                    checked={formik.values.difficulty === level}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">{level}</span>
                </label>
              ))}
            </div>
            {formik.touched.difficulty && formik.errors.difficulty && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.difficulty}</div>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Starting...' : 'Start Quiz'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Home;