
import React from 'react';
import { useProgress } from '../context/ProgressContext';
import { LESSONS, QUIZZES } from '../constants';
import { BookOpen, FlaskConical, Trophy } from './icons/Icons';

const ProgressBar: React.FC<{ value: number; max: number; label: string }> = ({ value, max, label }) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-gray-700">{label}</span>
        <span className="text-sm font-medium text-gray-700">{value} / {max}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-green-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const ProgressTrackerPage: React.FC = () => {
  const { progress } = useProgress();
  
  const totalLessons = LESSONS.length;
  const completedLessons = progress.completedLessons.length;

  const totalQuizzes = QUIZZES.length;
  const completedQuizzes = progress.completedQuizzes.length;

  const averageScore = () => {
    const scores = Object.values(progress.quizScores);
    if(scores.length === 0) return 0;
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    const totalPossibleScore = progress.completedQuizzes.reduce((sum, qId) => {
        const quiz = QUIZZES.find(q => q.lessonId === qId);
        return sum + (quiz?.questions.length || 0);
    }, 0)
    return totalPossibleScore > 0 ? (totalScore / totalPossibleScore) * 100 : 0;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <Trophy className="h-16 w-16 mx-auto text-yellow-500" />
        <h1 className="text-3xl font-bold text-gray-800 mt-2">لوحة تتبع التقدم</h1>
        <p className="text-gray-600 mt-2">تابع رحلتك التعليمية وإنجازاتك!</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center text-blue-600">
            <BookOpen className="h-6 w-6 mr-2" />
            تقدم الدروس
          </h2>
          <ProgressBar value={completedLessons} max={totalLessons} label="الدروس المكتملة" />
        </div>

        <div>
           <h2 className="text-xl font-bold mb-4 flex items-center text-purple-600">
            <FlaskConical className="h-6 w-6 mr-2" />
            تقدم الاختبارات
          </h2>
          <ProgressBar value={completedQuizzes} max={totalQuizzes} label="الاختبارات المكتملة" />
          {completedQuizzes > 0 && 
            <div className="mt-4 text-center">
                <p className="font-semibold text-gray-700">متوسط الدرجات: <span className="text-green-600 font-bold">{averageScore().toFixed(1)}%</span></p>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default ProgressTrackerPage;
