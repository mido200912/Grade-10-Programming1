
import React, { useEffect } from 'react';
import { Lesson } from '../types';
import { ArrowRight, Check, Code, FileText, ListChecks } from './icons/Icons';
import { useProgress } from '../context/ProgressContext';

interface LessonDetailProps {
  lesson: Lesson;
  onBack: () => void;
}

const LessonDetail: React.FC<LessonDetailProps> = ({ lesson, onBack }) => {
  const { progress, completeLesson } = useProgress();
  const isCompleted = progress.completedLessons.includes(lesson.id);

  const handleCompleteLesson = () => {
    completeLesson(lesson.id);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 animate-fade-in">
      <button onClick={onBack} className="flex items-center text-blue-600 hover:underline mb-6 font-semibold">
        <ArrowRight className="h-5 w-5 ml-2" />
        العودة إلى قائمة الدروس
      </button>

      <header className="mb-8 border-b pb-4">
        <span className="text-sm font-medium text-blue-500 bg-blue-100 py-1 px-3 rounded-full">الوحدة {lesson.unit}</span>
        <h1 className="text-4xl font-bold text-gray-800 mt-2">{lesson.title}</h1>
      </header>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold flex items-center text-gray-700 mb-3"><FileText className="h-6 w-6 ml-2 text-purple-500"/>شرح الدرس</h2>
          <p className="text-gray-600 leading-relaxed text-lg">{lesson.description}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold flex items-center text-gray-700 mb-3"><Code className="h-6 w-6 ml-2 text-purple-500"/>مثال عملي (Python)</h2>
          <div className="bg-gray-800 text-white p-4 rounded-lg font-mono text-right" dir="ltr">
            <pre><code>{lesson.pythonExample.trim()}</code></pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold flex items-center text-gray-700 mb-3"><ListChecks className="h-6 w-6 ml-2 text-purple-500"/>تمارين قصيرة</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            {lesson.exercises.map((exercise, index) => (
              <li key={index}>{exercise}</li>
            ))}
          </ul>
        </section>
      </div>
      
      <div className="mt-10 pt-6 border-t text-center">
        <button
          onClick={handleCompleteLesson}
          disabled={isCompleted}
          className={`w-full md:w-auto px-8 py-3 rounded-lg font-bold text-white transition-all duration-300 flex items-center justify-center mx-auto ${
            isCompleted
              ? 'bg-green-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          <Check className="h-6 w-6 ml-2"/>
          {isCompleted ? 'تم إكمال الدرس بنجاح' : 'أكملت هذا الدرس'}
        </button>
      </div>
    </div>
  );
};

export default LessonDetail;
