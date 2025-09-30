'use client';

import { useState } from 'react';
import MentorCard from './MentorCard';
import SearchBar from '../common/SearchBar';
import FilterDropdown from '../common/FilterDropdown';

interface Mentor {
  id: string;
  name: string;
  username: string;
  avatar: string;
  title: string;
  expertise: string[];
  bio: string;
  mentees: number;
  rating: number;
  availability: 'available' | 'limited' | 'unavailable';
}

interface MentorDiscoveryProps {
  mentors: Mentor[];
}

export default function MentorDiscovery({ mentors: initialMentors }: MentorDiscoveryProps) {
  const [mentors, setMentors] = useState(initialMentors);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);

  const expertiseOptions = [
    { value: 'programming', label: 'Programming' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'business', label: 'Business' },
    { value: 'data-science', label: 'Data Science' }
  ];

  const availabilityOptions = [
    { value: 'available', label: 'Available' },
    { value: 'limited', label: 'Limited Slots' },
    { value: 'unavailable', label: 'Unavailable' }
  ];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesExpertise = selectedExpertise.length === 0 ||
                            mentor.expertise.some(skill => 
                              selectedExpertise.includes(skill.toLowerCase())
                            );
    
    const matchesAvailability = selectedAvailability.length === 0 ||
                               selectedAvailability.includes(mentor.availability);

    return matchesSearch && matchesExpertise && matchesAvailability;
  });

  const hasActiveFilters = selectedExpertise.length > 0 || selectedAvailability.length > 0;

  return (
    <div className="space-y-6">
      {/* Search & Filters Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Find Your Perfect Mentor
        </h2>
        
        <div className="space-y-4">
          <SearchBar
            placeholder="Search by name, title, or expertise..."
            onSearch={setSearchQuery}
            className="w-full"
          />

          <div className="flex flex-wrap items-center gap-3">
            <FilterDropdown
              title="Expertise"
              options={expertiseOptions}
              selected={selectedExpertise}
              onChange={setSelectedExpertise}
              multiple
            />

            <FilterDropdown
              title="Availability"
              options={availabilityOptions}
              selected={selectedAvailability}
              onChange={setSelectedAvailability}
              multiple
            />

            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSelectedExpertise([]);
                  setSelectedAvailability([]);
                }}
                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear filters
              </button>
            )}
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 pt-2">
              {selectedExpertise.map(exp => (
                <span key={exp} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {expertiseOptions.find(opt => opt.value === exp)?.label}
                  <button
                    onClick={() => setSelectedExpertise(selectedExpertise.filter(e => e !== exp))}
                    className="hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
              {selectedAvailability.map(avail => (
                <span key={avail} className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {availabilityOptions.find(opt => opt.value === avail)?.label}
                  <button
                    onClick={() => setSelectedAvailability(selectedAvailability.filter(a => a !== avail))}
                    className="hover:bg-green-200 rounded-full p-0.5"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results Counter */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 font-medium">
          Showing <span className="text-gray-900 font-bold">{filteredMentors.length}</span> mentor{filteredMentors.length !== 1 ? 's' : ''}
        </p>
        <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium">
          <option>Sort by: Best Match</option>
          <option>Sort by: Highest Rated</option>
          <option>Sort by: Most Mentees</option>
          <option>Sort by: Recently Joined</option>
        </select>
      </div>

      {/* Mentors Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredMentors.map((mentor) => (
          <MentorCard key={mentor.id} {...mentor} />
        ))}
      </div>

      {/* Empty State */}
      {filteredMentors.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Mentors Found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your filters or search query to find more mentors</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedExpertise([]);
              setSelectedAvailability([]);
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold transition-all"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
