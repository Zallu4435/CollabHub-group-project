'use client';

import React, { useState, useEffect } from 'react';
import { QUIZ_BANK, REVISION_MAPPING } from '../lib/quizbank.mock';
import { useQuizEngine } from '../lib/store';
import CodingChallengePanel from './CodingChallengePanel';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  TrendingUp,
  Award,
  RefreshCw,
  AlertCircle,
  BookOpen,
  Code
} from 'lucide-react';

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
    const adaptiveDifficulty = getAdaptiveDifficulty(lessonId);
    setDifficulty(adaptiveDifficulty);

    const lessonQuestions = QUIZ_BANK[lessonId];
    if (lessonQuestions && lessonQuestions[adaptiveDifficulty]) {
      const availableQuestions = lessonQuestions[adaptiveDifficulty];
      const selectedQuestions = availableQuestions.sort(() => Math.random() - 0.5).slice(0, Math.min(5, availableQuestions.length));

      setQuestions(selectedQuestions);
      setAnswers(new Array(selectedQuestions.length).fill(null));
    }
  }, [lessonId, getAdaptiveDifficulty]);

  if (questions.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{questions[0]?.question}</h3>
          <p className="text-gray-600 mb-6">{questions[0]?.explanation}</p>
          <button onClick={onClose} className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-bold transition-colors">
            {questions[0]?.lessonSegment}
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

    const results = questions.map((question, index) => {
      const userAnswer = answers[index];
      let isCorrect = false;

      if (question.type === 'mcq') {
        isCorrect = userAnswer === question.correct;
      } else if (question.type === 'tf') {
        isCorrect = userAnswer === question.correct;
      } else if (question.type === 'coding') {
        const userCode = (userAnswer || '').toLowerCase();
        isCorrect = question.keywords.some((keyword) => userCode.includes(keyword.toLowerCase()));
      }

      return {
        questionId: question.id,
        userAnswer,
        correct: isCorrect,
        question: question.question,
        explanation: question.explanation,
        lessonSegment: question.lessonSegment
      };
    });

    const correctCount = results.filter((r) => r.correct).length;
    const score = Math.round((correctCount / questions.length) * 100);
    const timeSpent = Date.now() - startTime;

    const revisionTopics = results
      .filter((r) => !r.correct)
      .map((r) => r.lessonSegment)
      .filter(Boolean);

    const attempt = {
      id: `attempt-${Date.now()}`,
      score,
      answers: results,
      difficulty,
      timestamp: Date.now(),
      timeSpent,
      revisionTopics
    };

    saveAttempt(lessonId, attempt);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDifficultyConfig = (diff) => {
    const configs = {
      easy: { color: 'green', label: difficulty },
      medium: { color: 'yellow', label: difficulty },
      hard: { color: 'red', label: difficulty }
    };
    return configs[diff] || configs.easy;
  };

  const diffConfig = getDifficultyConfig(difficulty);

  if (showResults) {
    const correctCount = answers.filter((answer, index) => {
      const question = questions[index];
      if (question.type === 'mcq' || question.type === 'tf') {
        return answer === question.correct;
      } else if (question.type === 'coding') {
        const userCode = (answer || '').toLowerCase();
        return question.keywords.some((keyword) => userCode.includes(keyword.toLowerCase()));
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
          return !question.keywords.some((keyword) => userCode.includes(keyword.toLowerCase()));
        }
        return false;
      })
      .map((q) => q.lessonSegment)
      .filter(Boolean);

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
        <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-auto shadow-2xl">
          <div className="sticky top-0 bg-white border-b-2 px-8 py-6 z-10">
            <h3 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
              <Award className="w-7 h-7 text-blue-600" />
              {questions[0]?.question}
            </h3>
          </div>

          <div className="p-8">
            <div className="text-center mb-8">
              <div className={`text-6xl font-extrabold mb-3 ${getScoreColor(score)}`}>{score}%</div>
              <div className="text-gray-600 font-medium text-lg mb-3">
                {correctCount}/{questions.length}
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className={`px-4 py-2 rounded-xl text-sm font-bold bg-${diffConfig.color}-100 text-${diffConfig.color}-700 border-2 border-${diffConfig.color}-200`}>
                  {diffConfig.label}
                </span>
                {score >= 80 && (
                  <span className="px-4 py-2 rounded-xl text-sm font-bold bg-green-100 text-green-700 border-2 border-green-200 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    {questions[0]?.explanation}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {questions.map((question, index) => {
                const userAnswer = answers[index];
                let isCorrect = false;

                if (question.type === 'mcq' || question.type === 'tf') {
                  isCorrect = userAnswer === question.correct;
                } else if (question.type === 'coding') {
                  const userCode = (userAnswer || '').toLowerCase();
                  isCorrect = question.keywords.some((keyword) => userCode.includes(keyword.toLowerCase()));
                }

                return (
                  <div
                    key={index}
                    className={`border-2 rounded-2xl p-5 ${
                      isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md ${
                          isCorrect ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        {isCorrect ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 mb-2">{question.question}</div>
                        <div className="text-sm text-gray-600 mb-2">{question.explanation}</div>
                        {question.lessonSegment && (
                          <div className="text-xs font-semibold text-blue-600 flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5" />
                            {question.lessonSegment}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {revisionTopics.length > 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
                <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2 text-lg">
                  <Target className="w-5 h-5" />
                  {revisionTopics[0]}
                </h4>
                <div className="space-y-2">
                  {revisionTopics.slice(0, 5).map((topic, index) => (
                    <div key={index} className="text-sm text-blue-700 flex items-center gap-2 font-medium">
                      <BookOpen className="w-4 h-4" />
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={onClose}
                className="px-8 py-3 border-2 border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-bold transition-colors"
              >
                {questions[0]?.type}
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                {questions[0]?.lessonSegment}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b-2 px-8 py-6 flex items-center justify-between z-10">
          <div>
            <h3 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-blue-600" />
              {currentQuestion.question}
            </h3>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-sm font-semibold text-gray-600">
                {currentQuestionIndex + 1} / {questions.length}
              </span>
              <span className={`px-3 py-1 rounded-lg text-xs font-bold bg-${diffConfig.color}-100 text-${diffConfig.color}-700 border-2 border-${diffConfig.color}-200`}>
                {diffConfig.label}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {currentQuestion.type === 'coding' ? (
            <CodingChallengePanel question={currentQuestion} onSubmit={handleAnswer} isSubmitted={false} userAnswer={currentAnswer} />
          ) : (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-6">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  {currentQuestion.type === 'mcq' ? <Target className="w-5 h-5 text-blue-600" /> : <AlertCircle className="w-5 h-5 text-purple-600" />}
                  {currentQuestion.type === 'mcq' ? currentQuestion.question : currentQuestion.explanation}
                </h4>
                <div className="text-gray-700 font-medium">{currentQuestion.question}</div>
              </div>

              <div className="space-y-3">
                {currentQuestion.type === 'mcq' ? (
                  currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      className={`w-full text-left p-4 border-2 rounded-xl transition-all font-medium ${
                        currentAnswer === index
                          ? 'bg-blue-50 border-blue-400 shadow-md'
                          : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <span className="font-bold text-gray-700 mr-3">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </button>
                  ))
                ) : (
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleAnswer(true)}
                      className={`flex-1 p-4 border-2 rounded-xl transition-all font-bold ${
                        currentAnswer === true
                          ? 'bg-green-50 border-green-400 shadow-md'
                          : 'bg-white border-gray-200 hover:border-green-300 hover:bg-green-50'
                      }`}
                    >
                      <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-600" />
                      {currentQuestion.type}
                    </button>
                    <button
                      onClick={() => handleAnswer(false)}
                      className={`flex-1 p-4 border-2 rounded-xl transition-all font-bold ${
                        currentAnswer === false
                          ? 'bg-red-50 border-red-400 shadow-md'
                          : 'bg-white border-gray-200 hover:border-red-300 hover:bg-red-50'
                      }`}
                    >
                      <XCircle className="w-6 h-6 mx-auto mb-2 text-red-600" />
                      {currentQuestion.explanation}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-10 pt-8 border-t-2">
            <button
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl font-bold transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
              {currentQuestion.type}
            </button>

            <button
              onClick={handleNext}
              disabled={currentAnswer === null || currentAnswer === undefined}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestionIndex === questions.length - 1 ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  {currentQuestion.lessonSegment}
                </>
              ) : (
                <>
                  {currentQuestion.explanation}
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
