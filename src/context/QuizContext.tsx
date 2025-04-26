import React, { createContext, useContext, useState, useEffect } from "react";
import { QuizContextType, QuizState, WeeksData, QuizQuestion } from "@/types/quiz";
import weeksData from "@/data/weeks.json";
import { toast } from "@/components/ui/sonner";

const initialQuizState: QuizState = {
  currentQuestionIndex: 0,
  selectedAnswers: [],
  isAnswered: false,
  isCorrect: null,
  score: 0,
  totalQuestions: 0,
  quizCompleted: false,
  questions: [],
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<QuizState>(initialQuizState);
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  // Get available weeks from data (1 to 12)
  const availableWeeks = Array.from({ length: 12 }, (_, i) => i + 1);

  // Load quiz for a specific week or mixed questions
  const loadQuiz = (weekNumber: number | "mixed" | "all") => {
    setLoadingQuiz(true);
    
    try {
      let selectedQuestions: QuizQuestion[] = [];
      
      if (weekNumber === "all") {
        // Get all questions from all weeks
        selectedQuestions = weeksData.flatMap(week => week.questions);
      } else if (weekNumber === "mixed") {
        // Get a random selection of questions from all weeks
        const allQuestions = weeksData.flatMap(week => week.questions);
        selectedQuestions = shuffleArray(allQuestions).slice(0, 10);
      } else {
        // Get questions for the selected week
        const weekData = weeksData.find(week => week.week === weekNumber);
        if (weekData) {
          selectedQuestions = weekData.questions;
        }
      }
      
      if (selectedQuestions.length === 0) {
        toast.error("No questions available for this selection");
        setLoadingQuiz(false);
        return;
      }
      
      setState({
        ...initialQuizState,
        questions: selectedQuestions,
        totalQuestions: selectedQuestions.length,
      });
      
      const quizType = weekNumber === "mixed" ? "Mixed Questions" : 
                       weekNumber === "all" ? "Full Practice" : 
                       `Week ${weekNumber}`;
      toast.success(`Quiz loaded: ${quizType}`);
    } catch (error) {
      console.error("Error loading quiz:", error);
      toast.error("Failed to load quiz");
    } finally {
      setLoadingQuiz(false);
    }
  };

  // Select answer(s) for the current question
  const selectAnswer = (option: string) => {
    if (state.isAnswered) return;

    setState(prev => {
      // If the option is already selected, remove it
      if (prev.selectedAnswers.includes(option)) {
        return {
          ...prev,
          selectedAnswers: prev.selectedAnswers.filter(a => a !== option),
        };
      } 
      
      // Check if the current question allows multiple answers
      const currentQuestion = prev.questions[prev.currentQuestionIndex];
      if (currentQuestion.answer.length > 1) {
        // Add the option to the selected answers
        return {
          ...prev,
          selectedAnswers: [...prev.selectedAnswers, option],
        };
      }
      
      // For single answer questions, replace any previous selection
      return {
        ...prev,
        selectedAnswers: [option],
      };
    });
  };

  // Submit the answer for the current question
  const submitAnswer = () => {
    if (state.isAnswered || state.selectedAnswers.length === 0) return;

    const currentQuestion = state.questions[state.currentQuestionIndex];
    
    // Sort both arrays to compare them regardless of order
    const sortedSelected = [...state.selectedAnswers].sort();
    const sortedCorrect = [...currentQuestion.answer].sort();
    
    // Check if the selected answers match the correct answers
    const isCorrect = 
      sortedSelected.length === sortedCorrect.length && 
      sortedSelected.every((value, index) => value === sortedCorrect[index]);
    
    setState(prev => ({
      ...prev,
      isAnswered: true,
      isCorrect: isCorrect,
      score: isCorrect ? prev.score + 1 : prev.score,
    }));
  };

  // Move to the next question or complete quiz
  const nextQuestion = () => {
    setState(prev => {
      const nextIndex = prev.currentQuestionIndex + 1;
      
      if (nextIndex >= prev.questions.length) {
        // Quiz is completed
        return {
          ...prev,
          quizCompleted: true,
        };
      }
      
      // Move to next question
      return {
        ...prev,
        currentQuestionIndex: nextIndex,
        selectedAnswers: [],
        isAnswered: false,
        isCorrect: null,
      };
    });
  };

  // Reset the quiz
  const resetQuiz = () => {
    setState(initialQuizState);
  };

  return (
    <QuizContext.Provider
      value={{
        state,
        loadQuiz,
        selectAnswer,
        submitAnswer,
        nextQuestion,
        resetQuiz,
        weeksData,
        availableWeeks,
        loadingQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

// Helper function to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Custom hook to use the quiz context
export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
