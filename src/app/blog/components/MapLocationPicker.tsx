"use client";

import React, { useState, useEffect } from 'react';
import { LocationData } from './LocationInput';
import GoogleMapWrapper from './GoogleMapWrapper';
import { getGeocodingService } from '../utils/geocoding';

interface MapLocationPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: LocationData) => void;
  initialLocation?: LocationData;
}

export default function MapLocationPicker({ isOpen, onClose, onLocationSelect, initialLocation }: MapLocationPickerProps) {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({
    lat: initialLocation?.coordinates?.latitude || 40.7128,
    lng: initialLocation?.coordinates?.longitude || -74.0060
  });
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | undefined>(
    initialLocation?.coordinates ? {
      lat: initialLocation.coordinates.latitude,
      lng: initialLocation.coordinates.longitude
    } : undefined
  );

  useEffect(() => {
    if (initialLocation) {
      setSelectedLocation(initialLocation);
      if (initialLocation.coordinates) {
        setMapCenter({
          lat: initialLocation.coordinates.latitude,
          lng: initialLocation.coordinates.longitude
        });
        setMarkerPosition({
          lat: initialLocation.coordinates.latitude,
          lng: initialLocation.coordinates.longitude
        });
      }
    }
  }, [initialLocation]);

  const handleMapClick = async (lat: number, lng: number) => {
    setIsLoading(true);
    try {
      const geocodingService = getGeocodingService();
      const location = await geocodingService.reverseGeocode(lat, lng);
      
      if (location) {
        setSelectedLocation(location);
        setMarkerPosition({ lat, lng });
      }
    } catch (error) {
      console.error('Error getting location:', error);
      // Fallback to basic location data
      const fallbackLocation: LocationData = {
        coordinates: { latitude: lat, longitude: lng },
        displayText: `${lat.toFixed(4)}, ${lng.toFixed(4)}`
      };
      setSelectedLocation(fallbackLocation);
      setMarkerPosition({ lat, lng });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkerDrag = async (lat: number, lng: number) => {
    setIsLoading(true);
    try {
      const geocodingService = getGeocodingService();
      const location = await geocodingService.reverseGeocode(lat, lng);
      
      if (location) {
        setSelectedLocation(location);
      }
    } catch (error) {
      console.error('Error getting location:', error);
      // Update coordinates even if geocoding fails
      if (selectedLocation) {
        setSelectedLocation({
          ...selectedLocation,
          coordinates: { latitude: lat, longitude: lng }
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Select Location on Map</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex h-96">
          {/* Map Area */}
          <div className="flex-1 relative">
            <GoogleMapWrapper
              center={mapCenter}
              zoom={12}
              onMapClick={handleMapClick}
              onMarkerDrag={handleMarkerDrag}
              initialMarker={markerPosition}
              className="w-full h-full"
            />
            
            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-gray-700 font-medium">Getting location details...</span>
                </div>
              </div>
            )}
          </div>

          {/* Location Details Panel */}
          <div className="w-80 border-l border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Selected Location</h3>
            
            {selectedLocation ? (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">📍</span>
                    <span className="font-medium text-gray-900">Location Details</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    {selectedLocation.city && (
                      <div>
                        <span className="text-gray-600">City:</span>
                        <span className="ml-2 font-medium">{selectedLocation.city}</span>
                      </div>
                    )}
                    {selectedLocation.state && (
                      <div>
                        <span className="text-gray-600">State:</span>
                        <span className="ml-2 font-medium">{selectedLocation.state}</span>
                      </div>
                    )}
                    {selectedLocation.country && (
                      <div>
                        <span className="text-gray-600">Country:</span>
                        <span className="ml-2 font-medium">{selectedLocation.country}</span>
                      </div>
                    )}
                    {selectedLocation.coordinates && (
                      <div>
                        <span className="text-gray-600">Coordinates:</span>
                        <span className="ml-2 font-mono text-xs">
                          {selectedLocation.coordinates.latitude.toFixed(4)}, {selectedLocation.coordinates.longitude.toFixed(4)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm text-blue-800">
                    <strong>Display Text:</strong>
                    <p className="mt-1">{selectedLocation.displayText}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">📍</span>
                </div>
                <p className="text-gray-500">Click on the map to select a location</p>
              </div>
            )}

            <div className="flex space-x-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={!selectedLocation}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
