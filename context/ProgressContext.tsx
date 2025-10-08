
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Progress, ProgressContextType } from '../types';

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const initialProgress: Progress = {
  completedLessons: [],
  completedQuizzes: [],
  quizScores: {},
};

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<Progress>(() => {
    try {
      const savedProgress = localStorage.getItem('studentProgress');
      return savedProgress ? JSON.parse(savedProgress) : initialProgress;
    } catch (error) {
      console.error("Failed to parse progress from localStorage", error);
      return initialProgress;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('studentProgress', JSON.stringify(progress));
    } catch (error) {
      console.error("Failed to save progress to localStorage", error);
    }
  }, [progress]);

  const completeLesson = (lessonId: string) => {
    setProgress(prev => {
      if (prev.completedLessons.includes(lessonId)) {
        return prev;
      }
      return { ...prev, completedLessons: [...prev.completedLessons, lessonId] };
    });
  };

  const completeQuiz = (quizId: string, score: number) => {
    setProgress(prev => {
        const newScores = { ...prev.quizScores, [quizId]: score };
        if (prev.completedQuizzes.includes(quizId)) {
            return { ...prev, quizScores: newScores };
        }
        return { 
            ...prev, 
            completedQuizzes: [...prev.completedQuizzes, quizId],
            quizScores: newScores 
        };
    });
  };

  return (
    <ProgressContext.Provider value={{ progress, completeLesson, completeQuiz }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
