import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      when: "beforeChildren",
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const floatingBubbles = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 0.8,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.8
    }
  }),
  float: (i: number) => ({
    y: [0, -15, 0],
    x: [0, i % 2 === 0 ? 10 : -10, 0],
    transition: {
      duration: 5 + i,
      repeat: Infinity,
      ease: "easeInOut"
    }
  })
};

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

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const difficultyEmojis = {
    easy: '🙂',
    medium: '😎',
    hard: '🤯'
  };

  const difficultyLabels = {
    easy: 'Beginner',
    medium: 'Regular',
    hard: 'Expert'
  };

  const bubbleColors = [
    'from-blue-400 to-indigo-500',
    'from-purple-400 to-pink-500',
    'from-green-400 to-teal-500',
    'from-pink-400 to-red-500',
    'from-yellow-400 to-orange-500'
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={floatingBubbles}
            initial="hidden"
            animate={["visible", "float"]}
            className={`absolute rounded-full bg-gradient-to-br ${bubbleColors[i % bubbleColors.length]} bg-opacity-20 backdrop-filter backdrop-blur-sm`}
            style={{
              width: `${50 + Math.random() * 100}px`,
              height: `${50 + Math.random() * 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,20,0.4)_100%)]"></div>

      <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
        <motion.div 
          className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white border-opacity-20"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="text-center mb-8"
              variants={itemVariants}
            >
              <motion.h1 
                className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                Trivia Quiz
              </motion.h1>
              <div className="text-blue-200 text-lg">Test Your Knowledge</div>
              <motion.div 
                className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.div>
            
            <form onSubmit={formik.handleSubmit}>
              <motion.div className="mb-6" variants={itemVariants}>
                <label htmlFor="playerName" className="block text-sm font-semibold text-blue-100 mb-2">
                  Your Name
                </label>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <input
                    type="text"
                    id="playerName"
                    name="playerName"
                    value={formik.values.playerName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-3 bg-white bg-opacity-10 backdrop-filter backdrop-blur-md border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder-blue-200 ${
                      formik.touched.playerName && formik.errors.playerName
                        ? 'border-red-500' 
                        : 'border-white border-opacity-20'
                    }`}
                    placeholder="Enter your name"
                  />
                </motion.div>
                {formik.touched.playerName && formik.errors.playerName && (
                  <motion.div 
                    className="text-red-400 text-sm mt-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {formik.errors.playerName}
                  </motion.div>
                )}
              </motion.div>
              
              <motion.div className="mb-8" variants={itemVariants}>
                <label className="block text-sm font-semibold text-blue-100 mb-3">Difficulty</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['easy', 'medium', 'hard'] as const).map((level) => (
                    <motion.label 
                      key={level} 
                      className={`flex flex-col items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formik.values.difficulty === level 
                          ? 'border-blue-500 bg-blue-500 bg-opacity-20' 
                          : 'border-white border-opacity-20 hover:border-opacity-40 hover:bg-white hover:bg-opacity-5'
                      }`}
                      whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <input
                        type="radio"
                        name="difficulty"
                        value={level}
                        checked={formik.values.difficulty === level}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="sr-only"
                      />
                      <motion.div
                        animate={{ 
                          rotate: formik.values.difficulty === level ? [0, -5, 5, -5, 5, 0] : 0,
                          scale: formik.values.difficulty === level ? [1, 1.2, 1] : 1
                        }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl mb-1"
                      >
                        {difficultyEmojis[level]}
                      </motion.div>
                      <span className={`text-sm font-semibold capitalize ${
                        formik.values.difficulty === level ? 'text-blue-200' : 'text-blue-100'
                      }`}>
                        {level}
                      </span>
                      <motion.div 
                        className={`mt-1 text-xs ${
                          formik.values.difficulty === level ? 'text-blue-200' : 'text-blue-300 text-opacity-80'
                        }`}
                      >
                        {difficultyLabels[level]}
                      </motion.div>
                    </motion.label>
                  ))}
                </div>
                {formik.touched.difficulty && formik.errors.difficulty && (
                  <div className="text-red-400 text-sm mt-2">{formik.errors.difficulty}</div>
                )}
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Button 
                  type="submit" 
                  className="w-full py-3 text-lg"
                  size="lg"
                  withGlow={true}
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  {formik.isSubmitting ? 'Starting...' : 'Start Quiz'}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;