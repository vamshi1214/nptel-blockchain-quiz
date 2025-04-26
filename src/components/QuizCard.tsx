import React from "react";
import { useQuiz } from "@/context/QuizContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, X, ArrowRight, Home } from "lucide-react";

const QuizCard: React.FC = () => {
  const { state, selectAnswer, submitAnswer, nextQuestion, resetQuiz } = useQuiz();
  const { 
    currentQuestionIndex, 
    questions, 
    selectedAnswers, 
    isAnswered, 
    isCorrect, 
    totalQuestions 
  } = state;

  if (questions.length === 0) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / totalQuestions) * 100;
  const isMultipleAnswer = currentQuestion.answer.length > 1;

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground z-10"
        onClick={resetQuiz}
        title="Back to Home"
      >
        <Home className="h-5 w-5" />
      </Button>
      <CardHeader className="pb-2 border-b">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-quiz-primary">
            {isMultipleAnswer ? "Select all that apply" : "Select one answer"}
          </span>
        </div>
        <Progress value={progress} className="h-1" />
        <CardTitle className="text-xl mt-4">
          {currentQuestion.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(currentQuestion.options).map(([key, value]) => {
            const isSelected = selectedAnswers.includes(key);
            const isCorrectOption = isAnswered && currentQuestion.answer.includes(key);
            const isIncorrectSelection = isAnswered && isSelected && !currentQuestion.answer.includes(key);
            
            let buttonClassName = `
              w-full h-full min-h-[100px] flex flex-col items-start justify-center 
              ${isMultipleAnswer ? 'rounded-md border-2' : 'rounded-lg'}
              transition-all duration-200 ease-in-out
              ${!isAnswered ? 'hover:bg-blue-50 hover:border-quiz-primary' : ''}
              ${isSelected && !isAnswered ? 'border-quiz-primary bg-blue-50' : ''}
              ${isAnswered && isCorrectOption ? 'border-quiz-correct bg-green-50' : ''}
              ${isIncorrectSelection ? 'border-quiz-incorrect bg-red-50' : ''}
              ${!isSelected && !isAnswered ? 'border-gray-200' : ''}
            `;
            
            return (
              <button
                key={key}
                className={buttonClassName}
                onClick={() => !isAnswered && selectAnswer(key)}
              >
                <div className="flex items-center w-full p-4">
                  <div className={`
                    w-6 h-6 mr-4 flex items-center justify-center 
                    ${isMultipleAnswer ? 'rounded-md border-2' : 'rounded-full'}
                    ${isSelected ? 'bg-quiz-primary border-quiz-primary text-white' : 'border-gray-300'}
                    ${isAnswered && isCorrectOption ? 'bg-quiz-correct border-quiz-correct text-white' : ''}
                    ${isIncorrectSelection ? 'bg-quiz-incorrect border-quiz-incorrect text-white' : ''}
                  `}>
                    {isSelected && !isAnswered && (isMultipleAnswer ? "✓" : key)}
                    {isAnswered && isCorrectOption && <Check className="h-4 w-4" />}
                    {isIncorrectSelection && <X className="h-4 w-4" />}
                    {!isSelected && !isAnswered && (isMultipleAnswer ? "" : key)}
                  </div>
                  <div className="flex-1">
                    <div className="text-base font-medium text-left">
                      {isMultipleAnswer ? `Option ${key.toUpperCase()}` : value}
                    </div>
                    {isMultipleAnswer && <p className="text-sm text-gray-600 mt-1 text-left">{value}</p>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {isAnswered && currentQuestion.explanation && (
          <div className={`
            mt-6 p-4 rounded-md
            ${isCorrect ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"}
          `}>
            <div className="font-semibold mb-1">
              {isCorrect ? "Correct!" : "Incorrect"}
            </div>
            <p className="text-sm">{currentQuestion.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end border-t pt-4">
        {!isAnswered ? (
          <Button 
            onClick={submitAnswer}
            disabled={selectedAnswers.length === 0}
            className="bg-quiz-primary hover:bg-quiz-accent"
          >
            Submit Answer
          </Button>
        ) : (
          <Button onClick={nextQuestion}>
            {currentQuestionIndex < totalQuestions - 1 ? (
              <>Next Question <ArrowRight className="ml-2 h-4 w-4" /></>
            ) : (
              "See Results"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
