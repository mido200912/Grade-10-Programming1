
import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import LessonsPage from './components/LessonsPage';
import CodeLabPage from './components/CodeLabPage';
import QuizzesPage from './components/QuizzesPage';
import AITutorPage from './components/AITutorPage';
import ProgressTrackerPage from './components/ProgressTrackerPage';
import { Page } from './types';
import { ProgressProvider } from './context/ProgressContext';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'lessons':
        return <LessonsPage />;
      case 'codelab':
        return <CodeLabPage />;
      case 'quizzes':
        return <QuizzesPage />;
      case 'aitutor':
        return <AITutorPage />;
      case 'progress':
        return <ProgressTrackerPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <ProgressProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="container mx-auto px-4 py-8">
          {renderPage()}
        </main>
      </div>
    </ProgressProvider>
  );
};

export default App;
