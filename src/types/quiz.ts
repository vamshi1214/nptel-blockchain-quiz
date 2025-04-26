
export interface QuizQuestion {
  question: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
    [key: string]: string;
  };
  answer: string[];
  explanation?: string;
}

export interface WeekData {
  week: number;
  title: string;
  questions: QuizQuestion[];
}

export type WeeksData = WeekData[];

export interface QuizState {
  currentQuestionIndex: number;
  selectedAnswers: string[];
  isAnswered: boolean;
  isCorrect: boolean | null;
  score: number;
  totalQuestions: number;
  quizCompleted: boolean;
  questions: QuizQuestion[];
}

export interface QuizContextType {
  state: QuizState;
  loadQuiz: (weekNumber: number | "mixed") => void;
  selectAnswer: (option: string) => void;
  submitAnswer: () => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
  weeksData: WeeksData;
  availableWeeks: number[];
  loadingQuiz: boolean;
}
