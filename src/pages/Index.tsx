
import React from "react";
import { QuizProvider } from "@/context/QuizContext";
import Header from "@/components/Header";
import Quiz from "@/components/Quiz";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col blockchain-pattern">
      <QuizProvider>
        <Header />
        <main className="flex-1 py-6">
          <Quiz />
        </main>
        <footer className="py-4 text-center text-sm text-muted-foreground">
          <p>All the content here belongs to nptel. I dont own anything. Try to practice here and all the best for the exam.</p>
        </footer>
      </QuizProvider>
    </div>
  );
};

export default Index;
