// src/app/project/hook/useCreateProject.ts
import { useState } from 'react';
import { CreateProjectData } from '../types';

interface UseCreateProjectReturn {
  createProjectData: CreateProjectData;
  updateField: (field: keyof CreateProjectData, value: string | File | null | string[]) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  resetForm: () => void;
  handleSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

const initialData: CreateProjectData = {
  title: '',
  shortDescription: '',
  detailedDescription: '',
  tags: [],
  projectType: 'personal',
  coverImage: null,
  githubLink: '',
  websiteLink: ''
};

export const useCreateProject = (): UseCreateProjectReturn => {
  const [createProjectData, setCreateProjectData] = useState<CreateProjectData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof CreateProjectData, value: string | File | null | string[]) => {
    setCreateProjectData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = (tag: string) => {
    if (!createProjectData.tags.includes(tag) && createProjectData.tags.length < 10) {
      setCreateProjectData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setCreateProjectData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const resetForm = () => {
    setCreateProjectData(initialData);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Project created:', createProjectData);
      resetForm();
      return Promise.resolve();
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    createProjectData,
    updateField,
    addTag,
    removeTag,
    resetForm,
    handleSubmit,
    isSubmitting
  };
};
