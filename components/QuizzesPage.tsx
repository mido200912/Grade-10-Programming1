
import React, { useState } from 'react';
import { QUIZZES, LESSONS } from '../constants';
import QuizComponent from './Quiz';
import { CheckCircle, FlaskConical, Lock } from './icons/Icons';
import { useProgress } from '../context/ProgressContext';
import { Quiz } from '../types';

const QuizzesPage: React.FC = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const { progress } = useProgress();

  const getLessonTitle = (lessonId: string) => {
    return LESSONS.find(l => l.id === lessonId)?.title || 'درس غير معروف';
  };
  
  if (selectedQuiz) {
    return <QuizComponent quiz={selectedQuiz} onBack={() => setSelectedQuiz(null)} />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">اختبر معلوماتك</h1>
      <div className="max-w-2xl mx-auto space-y-4">
        {QUIZZES.map(quiz => {
            const isCompleted = progress.completedQuizzes.includes(quiz.lessonId);
            const score = progress.quizScores[quiz.lessonId];
            return (
          <div
            key={quiz.lessonId}
            onClick={() => setSelectedQuiz(quiz)}
            className="p-4 rounded-lg border hover:shadow-lg hover:border-purple-500 transition-all duration-200 cursor-pointer flex items-center justify-between bg-white"
          >
            <div className="flex items-center">
              <div className="bg-purple-100 text-purple-600 p-3 rounded-full mr-4">
                 <FlaskConical className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-700">اختبار: {getLessonTitle(quiz.lessonId)}</h3>
                <p className="text-sm text-gray-500">{quiz.questions.length} أسئلة</p>
              </div>
            </div>
             {isCompleted ? (
                <div className="text-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mx-auto" />
                    <span className="text-xs text-green-600 font-bold">
                        {score}/{quiz.questions.length}
                    </span>
                </div>
              ) : (
                <Lock className="h-6 w-6 text-gray-400" />
              )}
          </div>
        )})}
      </div>
    </div>
  );
};

export default QuizzesPage;
