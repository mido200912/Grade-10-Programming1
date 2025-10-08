import React, { useState } from 'react';
import { Page } from '../types';
import { BrainCircuit, BookOpen, Code, FlaskConical, Trophy, Home, Menu, X } from './icons/Icons';

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
  onClick?: () => void;
}> = ({ page, currentPage, setCurrentPage, icon, label, onClick }) => {
  const isActive = currentPage === page;

  const handleClick = () => {
    setCurrentPage(page);
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 w-full justify-end md:w-auto ${
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { page: 'home', icon: <Home className="h-5 w-5" />, label: 'الرئيسية' },
    { page: 'lessons', icon: <BookOpen className="h-5 w-5" />, label: 'الدروس' },
    { page: 'codelab', icon: <Code className="h-5 w-5" />, label: 'مختبر الكود' },
    { page: 'quizzes', icon: <FlaskConical className="h-5 w-5" />, label: 'الاختبارات' },
    { page: 'aitutor', icon: <BrainCircuit className="h-5 w-5" />, label: 'المعلم الذكي' },
    { page: 'progress', icon: <Trophy className="h-5 w-5" />, label: 'تقدمي' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => {
              setCurrentPage('home');
              closeMobileMenu();
            }}
          >
            <BrainCircuit className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">مسار المبرمج</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1 space-x-reverse">
             {navLinks.map(link => (
                <NavItem
                    key={link.page}
                    page={link.page as Page}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    icon={link.icon}
                    label={link.label}
                />
            ))}
          </div>
          
          {/* Mobile Nav Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
                {navLinks.map(link => (
                    <NavItem
                        key={link.page}
                        page={link.page as Page}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        icon={link.icon}
                        label={link.label}
                        onClick={closeMobileMenu}
                    />
                ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
