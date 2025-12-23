'use client';

import React, { useState } from 'react';
import { LESSON_TEMPLATES } from '../lib/instructor.mock';
import {
  Video,
  BookOpen,
  FileText,
  Wrench,
  Clock,
  Edit,
  Trash2,
  GripVertical,
  Plus,
  ChevronDown,
  Upload,
  X,
  Save,
  Lightbulb,
  HelpCircle
} from 'lucide-react';

function LessonItem({ lesson, index, onEdit, onDelete }) {
  const getTypeConfig = (type) => {
    const configs = {
      video: { icon: Video, color: 'blue', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800' },
      reading: { icon: BookOpen, color: 'green', bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800' },
      quiz: { icon: HelpCircle, color: 'purple', bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800' },
      project: { icon: Wrench, color: 'orange', bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800' }
    };
    return configs[type] || configs.video;
  };

  const config = getTypeConfig(lesson.type);
  const TypeIcon = config.icon;

  return (
    <div className="group bg-white border-2 border-gray-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-xl transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <button className="p-2 text-gray-400 hover:text-gray-600 cursor-move rounded-lg hover:bg-gray-100 transition-colors">
            <GripVertical className="w-5 h-5" />
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl ${config.bg} border-2 ${config.border} flex items-center justify-center`}>
                <TypeIcon className={`w-5 h-5 ${config.text}`} />
              </div>
              <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 ${config.bg} ${config.border} ${config.text}`}>
                {lesson.type}
              </span>
              <h4 className="font-bold text-gray-900 text-lg">{lesson.title}</h4>
            </div>

            <p className="text-sm text-gray-600 mb-3 leading-relaxed">{lesson.description}</p>

            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                <Clock className="w-4 h-4" />
                {lesson.duration}
              </span>
              {lesson.type === 'quiz' && lesson.questions && (
                <span className="flex items-center gap-1.5 text-purple-600 font-medium">
                  <HelpCircle className="w-4 h-4" />
                  {lesson.questions.length}
                </span>
              )}
              {lesson.type === 'video' && (
                <span className="flex items-center gap-1.5 text-blue-600 font-medium">
                  <Video className="w-4 h-4" />
                  {lesson.title}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onEdit(lesson)}
            className="p-2.5 rounded-xl border-2 border-blue-200 hover:bg-blue-50 text-blue-600 transition-colors"
          >
            <Edit className="w-5 h-5" />
          </button>

          <button
            onClick={() => onDelete(lesson.id)}
            className="p-2.5 rounded-xl border-2 border-red-200 hover:bg-red-50 text-red-600 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
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
      versionNotes: versionNotes || undefined
    });
    onClose();
  };

  const getTypeConfig = (type) => {
    const configs = {
      video: { icon: Video, label: lessonData.title },
      reading: { icon: BookOpen, label: lessonData.description },
      quiz: { icon: HelpCircle, label: lessonData.type },
      project: { icon: Wrench, label: lessonData.title }
    };
    return configs[type] || configs.video;
  };

  const config = getTypeConfig(lessonData.type);
  const TypeIcon = config.icon;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b-2 px-8 py-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <TypeIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900">
              {lesson ? lessonData.title : lessonData.description}
            </h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
              <FileText className="w-4 h-4 text-blue-600" />
              {lessonData.type}
            </label>
            <select
              value={lessonData.type}
              onChange={(e) => setLessonData({ ...LESSON_TEMPLATES[e.target.value], id: lessonData.id })}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="video">{LESSON_TEMPLATES.video.title}</option>
              <option value="reading">{LESSON_TEMPLATES.reading.title}</option>
              <option value="quiz">{LESSON_TEMPLATES.quiz.title}</option>
              <option value="project">{LESSON_TEMPLATES.project.title}</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">{lessonData.title}</label>
              <input
                type="text"
                value={lessonData.title}
                onChange={(e) => setLessonData({ ...lessonData, title: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                <Clock className="w-4 h-4 text-purple-600" />
                {lessonData.duration}
              </label>
              <input
                type="number"
                value={lessonData.duration}
                onChange={(e) => setLessonData({ ...lessonData, duration: parseInt(e.target.value) || 0 })}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">{lessonData.description}</label>
            <textarea
              value={lessonData.description}
              onChange={(e) => setLessonData({ ...lessonData, description: e.target.value })}
              rows={3}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {lessonData.type === 'video' && (
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                  <Video className="w-4 h-4 text-blue-600" />
                  {lessonData.title}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Video className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-gray-900 font-semibold mb-2">{lessonData.description}</p>
                  <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-md">
                    {lessonData.title}
                  </button>
                  <p className="text-xs text-gray-500 mt-3">{lessonData.description}</p>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                  <FileText className="w-4 h-4 text-green-600" />
                  {lessonData.title}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-green-400 hover:bg-green-50 transition-all cursor-pointer">
                  <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">{lessonData.description}</p>
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-colors">
                    {lessonData.title}
                  </button>
                </div>
              </div>
            </div>
          )}

          {lessonData.type === 'reading' && (
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                <BookOpen className="w-4 h-4 text-green-600" />
                {lessonData.content || lessonData.title}
              </label>
              <textarea
                value={lessonData.content || ''}
                onChange={(e) => setLessonData({ ...lessonData, content: e.target.value })}
                rows={10}
                placeholder={lessonData.description}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none font-mono text-sm"
              />
            </div>
          )}

          {lessonData.type === 'quiz' && (
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                  <HelpCircle className="w-4 h-4 text-purple-600" />
                  {lessonData.passingScore || 70}
                </label>
                <input
                  type="number"
                  value={lessonData.passingScore || 70}
                  onChange={(e) => setLessonData({ ...lessonData, passingScore: parseInt(e.target.value) || 70 })}
                  min="0"
                  max="100"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
                <h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  {lessonData.title}
                </h4>
                <p className="text-sm text-purple-800">{lessonData.description}</p>
              </div>
            </div>
          )}

          {lessonData.type === 'project' && (
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                  <Wrench className="w-4 h-4 text-orange-600" />
                  {lessonData.requirements?.join('\n') || lessonData.title}
                </label>
                <textarea
                  value={lessonData.requirements?.join('\n') || ''}
                  onChange={(e) =>
                    setLessonData({
                      ...lessonData,
                      requirements: e.target.value.split('\n').filter((r) => r.trim())
                    })
                  }
                  rows={6}
                  placeholder={lessonData.description}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                  <Upload className="w-4 h-4 text-orange-600" />
                  {lessonData.title}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-orange-400 hover:bg-orange-50 transition-all cursor-pointer">
                  <Upload className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">{lessonData.description}</p>
                  <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-semibold transition-colors">
                    {lessonData.title}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              onClick={() => setShowVersionNotes(!showVersionNotes)}
              className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              <FileText className="w-4 h-4" />
              {lessonData.versionNotes || lessonData.title}
              <ChevronDown className={`w-4 h-4 transition-transform ${showVersionNotes ? 'rotate-180' : ''}`} />
            </button>

            {showVersionNotes && (
              <div className="mt-3">
                <textarea
                  value={versionNotes}
                  onChange={(e) => setVersionNotes(e.target.value)}
                  placeholder={lessonData.description}
                  rows={3}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-8 border-t-2">
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-bold transition-colors"
            >
              {lessonData.title}
            </button>
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              {lessonData.description}
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
      description: "Welcome to the course and overview of what you'll learn",
      duration: 15,
      lastUpdated: '2024-03-10'
    },
    {
      id: 'lesson-2',
      type: 'reading',
      title: 'Prerequisites and Setup',
      description: 'Required knowledge and development environment setup',
      duration: 30,
      lastUpdated: '2024-03-10'
    }
  ]);

  const [editingLesson, setEditingLesson] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleCreateLesson = (type = 'video') => {
    setEditingLesson(null);
    setShowEditor(true);
    setShowMenu(false);
  };

  const handleEditLesson = (lesson) => {
    setEditingLesson(lesson);
    setShowEditor(true);
  };

  const handleSaveLesson = (lessonData) => {
    if (editingLesson) {
      setLessons(lessons.map((l) => (l.id === editingLesson.id ? lessonData : l)));
    } else {
      setLessons([...lessons, lessonData]);
    }
  };

  const handleDeleteLesson = (lessonId) => {
    if (confirm('')) {
      setLessons(lessons.filter((l) => l.id !== lessonId));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <h3 className="text-3xl font-extrabold text-gray-900 mb-2">{lessons[0]?.title}</h3>
          <p className="text-gray-600">{lessons[0]?.description}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleCreateLesson('video')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            <Video className="w-5 h-5" />
            {lessons[0]?.type}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="px-6 py-3 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl font-bold transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {lessons[0]?.description}
              <ChevronDown className={`w-4 h-4 transition-transform ${showMenu ? 'rotate-180' : ''}`} />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl py-2 min-w-[200px] z-20 animate-fadeIn">
                {[
                  { type: 'reading', icon: BookOpen, label: LESSON_TEMPLATES.reading.title },
                  { type: 'quiz', icon: HelpCircle, label: LESSON_TEMPLATES.quiz.title },
                  { type: 'project', icon: Wrench, label: LESSON_TEMPLATES.project.title }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.type}
                      onClick={() => handleCreateLesson(item.type)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-semibold text-gray-700">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {lessons.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-blue-600" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-2">{lessons[0]?.title}</h4>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">{lessons[0]?.description}</p>
            <button
              onClick={() => handleCreateLesson('video')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all"
            >
              {lessons[0]?.title}
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

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-blue-900 text-lg mb-2">{lessons[0]?.title}</h4>
            <p className="text-sm text-blue-800 leading-relaxed">{lessons[0]?.description}</p>
          </div>
        </div>
      </div>

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
