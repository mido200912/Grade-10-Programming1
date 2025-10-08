
import React, { useState } from 'react';
import { Quiz } from '../types';
import { ArrowRight, Check, X } from './icons/Icons';
import { useProgress } from '../context/ProgressContext';

interface QuizProps {
  quiz: Quiz;
  onBack: () => void;
}

const QuizComponent: React.FC<QuizProps> = ({ quiz, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const { completeQuiz } = useProgress();

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const score = calculateScore();
      completeQuiz(quiz.lessonId, score);
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return quiz.questions.reduce((score, question, index) => {
      return selectedAnswers[index] === question.correctAnswer ? score + 1 : score;
    }, 0);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / quiz.questions.length) * 100;

    return (
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">نتيجة الاختبار</h2>
        <p className="text-4xl font-bold text-blue-600 mb-2">
          {score} / {quiz.questions.length}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="text-lg mb-6">{percentage >= 80 ? 'ممتاز! عمل رائع.' : 'جيد جداً، استمر في التعلم!'}</p>
        <button onClick={onBack} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700">
          العودة للاختبارات
        </button>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex];

  return (
    <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">سؤال {currentQuestionIndex + 1} من {quiz.questions.length}</h2>
        <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-800">خروج</button>
      </div>
      <p className="text-lg font-semibold text-gray-700 mb-6">{currentQuestion.question}</p>
      
      <div className="space-y-3">
        {currentQuestion.options.map(option => (
          <button
            key={option}
            onClick={() => handleSelectAnswer(option)}
            className={`w-full text-right p-4 rounded-lg border-2 transition-colors duration-200 ${
              selectedAnswer === option
                ? 'bg-blue-100 border-blue-500 font-bold'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      
      <div className="mt-8 text-left">
        <button
          onClick={handleNext}
          disabled={!selectedAnswer}
          className="bg-blue-600 text-white font-bold py-2 px-8 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {currentQuestionIndex < quiz.questions.length - 1 ? 'التالي' : 'إنهاء الاختبار'}
        </button>
      </div>
    </div>
  );
};

export default QuizComponent;
