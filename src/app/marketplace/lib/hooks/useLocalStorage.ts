// market/src/lib/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Remove from localStorage
  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  // Clear all localStorage
  const clearAll = () => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.clear();
      }
      setStoredValue(initialValue);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  };

  // Get all keys from localStorage
  const getAllKeys = () => {
    if (typeof window === 'undefined') {
      return [];
    }
    
    try {
      return Object.keys(window.localStorage);
    } catch (error) {
      console.error('Error getting localStorage keys:', error);
      return [];
    }
  };

  // Get value by key
  const getValue = (key: string) => {
    if (typeof window === 'undefined') {
      return null;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return null;
    }
  };

  // Set value by key
  const setValueByKey = (key: string, value: any) => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Remove value by key
  const removeValueByKey = (key: string) => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  // Check if key exists
  const hasKey = (key: string) => {
    if (typeof window === 'undefined') {
      return false;
    }
    
    try {
      return window.localStorage.getItem(key) !== null;
    } catch (error) {
      console.error(`Error checking localStorage key "${key}":`, error);
      return false;
    }
  };

  // Get storage size
  const getStorageSize = () => {
    if (typeof window === 'undefined') {
      return 0;
    }
    
    try {
      let total = 0;
      for (let key in window.localStorage) {
        if (window.localStorage.hasOwnProperty(key)) {
          total += window.localStorage[key].length + key.length;
        }
      }
      return total;
    } catch (error) {
      console.error('Error calculating localStorage size:', error);
      return 0;
    }
  };

  // Get storage quota
  const getStorageQuota = async () => {
    if (typeof window === 'undefined' || !('storage' in navigator) || !('estimate' in navigator.storage)) {
      return null;
    }
    
    try {
      const estimate = await navigator.storage.estimate();
      return estimate;
    } catch (error) {
      console.error('Error getting storage quota:', error);
      return null;
    }
  };

  return {
    value: storedValue,
    setValue,
    removeValue,
    clearAll,
    getAllKeys,
    getValue,
    setValueByKey,
    removeValueByKey,
    hasKey,
    getStorageSize,
    getStorageQuota
  };
};
