'use client';

import React, { useState, useEffect } from 'react';
import { QUIZ_BANK, REVISION_MAPPING } from '../lib/quizbank.mock';
import { useQuizEngine } from '../lib/store';
import CodingChallengePanel from './CodingChallengePanel';

export default function QuizPanel({ lessonId, onClose }) {
  const { saveAttempt, getAdaptiveDifficulty } = useQuizEngine();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [startTime] = useState(Date.now());
  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  
  useEffect(() => {
    // Get adaptive difficulty and generate quiz
    const adaptiveDifficulty = getAdaptiveDifficulty(lessonId);
    setDifficulty(adaptiveDifficulty);
    
    const lessonQuestions = QUIZ_BANK[lessonId];
    if (lessonQuestions && lessonQuestions[adaptiveDifficulty]) {
      // Select 5 random questions from the difficulty level
      const availableQuestions = lessonQuestions[adaptiveDifficulty];
      const selectedQuestions = availableQuestions
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(5, availableQuestions.length));
      
      setQuestions(selectedQuestions);
      setAnswers(new Array(selectedQuestions.length).fill(null));
    }
  }, [lessonId, getAdaptiveDifficulty]);
  
  if (questions.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Quiz Available</h3>
          <p className="text-gray-600 mb-4">No questions are available for this lesson yet.</p>
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-lg">
            Close
          </button>
        </div>
      </div>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];
  
  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };
  
  const finishQuiz = () => {
    setIsSubmitted(true);
    setShowResults(true);
    
    // Calculate results
    const results = questions.map((question, index) => {
      const userAnswer = answers[index];
      let isCorrect = false;
      
      if (question.type === 'mcq') {
        isCorrect = userAnswer === question.correct;
      } else if (question.type === 'tf') {
        isCorrect = userAnswer === question.correct;
      } else if (question.type === 'coding') {
        // Simple keyword matching for coding questions
        const userCode = (userAnswer || '').toLowerCase();
        isCorrect = question.keywords.some(keyword => 
          userCode.includes(keyword.toLowerCase())
        );
      }
      
      return {
        questionId: question.id,
        userAnswer,
        correct: isCorrect,
        question: question.question,
        explanation: question.explanation,
        lessonSegment: question.lessonSegment,
      };
    });
    
    const correctCount = results.filter(r => r.correct).length;
    const score = Math.round((correctCount / questions.length) * 100);
    const timeSpent = Date.now() - startTime;
    
    // Get revision topics for incorrect answers
    const revisionTopics = results
      .filter(r => !r.correct)
      .map(r => r.lessonSegment)
      .filter(Boolean);
    
    // Save attempt
    const attempt = {
      id: `attempt-${Date.now()}`,
      score,
      answers: results,
      difficulty,
      timestamp: Date.now(),
      timeSpent,
      revisionTopics,
    };
    
    saveAttempt(lessonId, attempt);
  };
  
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  if (showResults) {
    const correctCount = answers.filter((answer, index) => {
      const question = questions[index];
      if (question.type === 'mcq' || question.type === 'tf') {
        return answer === question.correct;
      } else if (question.type === 'coding') {
        const userCode = (answer || '').toLowerCase();
        return question.keywords.some(keyword => 
          userCode.includes(keyword.toLowerCase())
        );
      }
      return false;
    }).length;
    
    const score = Math.round((correctCount / questions.length) * 100);
    const revisionTopics = questions
      .filter((question, index) => {
        const answer = answers[index];
        if (question.type === 'mcq' || question.type === 'tf') {
          return answer !== question.correct;
        } else if (question.type === 'coding') {
          const userCode = (answer || '').toLowerCase();
          return !question.keywords.some(keyword => 
            userCode.includes(keyword.toLowerCase())
          );
        }
        return false;
      })
      .map(q => q.lessonSegment)
      .filter(Boolean);
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4">
            <h3 className="text-xl font-bold text-gray-900">Quiz Results</h3>
          </div>
          
          <div className="p-6">
            <div className="text-center mb-6">
              <div className={`text-4xl font-bold mb-2 ${getScoreColor(score)}`}>
                {score}%
              </div>
              <div className="text-gray-600">
                {correctCount}/{questions.length} questions correct
              </div>
              <div className="mt-2 flex items-center justify-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                  difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {difficulty} difficulty
                </span>
              </div>
            </div>
            
            {/* Question Review */}
            <div className="space-y-4 mb-6">
              {questions.map((question, index) => {
                const userAnswer = answers[index];
                let isCorrect = false;
                
                if (question.type === 'mcq' || question.type === 'tf') {
                  isCorrect = userAnswer === question.correct;
                } else if (question.type === 'coding') {
                  const userCode = (userAnswer || '').toLowerCase();
                  isCorrect = question.keywords.some(keyword => 
                    userCode.includes(keyword.toLowerCase())
                  );
                }
                
                return (
                  <div key={index} className={`border rounded-lg p-4 ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-medium ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 mb-1">
                          {question.question}
                        </div>
                        <div className="text-sm text-gray-600">
                          {question.explanation}
                        </div>
                        {question.lessonSegment && (
                          <div className="text-xs text-blue-600 mt-1">
                            📺 {question.lessonSegment}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Revision Recommendations */}
            {revisionTopics.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-900 mb-2">Recommended Revision</h4>
                <div className="space-y-1">
                  {revisionTopics.slice(0, 5).map((topic, index) => (
                    <div key={index} className="text-sm text-blue-700">
                      📺 {topic}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Close
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">AI-Generated Quiz</h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className={`px-2 py-1 rounded text-xs ${
                difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {difficulty}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>
        
        <div className="p-6">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
          
          {/* Question */}
          {currentQuestion.type === 'coding' ? (
            <CodingChallengePanel
              question={currentQuestion}
              onSubmit={handleAnswer}
              isSubmitted={false}
              userAnswer={currentAnswer}
            />
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-50 border rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  {currentQuestion.type === 'mcq' ? 'Multiple Choice' : 'True or False'}
                </h4>
                <div className="text-gray-700">
                  {currentQuestion.question}
                </div>
              </div>
              
              <div className="space-y-2">
                {currentQuestion.type === 'mcq' ? (
                  currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      className={`w-full text-left p-3 border rounded-lg transition-colors ${
                        currentAnswer === index 
                          ? 'bg-blue-50 border-blue-300' 
                          : 'bg-white border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      <span className="font-medium text-gray-700 mr-2">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      {option}
                    </button>
                  ))
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAnswer(true)}
                      className={`flex-1 p-3 border rounded-lg transition-colors ${
                        currentAnswer === true 
                          ? 'bg-green-50 border-green-300' 
                          : 'bg-white border-gray-300 hover:border-green-300'
                      }`}
                    >
                      True
                    </button>
                    <button
                      onClick={() => handleAnswer(false)}
                      className={`flex-1 p-3 border rounded-lg transition-colors ${
                        currentAnswer === false 
                          ? 'bg-red-50 border-red-300' 
                          : 'bg-white border-gray-300 hover:border-red-300'
                      }`}
                    >
                      False
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t">
            <button
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <button
              onClick={handleNext}
              disabled={currentAnswer === null || currentAnswer === undefined}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
