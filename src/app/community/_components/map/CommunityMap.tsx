'use client';

import { useState } from 'react';
import MemberMarker from './MemberMarker';
import EventMarker from './EventMarker';
import MapFilters from './MapFilters';

interface MapMember {
  id: string;
  name: string;
  avatar: string;
  location: { lat: number; lng: number };
  city: string;
  country: string;
}

interface MapEvent {
  id: string;
  title: string;
  location: { lat: number; lng: number };
  city: string;
  date: string;
  type: 'online' | 'in-person';
}

interface CommunityMapProps {
  members: MapMember[];
  events: MapEvent[];
}

export default function CommunityMap({ members, events }: CommunityMapProps) {
  const [showMembers, setShowMembers] = useState(true);
  const [showEvents, setShowEvents] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [mapView, setMapView] = useState<'roadmap' | 'satellite'>('roadmap');

  const filteredMembers = selectedCountry === 'all' 
    ? members 
    : members.filter(m => m.country === selectedCountry);

  const filteredEvents = selectedCountry === 'all'
    ? events
    : events.filter(e => e.city.includes(selectedCountry));

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-5 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Interactive Map</h2>
            <p className="text-sm text-gray-600 flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="font-semibold text-gray-900">{filteredMembers.length}</span> members
              </span>
              <span className="text-gray-400">•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span className="font-semibold text-gray-900">{filteredEvents.length}</span> events
              </span>
            </p>
          </div>
          <MapFilters
            showMembers={showMembers}
            showEvents={showEvents}
            selectedCountry={selectedCountry}
            mapView={mapView}
            onToggleMembers={setShowMembers}
            onToggleEvents={setShowEvents}
            onCountryChange={setSelectedCountry}
            onMapViewChange={setMapView}
          />
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-[600px] bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        {/* Map Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Interactive Map Coming Soon</h3>
            <p className="text-gray-600 mb-4">
              The map will be powered by Google Maps or Mapbox for real-time visualization
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Real-time updates
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search locations
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Custom filters
              </span>
            </div>
          </div>
        </div>

        {/* Simulated Markers - Demo */}
        {showMembers && filteredMembers.slice(0, 5).map((member, index) => (
          <div
            key={member.id}
            className="absolute transition-all duration-300 hover:z-10"
            style={{
              left: `${20 + index * 15}%`,
              top: `${30 + index * 10}%`
            }}
          >
            <MemberMarker member={member} />
          </div>
        ))}

        {showEvents && filteredEvents.slice(0, 3).map((event, index) => (
          <div
            key={event.id}
            className="absolute transition-all duration-300 hover:z-10"
            style={{
              left: `${60 + index * 10}%`,
              top: `${40 + index * 15}%`
            }}
          >
            <EventMarker event={event} />
          </div>
        ))}

        {/* Map Controls */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2">
          <button className="w-10 h-10 bg-white border-2 border-gray-300 rounded-lg shadow-lg hover:bg-gray-50 transition-all flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button className="w-10 h-10 bg-white border-2 border-gray-300 rounded-lg shadow-lg hover:bg-gray-50 transition-all flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-6 left-6 bg-white border border-gray-200 rounded-xl shadow-lg p-4">
          <h4 className="text-sm font-bold text-gray-900 mb-3">Legend</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>
              <span className="text-sm text-gray-700">Members</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm text-gray-700">Events</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-600">Global community</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-600">Live updates</span>
            </div>
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            View Full Screen
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
