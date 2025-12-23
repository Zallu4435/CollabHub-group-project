'use client';

import React, { useState, useEffect } from 'react';
import { useProgress } from '../lib/store';
import QuizPanel from './QuizPanel';
import AttemptHistory from './AttemptHistory';
import AssessmentPanel from './AssessmentPanel';
import {
  Play,
  Pause,
  Volume2,
  Maximize,
  CheckCircle,
  Video,
  FileText,
  Link,
  BarChart3,
  Sparkles,
  BookOpen,
  ExternalLink,
  ArrowLeft,
  Clock,
  TrendingUp
} from 'lucide-react';

export default function LessonPlayer({ courseId, lessonId, lesson }) {
  const { updateLessonProgress, getLessonProgress } = useProgress();
  const [activeTab, setActiveTab] = useState('video');
  const [showQuiz, setShowQuiz] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const lessonProgress = getLessonProgress(courseId, lessonId);
  const totalDuration = parseInt(lesson.duration) || 45;

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1;
          const newProgress = Math.min((newTime / (totalDuration * 60)) * 100, 100);
          setProgress(newProgress);

          if (newProgress >= 90 && !lessonProgress.completed) {
            updateLessonProgress(courseId, lessonId, true, newTime);
          }

          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalDuration, courseId, lessonId, lessonProgress.completed, updateLessonProgress]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = (clickX / rect.width) * 100;
    const newTime = (newProgress / 100) * (totalDuration * 60);

    setProgress(newProgress);
    setCurrentTime(newTime);
  };

  const mockNotes = ['', '', '', '', ''];
  const mockResources = [
    { title: lesson.title, url: '', type: 'documentation' },
    { title: lesson.description, url: '', type: 'tool' },
    { title: lesson.title, url: '', type: 'extension' },
    { title: lesson.description, url: '', type: 'guide' }
  ];

  const tabs = [
    { id: 'video', label: lesson.title, icon: Video, count: null },
    { id: 'notes', label: lesson.description, icon: FileText, count: mockNotes.length },
    { id: 'resources', label: lesson.title, icon: Link, count: mockResources.length },
    { id: 'assessment', label: lesson.description, icon: BarChart3, count: null }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-black rounded-3xl overflow-hidden shadow-2xl">
            <div className="aspect-video bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center relative">
              <div className="text-center text-white z-10">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                  <Video className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{lesson.title}</h3>
                <p className="text-gray-300">{lesson.description}</p>
              </div>

              <button
                onClick={handlePlayPause}
                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors group"
              >
                <div className="w-20 h-20 bg-white/20 group-hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-all">
                  {isPlaying ? <Pause className="w-10 h-10 text-white" /> : <Play className="w-10 h-10 text-white ml-1" />}
                </div>
              </button>
            </div>

            <div className="bg-gray-900 px-6 py-4">
              <div className="flex items-center gap-4">
                <button onClick={handlePlayPause} className="text-white hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-white/10">
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>

                <div className="flex-1">
                  <div className="bg-gray-700 h-2 rounded-full cursor-pointer overflow-hidden" onClick={handleSeek}>
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className="text-white text-sm font-semibold tabular-nums">
                  {formatTime(currentTime)} / {formatTime(totalDuration * 60)}
                </div>

                <button className="text-white hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-white/10">
                  <Volume2 className="w-5 h-5" />
                </button>

                <button className="text-white hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-white/10">
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-gray-900">{lesson.title}</span>
              <span className="text-sm font-bold text-gray-600">{Math.round(progress)}%</span>
            </div>
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            {progress >= 90 && (
              <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-green-600">
                <CheckCircle className="w-5 h-5" />
                {lesson.description}
              </div>
            )}
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-md">
            <div className="border-b-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-4 transition-all ${
                        isActive
                          ? 'border-blue-500 text-blue-600 bg-blue-50'
                          : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                      {tab.count && (
                        <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-bold">
                          {tab.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'video' && (
                <div className="space-y-6">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-purple-600" />
                    </div>
                    <button
                      onClick={() => setShowQuiz(true)}
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 mx-auto"
                    >
                      <Sparkles className="w-5 h-5" />
                      {lesson.title}
                    </button>
                    <p className="text-sm text-gray-600 mt-4 font-medium">{lesson.description}</p>
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    {lesson.title}
                  </h4>
                  <ul className="space-y-3">
                    {mockNotes.map((note, index) => (
                      <li key={index} className="flex items-start gap-3 p-3 bg-blue-50 border-2 border-blue-200 rounded-xl">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <span className="text-gray-700 leading-relaxed">{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                    <Link className="w-5 h-5 text-green-600" />
                    {lesson.description}
                  </h4>
                  <div className="space-y-3">
                    {mockResources.map((resource, index) => {
                      const icons = {
                        documentation: BookOpen,
                        tool: ExternalLink,
                        extension: Sparkles,
                        guide: FileText
                      };
                      const ResourceIcon = icons[resource.type];
                      return (
                        <a
                          key={index}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-4 p-4 border-2 border-gray-200 rounded-2xl hover:border-blue-300 hover:bg-blue-50 transition-all"
                        >
                          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                            <ResourceIcon className="w-6 h-6 text-green-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {resource.title}
                            </div>
                            <div className="text-sm text-gray-600 capitalize">{resource.type}</div>
                          </div>
                          <ExternalLink className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'assessment' && (
                <AssessmentPanel
                  lessonId={lessonId}
                  courseId={courseId}
                  onPracticeAgain={(variant) => {
                    console.log('', variant);
                    setShowQuiz(true);
                  }}
                />
              )}
            </div>
          </div>

          <AttemptHistory lessonId={lessonId} />
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 sticky top-24 shadow-lg">
            <h3 className="font-bold text-gray-900 mb-6 text-xl">{lesson.title}</h3>

            <div className="space-y-4">
              {[
                { label: lesson.duration, value: lesson.duration, icon: Clock },
                { label: lesson.type, value: lesson.type, icon: Video },
                {
                  label: lessonProgress.completed ? lesson.title : lesson.description,
                  value: lessonProgress.completed ? lesson.title : lesson.description,
                  icon: lessonProgress.completed ? CheckCircle : TrendingUp,
                  color: lessonProgress.completed ? 'text-green-600' : 'text-blue-600'
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                      <Icon className={`w-4 h-4 ${item.color || 'text-gray-400'}`} />
                      {item.label}
                    </div>
                    <span className={`font-bold capitalize ${item.color || 'text-gray-900'}`}>{item.value}</span>
                  </div>
                );
              })}

              {lessonProgress.timeSpent > 0 && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {lesson.title}
                  </div>
                  <span className="font-bold text-gray-900">{Math.round(lessonProgress.timeSpent / 60)}</span>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t-2">
              <a
                href={`/edu-demo/course/${courseId}`}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-xl font-bold transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                {lesson.description}
              </a>
            </div>
          </div>
        </div>
      </div>

      {showQuiz && <QuizPanel lessonId={lessonId} onClose={() => setShowQuiz(false)} />}
    </div>
  );
}
