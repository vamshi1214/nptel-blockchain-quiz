
import React from "react";
import { useQuiz } from "@/context/QuizContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, BookOpen, Shuffle, ListOrdered } from "lucide-react";

const WeekSelector: React.FC = () => {
  const { availableWeeks, loadQuiz, weeksData, loadingQuiz } = useQuiz();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Practice All Questions Option */}
        <Card className="overflow-hidden transition-all hover:shadow-md">
          <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-500" />
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold">Practice All</CardTitle>
            <CardDescription>
              Practice with all available questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-3">
              <ListOrdered className="h-5 w-5 text-purple-500" />
              <span className="text-sm">Complete question set</span>
            </div>
            <Button 
              className="w-full mt-2 bg-purple-500 hover:bg-purple-600"
              onClick={() => loadQuiz("all")} 
              disabled={loadingQuiz}
            >
              <BookOpen className="mr-2 h-4 w-4" /> Start Full Practice
            </Button>
          </CardContent>
        </Card>

        {/* Mixed Questions Option */}
        <Card className="overflow-hidden transition-all hover:shadow-md">
          <div className="h-2 bg-gradient-to-r from-quiz-primary to-quiz-secondary" />
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold">Mixed Questions</CardTitle>
            <CardDescription>
              Practice with random questions from all weeks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-3">
              <Shuffle className="h-5 w-5 text-quiz-primary" />
              <span className="text-sm">Random selection of questions</span>
            </div>
            <Button 
              className="w-full mt-2 bg-quiz-primary hover:bg-quiz-accent"
              onClick={() => loadQuiz("mixed")} 
              disabled={loadingQuiz}
            >
              <BookOpen className="mr-2 h-4 w-4" /> Start Mixed Quiz
            </Button>
          </CardContent>
        </Card>

        {/* Individual Week Options */}
        {availableWeeks.map((week) => {
          const weekData = weeksData.find(w => w.week === week);
          const totalQuestions = weekData?.questions.length || 0;
          
          return (
            <Card key={week} className="overflow-hidden transition-all hover:shadow-md">
              <div className="h-2 bg-quiz-primary" />
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold">Week {week}</CardTitle>
                <CardDescription>
                  {weekData?.title || `Week ${week} content`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-3">
                  <Check className="h-5 w-5 text-quiz-primary" />
                  <span className="text-sm">
                    {totalQuestions} questions available
                  </span>
                </div>
                <Button 
                  className="w-full mt-2"
                  onClick={() => loadQuiz(week)}
                  disabled={loadingQuiz}
                >
                  <BookOpen className="mr-2 h-4 w-4" /> Start Week {week}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default WeekSelector;
