'use client';

import React, { useState } from 'react';
import {
  Code,
  Play,
  CheckCircle,
  XCircle,
  Lightbulb,
  BookOpen,
  Copy,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export default function CodingChallengePanel({ question, onSubmit, isSubmitted, userAnswer, isCorrect }) {
  const [code, setCode] = useState(userAnswer || '');
  const [copied, setCopied] = useState(false);

  const handleSubmit = () => {
    onSubmit(code);
  };

  const handleReset = () => {
    setCode('');
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLanguage = () => {
    return question.language || 'javascript';
  };

  return (
    <div className="space-y-6">
      {/* Challenge Header */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
            <Code className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-indigo-900 text-lg">Coding Challenge</h4>
            <p className="text-sm text-indigo-600 capitalize">Language: {getLanguage()}</p>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm border border-indigo-200 rounded-xl p-4">
          <div className="text-sm text-gray-900 leading-relaxed whitespace-pre-wrap font-mono">
            {question.question}
          </div>
        </div>

        {question.examples && question.examples.length > 0 && (
          <div className="mt-4 space-y-2">
            <div className="text-sm font-semibold text-indigo-900">Examples:</div>
            {question.examples.map((example, index) => (
              <div key={index} className="bg-white/60 border border-indigo-200 rounded-lg p-3">
                <div className="text-xs text-gray-600 mb-1">Example {index + 1}:</div>
                <div className="font-mono text-sm text-gray-900">
                  <div className="text-green-600">Input: {example.input}</div>
                  <div className="text-blue-600">Output: {example.output}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Code Editor */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            Your Solution
          </label>
          <div className="flex items-center gap-2">
            {!isSubmitted && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            )}
            <div className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-mono">
              {code.split('\n').length} lines
            </div>
          </div>
        </div>

        <div className="relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={isSubmitted}
            className={`w-full h-64 px-4 py-3 border-2 rounded-2xl font-mono text-sm resize-none transition-all ${
              isSubmitted
                ? isCorrect
                  ? 'bg-green-50 border-green-300 text-green-900'
                  : 'bg-red-50 border-red-300 text-red-900'
                : 'bg-gray-50 border-gray-300 text-gray-900 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent'
            }`}
            placeholder={`// Write your ${getLanguage()} code here...\n// Press Submit when ready`}
            spellCheck="false"
          />

          {/* Line numbers overlay (decorative) */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-800/5 rounded-l-2xl pointer-events-none flex flex-col text-xs text-gray-400 pt-3 pl-3 font-mono">
            {Array.from({ length: Math.max(10, code.split('\n').length) }, (_, i) => (
              <div key={i} className="leading-5">
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      {!isSubmitted && (
        <div className="flex items-center gap-3">
          <button
            onClick={handleSubmit}
            disabled={!code.trim()}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            <Play className="w-5 h-5" />
            Submit Solution
          </button>
        </div>
      )}

      {/* Results Panel */}
      {isSubmitted && (
        <div
          className={`p-6 rounded-2xl border-2 animate-fadeIn ${
            isCorrect
              ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
              : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-300'
          }`}
        >
          {/* Status Header */}
          <div className="flex items-start gap-4 mb-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                isCorrect ? 'bg-green-600' : 'bg-red-600'
              }`}
            >
              {isCorrect ? (
                <CheckCircle className="w-7 h-7 text-white" />
              ) : (
                <XCircle className="w-7 h-7 text-white" />
              )}
            </div>

            <div className="flex-1">
              <h4
                className={`text-xl font-bold mb-2 ${
                  isCorrect ? 'text-green-900' : 'text-red-900'
                }`}
              >
                {isCorrect ? '✅ Correct Solution!' : '❌ Incorrect Solution'}
              </h4>
              <p
                className={`text-sm leading-relaxed ${
                  isCorrect ? 'text-green-800' : 'text-red-800'
                }`}
              >
                {question.explanation}
              </p>
            </div>
          </div>

          {/* Expected Solution */}
          {!isCorrect && question.answer && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm font-bold text-gray-900">
                    Expected Solution
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(question.answer)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-white rounded-lg transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <div className="bg-gray-900 border-2 border-gray-700 rounded-xl p-4 overflow-x-auto">
                <pre className="font-mono text-sm text-green-400 whitespace-pre">
                  {question.answer}
                </pre>
              </div>
            </div>
          )}

          {/* Key Points */}
          {question.keyPoints && question.keyPoints.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-bold text-gray-900">Key Concepts</span>
              </div>
              <ul className="space-y-2">
                {question.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Review Lesson Link */}
          {question.lessonSegment && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <a
                href={`#lesson-${question.lessonSegment}`}
                className="flex items-center gap-3 px-4 py-3 bg-white border-2 border-blue-200 hover:border-blue-300 rounded-xl transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    Review Related Lesson
                  </div>
                  <div className="text-xs text-gray-600">{question.lessonSegment}</div>
                </div>
                <div className="text-blue-600 group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </a>
            </div>
          )}

          {/* Performance Metrics */}
          {isCorrect && question.metrics && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4">
                {question.metrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-green-900">{metric.value}</div>
                    <div className="text-xs text-green-700">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hints Panel (if not submitted) */}
      {!isSubmitted && question.hints && question.hints.length > 0 && (
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-bold text-yellow-900">Hints</span>
          </div>
          <ul className="space-y-2">
            {question.hints.map((hint, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-yellow-800">
                <span className="font-bold flex-shrink-0">{index + 1}.</span>
                <span>{hint}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
