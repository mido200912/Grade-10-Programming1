
import React from 'react';
import { Page } from '../types';
import { BookOpen, BrainCircuit, PlayCircle } from './icons/Icons';

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
}

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}> = ({ icon, title, description, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-200"
  >
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);


const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  return (
    <div className="text-center py-10">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-fade-in-down">
        مرحبًا بك في <span className="text-blue-600">مسار المبرمج الصغير</span>
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 animate-fade-in-up">
        منصتك الأولى لتعلم البرمجة والذكاء الاصطناعي لمنهج أولى ثانوي في مصر. تعلم، جرب، واختبر مهاراتك بطريقة تفاعلية وممتعة.
      </p>
      
      <button 
        onClick={() => setCurrentPage('lessons')}
        className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg flex items-center justify-center mx-auto mb-16 animate-bounce"
      >
        <PlayCircle className="h-6 w-6 ml-2" />
        ابدأ رحلة التعلم الآن
      </button>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-right">
        <FeatureCard
          icon={<BookOpen className="h-6 w-6" />}
          title="منهج البرمجة"
          description="دروس تفصيلية تغطي كل جوانب منهج البرمجة، من الخوارزميات إلى الحلقات التكرارية."
          onClick={() => setCurrentPage('lessons')}
        />
        <FeatureCard
          icon={<BrainCircuit className="h-6 w-6" />}
          title="مدخل إلى الذكاء الاصطناعي"
          description="استكشف عالم الذكاء الاصطناعي، تعلم أساسياته، واكتشف تطبيقاته المدهشة في حياتنا."
          onClick={() => setCurrentPage('lessons')}
        />
      </div>
    </div>
  );
};

export default HomePage;
