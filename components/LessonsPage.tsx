
import React, { useState } from 'react';
import { LESSONS } from '../constants';
import LessonDetail from './LessonDetail';
import { CheckCircle, Lock } from './icons/Icons';
import { useProgress } from '../context/ProgressContext';
import { Lesson } from '../types';

const LessonsPage: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const { progress } = useProgress();

  if (selectedLesson) {
    return <LessonDetail lesson={selectedLesson} onBack={() => setSelectedLesson(null)} />;
  }

  const units = [...new Set(LESSONS.map(lesson => lesson.unit))];

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">منهج البرمجة والذكاء الاصطناعي</h1>
      <div className="space-y-8">
        {units.map(unit => (
          <div key={unit} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">الوحدة {unit}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {LESSONS.filter(l => l.unit === unit).map(lesson => (
                <div
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson)}
                  className="p-4 rounded-lg border hover:shadow-lg hover:border-blue-500 transition-all duration-200 cursor-pointer flex items-center justify-between bg-gray-50"
                >
                  <div>
                    <h3 className="font-bold text-gray-700">{lesson.title}</h3>
                    <p className="text-sm text-gray-500">درس في الوحدة {lesson.unit}</p>
                  </div>
                  {progress.completedLessons.includes(lesson.id) ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <Lock className="h-6 w-6 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonsPage;
