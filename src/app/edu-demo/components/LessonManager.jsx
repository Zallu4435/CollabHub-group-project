'use client';

import React, { useState } from 'react';
import { LESSON_TEMPLATES } from '../lib/instructor.mock';

function LessonItem({ lesson, index, onEdit, onDelete, onMove }) {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return '🎥';
      case 'reading': return '📖';
      case 'quiz': return '📝';
      case 'project': return '🛠️';
      default: return '📄';
    }
  };
  
  const getTypeColor = (type) => {
    switch (type) {
      case 'video': return 'bg-blue-100 text-blue-800';
      case 'reading': return 'bg-green-100 text-green-800';
      case 'quiz': return 'bg-purple-100 text-purple-800';
      case 'project': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">{getTypeIcon(lesson.type)}</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(lesson.type)}`}>
                {lesson.type}
              </span>
            </div>
            <h4 className="font-medium text-gray-900">{lesson.title}</h4>
          </div>
          
          <p className="text-sm text-gray-600 mb-2">{lesson.description}</p>
          
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>⏱️ {lesson.duration} min</span>
            {lesson.type === 'quiz' && lesson.questions && (
              <span>❓ {lesson.questions.length} questions</span>
            )}
            {lesson.type === 'video' && (
              <span>📹 Video content</span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          {/* Drag Handle */}
          <button className="p-1 text-gray-400 hover:text-gray-600 cursor-move">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
            </svg>
          </button>
          
          <button
            onClick={() => onEdit(lesson)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
          >
            ✏️
          </button>
          
          <button
            onClick={() => onDelete(lesson.id)}
            className="p-1 text-red-600 hover:bg-red-50 rounded"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

function LessonEditor({ lesson, onSave, onClose }) {
  const [lessonData, setLessonData] = useState(lesson || LESSON_TEMPLATES.video);
  const [showVersionNotes, setShowVersionNotes] = useState(false);
  const [versionNotes, setVersionNotes] = useState('');
  
  const handleSave = () => {
    onSave({
      ...lessonData,
      id: lessonData.id || `lesson-${Date.now()}`,
      lastUpdated: new Date().toISOString(),
      versionNotes: versionNotes || undefined,
    });
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">
            {lesson ? 'Edit Lesson' : 'Create New Lesson'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Lesson Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Type</label>
            <select
              value={lessonData.type}
              onChange={(e) => setLessonData({ ...LESSON_TEMPLATES[e.target.value], id: lessonData.id })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            >
              <option value="video">Video Lesson</option>
              <option value="reading">Reading Material</option>
              <option value="quiz">Quiz</option>
              <option value="project">Project Assignment</option>
            </select>
          </div>
          
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={lessonData.title}
                onChange={(e) => setLessonData({ ...lessonData, title: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
              <input
                type="number"
                value={lessonData.duration}
                onChange={(e) => setLessonData({ ...lessonData, duration: parseInt(e.target.value) || 0 })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={lessonData.description}
              onChange={(e) => setLessonData({ ...lessonData, description: e.target.value })}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>
          
          {/* Type-specific content */}
          {lessonData.type === 'video' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Video Upload</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-2">🎥</div>
                  <p className="text-gray-600 mb-2">Upload video file</p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Choose Video File
                  </button>
                  <p className="text-xs text-gray-500 mt-2">Supported: MP4, MOV, AVI (Max 500MB)</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Video Notes</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-1">📄</div>
                  <p className="text-sm text-gray-600">Upload lesson notes (PDF, DOCX)</p>
                  <button className="mt-2 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                    Upload Notes
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {lessonData.type === 'reading' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reading Content</label>
              <textarea
                value={lessonData.content || ''}
                onChange={(e) => setLessonData({ ...lessonData, content: e.target.value })}
                rows={8}
                placeholder="Enter the reading material content..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />
            </div>
          )}
          
          {lessonData.type === 'quiz' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Passing Score (%)</label>
                <input
                  type="number"
                  value={lessonData.passingScore || 70}
                  onChange={(e) => setLessonData({ ...lessonData, passingScore: parseInt(e.target.value) || 70 })}
                  min="0"
                  max="100"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">📝 Quiz Builder</h4>
                <p className="text-sm text-blue-800">
                  After saving this lesson, you'll be able to add questions using our interactive quiz builder.
                </p>
              </div>
            </div>
          )}
          
          {lessonData.type === 'project' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Requirements</label>
                <textarea
                  value={lessonData.requirements?.join('\n') || ''}
                  onChange={(e) => setLessonData({ 
                    ...lessonData, 
                    requirements: e.target.value.split('\n').filter(r => r.trim()) 
                  })}
                  rows={5}
                  placeholder="Enter project requirements (one per line)..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Resources</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-1">📎</div>
                  <p className="text-sm text-gray-600">Upload starter files, templates, or resources</p>
                  <button className="mt-2 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                    Upload Files
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Version Notes */}
          <div>
            <button
              onClick={() => setShowVersionNotes(!showVersionNotes)}
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
            >
              📝 Add Version Notes
              <span className={`transition-transform ${showVersionNotes ? 'rotate-180' : ''}`}>▼</span>
            </button>
            
            {showVersionNotes && (
              <div className="mt-2">
                <textarea
                  value={versionNotes}
                  onChange={(e) => setVersionNotes(e.target.value)}
                  placeholder="Describe what changed in this version..."
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>
            )}
          </div>
          
          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LessonManager({ courseId }) {
  const [lessons, setLessons] = useState([
    {
      id: 'lesson-1',
      type: 'video',
      title: 'Course Introduction',
      description: 'Welcome to the course and overview of what you\'ll learn',
      duration: 15,
      lastUpdated: '2024-03-10',
    },
    {
      id: 'lesson-2',
      type: 'reading',
      title: 'Prerequisites and Setup',
      description: 'Required knowledge and development environment setup',
      duration: 30,
      lastUpdated: '2024-03-10',
    },
  ]);
  
  const [editingLesson, setEditingLesson] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  
  const handleCreateLesson = (type = 'video') => {
    setEditingLesson(null);
    setShowEditor(true);
  };
  
  const handleEditLesson = (lesson) => {
    setEditingLesson(lesson);
    setShowEditor(true);
  };
  
  const handleSaveLesson = (lessonData) => {
    if (editingLesson) {
      setLessons(lessons.map(l => l.id === editingLesson.id ? lessonData : l));
    } else {
      setLessons([...lessons, lessonData]);
    }
  };
  
  const handleDeleteLesson = (lessonId) => {
    if (confirm('Are you sure you want to delete this lesson?')) {
      setLessons(lessons.filter(l => l.id !== lessonId));
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Lesson Manager</h3>
          <p className="text-sm text-gray-600">Organize and manage your course content</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleCreateLesson('video')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <span>🎥</span>
            Add Video
          </button>
          
          <div className="relative group">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <span>➕</span>
              More
              <span className="text-xs">▼</span>
            </button>
            
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[150px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <button
                onClick={() => handleCreateLesson('reading')}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
              >
                <span>📖</span>
                Reading Material
              </button>
              <button
                onClick={() => handleCreateLesson('quiz')}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
              >
                <span>📝</span>
                Quiz
              </button>
              <button
                onClick={() => handleCreateLesson('project')}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
              >
                <span>🛠️</span>
                Project
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Lessons List */}
      <div className="space-y-4">
        {lessons.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-4xl mb-2">📚</div>
            <h4 className="font-medium text-gray-900 mb-1">No lessons yet</h4>
            <p className="text-gray-600 mb-4">Start building your course by adding your first lesson</p>
            <button
              onClick={() => handleCreateLesson('video')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create First Lesson
            </button>
          </div>
        ) : (
          lessons.map((lesson, index) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              index={index}
              onEdit={handleEditLesson}
              onDelete={handleDeleteLesson}
            />
          ))
        )}
      </div>
      
      {/* Drag and Drop Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-blue-600 text-lg">💡</span>
          <div>
            <h4 className="font-medium text-blue-900">Drag & Drop Organization</h4>
            <p className="text-sm text-blue-800 mt-1">
              Use the drag handles (⋮⋮) to reorder lessons. Students will see lessons in the order you arrange them here.
            </p>
          </div>
        </div>
      </div>
      
      {/* Lesson Editor Modal */}
      {showEditor && (
        <LessonEditor
          lesson={editingLesson}
          onSave={handleSaveLesson}
          onClose={() => {
            setShowEditor(false);
            setEditingLesson(null);
          }}
        />
      )}
    </div>
  );
}
