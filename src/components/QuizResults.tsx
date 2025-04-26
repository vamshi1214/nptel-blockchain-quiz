import React from "react";
import { useQuiz } from "@/context/QuizContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, X, List, Home } from "lucide-react";

const QuizResults: React.FC = () => {
  const { state, resetQuiz } = useQuiz();
  const { score, totalQuestions } = state;

  const percentage = Math.round((score / totalQuestions) * 100);
  
  let resultText: string;
  let resultClass: string;
  
  if (percentage >= 80) {
    resultText = "Excellent! You have a strong understanding.";
    resultClass = "text-quiz-correct";
  } else if (percentage >= 60) {
    resultText = "Good job! You're on the right track.";
    resultClass = "text-green-600";
  } else if (percentage >= 40) {
    resultText = "Keep practicing! You're making progress.";
    resultClass = "text-amber-600";
  } else {
    resultText = "Don't worry! Keep studying and try again.";
    resultClass = "text-red-600";
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground z-10"
        onClick={resetQuiz}
        title="Back to Home"
      >
        <Home className="h-5 w-5" />
      </Button>
      <CardHeader className="text-center pb-2 border-b">
        <CardTitle className="text-2xl">Quiz Results</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative w-40 h-40">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="block text-4xl font-bold">{score}/{totalQuestions}</span>
                <span className="text-sm text-muted-foreground">questions correct</span>
              </div>
            </div>
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={percentage >= 60 ? "#10b981" : percentage >= 40 ? "#f59e0b" : "#ef4444"}
                strokeWidth="10"
                strokeDasharray={`${percentage * 2.83} 283`}
              />
            </svg>
          </div>

          <div className="text-center">
            <h3 className={`text-xl font-semibold ${resultClass}`}>{resultText}</h3>
            <p className="mt-2 text-muted-foreground">
              You scored {percentage}% ({score} out of {totalQuestions} questions)
            </p>
          </div>

          <div className="w-full max-w-md space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-4 w-4 text-quiz-correct" />
              </div>
              <span className="text-sm">Correct answers: {score}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                <X className="h-4 w-4 text-quiz-incorrect" />
              </div>
              <span className="text-sm">Incorrect answers: {totalQuestions - score}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pt-4 border-t">
        <Button onClick={resetQuiz} className="bg-quiz-primary hover:bg-quiz-accent">
          <List className="mr-2 h-5 w-5" /> Return to Week Selection
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizResults;
