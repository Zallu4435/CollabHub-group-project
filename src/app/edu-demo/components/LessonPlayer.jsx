'use client';

import React, { useState, useEffect } from 'react';
import { useProgress } from '../lib/store';
import QuizPanel from './QuizPanel';
import AttemptHistory from './AttemptHistory';
import AssessmentPanel from './AssessmentPanel';

export default function LessonPlayer({ courseId, lessonId, lesson }) {
  const { updateLessonProgress, getLessonProgress } = useProgress();
  const [activeTab, setActiveTab] = useState('video');
  const [showQuiz, setShowQuiz] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  
  const lessonProgress = getLessonProgress(courseId, lessonId);
  const totalDuration = parseInt(lesson.duration) || 45; // minutes
  
  useEffect(() => {
    // Simulate video progress
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          const newProgress = Math.min((newTime / (totalDuration * 60)) * 100, 100);
          setProgress(newProgress);
          
          // Auto-complete lesson when 90% watched
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
  
  const mockNotes = [
    "React is a JavaScript library for building user interfaces",
    "Components are the building blocks of React applications",
    "JSX allows you to write HTML-like syntax in JavaScript",
    "Props are used to pass data from parent to child components",
    "State allows components to manage their own data"
  ];
  
  const mockResources = [
    { title: "React Official Documentation", url: "https://react.dev", type: "documentation" },
    { title: "Create React App", url: "https://create-react-app.dev", type: "tool" },
    { title: "React Developer Tools", url: "https://react.dev/learn/react-developer-tools", type: "extension" },
    { title: "Thinking in React", url: "https://react.dev/learn/thinking-in-react", type: "guide" }
  ];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player */}
          <div className="bg-black rounded-xl overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">🎥</div>
                <h3 className="text-xl font-semibold mb-2">{lesson.title}</h3>
                <p className="text-gray-300">Video Player Simulation</p>
              </div>
              
              {/* Play/Pause Button */}
              <button
                onClick={handlePlayPause}
                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors"
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white text-2xl">
                    {isPlaying ? '⏸️' : '▶️'}
                  </span>
                </div>
              </button>
            </div>
            
            {/* Video Controls */}
            <div className="bg-gray-900 px-4 py-3">
              <div className="flex items-center gap-4">
                <button onClick={handlePlayPause} className="text-white hover:text-blue-400">
                  {isPlaying ? '⏸️' : '▶️'}
                </button>
                
                <div className="flex-1">
                  <div 
                    className="bg-gray-700 h-2 rounded-full cursor-pointer"
                    onClick={handleSeek}
                  >
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(totalDuration * 60)}
                </div>
                
                <button className="text-white hover:text-blue-400">
                  🔊
                </button>
                
                <button className="text-white hover:text-blue-400">
                  ⛶
                </button>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">Lesson Progress</span>
              <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
            </div>
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            {progress >= 90 && (
              <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
                ✅ Lesson completed!
              </div>
            )}
          </div>
          
          {/* Tabs */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="border-b">
              <div className="flex">
                {[
                  { id: 'video', label: '📹 Video', count: null },
                  { id: 'notes', label: '📝 Notes', count: mockNotes.length },
                  { id: 'resources', label: '🔗 Resources', count: mockResources.length },
                  { id: 'assessment', label: '📊 Assessment', count: null },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                    {tab.count && (
                      <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-4">
              {activeTab === 'video' && (
                <div className="space-y-4">
                  <div className="text-center">
                    <button
                      onClick={() => setShowQuiz(true)}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 flex items-center gap-2 mx-auto"
                    >
                      🤖 Generate AI Test
                    </button>
                    <p className="text-sm text-gray-600 mt-2">
                      Test your understanding with adaptive questions
                    </p>
                  </div>
                </div>
              )}
              
              {activeTab === 'notes' && (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Key Takeaways</h4>
                  <ul className="space-y-2">
                    {mockNotes.map((note, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span className="text-gray-700">{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {activeTab === 'resources' && (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Additional Resources</h4>
                  <div className="space-y-2">
                    {mockResources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                      >
                        <span className="text-lg">
                          {resource.type === 'documentation' ? '📚' :
                           resource.type === 'tool' ? '🛠️' :
                           resource.type === 'extension' ? '🔧' : '📖'}
                        </span>
                        <div>
                          <div className="font-medium text-gray-900">{resource.title}</div>
                          <div className="text-sm text-gray-600 capitalize">{resource.type}</div>
                        </div>
                        <span className="ml-auto text-blue-500">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'assessment' && (
                <AssessmentPanel 
                  lessonId={lessonId}
                  courseId={courseId}
                  onPracticeAgain={(variant) => {
                    console.log('Starting new practice variant:', variant);
                    setShowQuiz(true);
                  }}
                />
              )}
            </div>
          </div>
          
          {/* Attempt History */}
          <AttemptHistory lessonId={lessonId} />
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-4">Lesson Info</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{lesson.duration}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium capitalize">{lesson.type}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium ${
                  lessonProgress.completed ? 'text-green-600' : 'text-blue-600'
                }`}>
                  {lessonProgress.completed ? 'Completed' : 'In Progress'}
                </span>
              </div>
              
              {lessonProgress.timeSpent > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Time Spent:</span>
                  <span className="font-medium">{Math.round(lessonProgress.timeSpent / 60)}min</span>
                </div>
              )}
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <a
                href={`/edu-demo/course/${courseId}`}
                className="block w-full text-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                ← Back to Course
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quiz Modal */}
      {showQuiz && (
        <QuizPanel
          lessonId={lessonId}
          onClose={() => setShowQuiz(false)}
        />
      )}
    </div>
  );
}
