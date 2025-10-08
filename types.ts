
export type Page = 'home' | 'lessons' | 'codelab' | 'quizzes' | 'aitutor' | 'progress';

export interface Lesson {
  id: string;
  unit: number;
  title: string;
  description: string;
  pythonExample: string;
  exercises: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Quiz {
  lessonId: string;
  questions: QuizQuestion[];
}

export interface Progress {
  completedLessons: string[];
  completedQuizzes: string[];
  quizScores: { [quizId: string]: number };
}

export interface ProgressContextType {
  progress: Progress;
  completeLesson: (lessonId: string) => void;
  completeQuiz: (quizId:string, score: number) => void;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
