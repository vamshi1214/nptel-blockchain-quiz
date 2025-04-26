
import React from "react";
import { useQuiz } from "@/context/QuizContext";
import WeekSelector from "@/components/WeekSelector";
import QuizCard from "@/components/QuizCard";
import QuizResults from "@/components/QuizResults";

const Quiz: React.FC = () => {
  const { state } = useQuiz();
  const { questions, quizCompleted } = state;

  return (
    <div className="container mx-auto px-4 py-8">
      {questions.length === 0 ? (
        <div>
          <h2 className="text-2xl font-bold text-center mb-8">Select a Week to Practice</h2>
          <WeekSelector />
        </div>
      ) : quizCompleted ? (
        <QuizResults />
      ) : (
        <QuizCard />
      )}
    </div>
  );
};

export default Quiz;
