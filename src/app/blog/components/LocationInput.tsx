"use client";

import React, { useState, useEffect } from 'react';
import MapLocationPicker from './MapLocationPicker';
import { getGeocodingService } from '../utils/geocoding';

export type LocationData = {
  city?: string;
  state?: string;
  country?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  displayText: string;
};

interface LocationInputProps {
  value?: LocationData;
  onChange: (location: LocationData | undefined) => void;
  placeholder?: string;
}

export default function LocationInput({ value, onChange, placeholder = "Add location..." }: LocationInputProps) {
  const [isGeolocationSupported, setIsGeolocationSupported] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [manualInput, setManualInput] = useState(value?.displayText || '');
  const [showMapPicker, setShowMapPicker] = useState(false);

  useEffect(() => {
    setIsGeolocationSupported('geolocation' in navigator);
  }, []);

  const handleGeolocationDetect = () => {
    if (!isGeolocationSupported) return;
    
    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Use Google Maps Geocoding API
          const geocodingService = getGeocodingService();
          const location = await geocodingService.reverseGeocode(latitude, longitude);
          
          if (location) {
            onChange(location);
            setManualInput(location.displayText);
          } else {
            // Fallback to coordinates if geocoding fails
            const fallbackLocation: LocationData = {
              coordinates: { latitude, longitude },
              displayText: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
            };
            onChange(fallbackLocation);
            setManualInput(fallbackLocation.displayText);
          }
        } catch (error) {
          console.error('Error getting location:', error);
          // Check if it's a Google Maps API error
          if (error instanceof Error && error.message.includes('Google Maps API is not loaded')) {
            alert('Google Maps is not loaded yet. Please wait a moment and try again, or enter the location manually.');
          } else {
            alert('Unable to detect location. Please enter manually or use the map.');
          }
        } finally {
          setIsDetecting(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Location access denied. Please enter manually or use the map.');
        setIsDetecting(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const handleManualInput = async (text: string) => {
    setManualInput(text);
    if (text.trim()) {
      try {
        // Try to geocode the entered address
        const geocodingService = getGeocodingService();
        const location = await geocodingService.forwardGeocode(text);
        
        if (location) {
          onChange(location);
        } else {
          // Fallback to simple parsing if geocoding fails
          const parts = text.split(',').map(p => p.trim());
          const location: LocationData = {
            displayText: text,
            city: parts[0] || undefined,
            state: parts[1] || undefined,
            country: parts[2] || undefined,
          };
          onChange(location);
        }
      } catch (error) {
        console.error('Geocoding failed:', error);
        // If Google Maps API is not loaded, just use simple parsing
        if (error instanceof Error && error.message.includes('Google Maps API is not loaded')) {
          console.log('Google Maps API not loaded, using simple parsing');
        }
        // Fallback to simple parsing
        const parts = text.split(',').map(p => p.trim());
        const location: LocationData = {
          displayText: text,
          city: parts[0] || undefined,
          state: parts[1] || undefined,
          country: parts[2] || undefined,
        };
        onChange(location);
      }
    } else {
      onChange(undefined);
    }
  };

  const handleClear = () => {
    setManualInput('');
    onChange(undefined);
  };

  const handleMapLocationSelect = (location: LocationData) => {
    onChange(location);
    setManualInput(location.displayText);
    setShowMapPicker(false);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Location (Optional)
      </label>
      
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={manualInput}
            onChange={(e) => handleManualInput(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {isGeolocationSupported && (
            <button
              type="button"
              onClick={handleGeolocationDetect}
              disabled={isDetecting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 text-sm"
            >
              {isDetecting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Detecting...</span>
                </>
              ) : (
                <>
                  <span>📍</span>
                  <span>Auto-detect</span>
                </>
              )}
            </button>
          )}
          
          <button
            type="button"
            onClick={() => setShowMapPicker(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 text-sm"
          >
            <span>🗺️</span>
            <span>Map</span>
          </button>
          
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      
      {value && (
        <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <span>📍</span>
            <span>{value.displayText}</span>
          </div>
          {value.coordinates && (
            <div className="text-xs text-gray-500 mt-1">
              Coordinates: {value.coordinates.latitude.toFixed(4)}, {value.coordinates.longitude.toFixed(4)}
            </div>
          )}
        </div>
      )}
      
      <p className="text-xs text-gray-500">
        Add a location to help readers discover your content. You can type manually, use auto-detect, or select from map.
      </p>

      {/* Map Location Picker Modal */}
      <MapLocationPicker
        isOpen={showMapPicker}
        onClose={() => setShowMapPicker(false)}
        onLocationSelect={handleMapLocationSelect}
        initialLocation={value}
      />
    </div>
  );
}
