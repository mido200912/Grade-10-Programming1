
import React from 'react';
import { Page } from '../types';
import { BrainCircuit, BookOpen, Code, FlaskConical, Trophy, Home } from './icons/Icons';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavItem: React.FC<{
  page: Page;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  icon: React.ReactNode;
  label: string;
}> = ({ page, currentPage, setCurrentPage, icon, label }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => setCurrentPage(page)}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-gray-600 hover:bg-blue-100 hover:text-blue-700'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <BrainCircuit className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">مسار المبرمج</span>
          </div>
          <div className="hidden md:flex items-center space-x-1 space-x-reverse">
             <NavItem
              page="home"
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              icon={<Home className="h-5 w-5" />}
              label="الرئيسية"
            />
            <NavItem
              page="lessons"
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              icon={<BookOpen className="h-5 w-5" />}
              label="الدروس"
            />
            <NavItem
              page="codelab"
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              icon={<Code className="h-5 w-5" />}
              label="مختبر الكود"
            />
            <NavItem
              page="quizzes"
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              icon={<FlaskConical className="h-5 w-5" />}
              label="الاختبارات"
            />
            <NavItem
              page="aitutor"
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              icon={<BrainCircuit className="h-5 w-5" />}
              label="المعلم الذكي"
            />
            <NavItem
              page="progress"
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              icon={<Trophy className="h-5 w-5" />}
              label="تقدمي"
            />
          </div>
          {/* Mobile menu could be added here */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
