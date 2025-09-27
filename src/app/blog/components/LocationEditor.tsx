"use client";

import React, { useState } from 'react';
import LocationInput, { LocationData } from './LocationInput';

interface LocationEditorProps {
  postId: string;
  currentLocation?: LocationData;
  onSave: (postId: string, location: LocationData | undefined) => void;
  onCancel: () => void;
}

export default function LocationEditor({ postId, currentLocation, onSave, onCancel }: LocationEditorProps) {
  const [location, setLocation] = useState<LocationData | undefined>(currentLocation);

  const handleSave = () => {
    onSave(postId, location);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Edit Location</h3>
        <p className="text-sm text-gray-600">Update or remove the location for this blog post.</p>
      </div>
      
      <LocationInput
        value={location}
        onChange={setLocation}
        placeholder="Add or update location..."
      />
      
      <div className="flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Location
        </button>
      </div>
    </div>
  );
}
