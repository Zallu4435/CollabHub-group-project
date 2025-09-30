interface MapFiltersProps {
  showMembers: boolean;
  showEvents: boolean;
  selectedCountry: string;
  mapView: 'roadmap' | 'satellite';
  onToggleMembers: (show: boolean) => void;
  onToggleEvents: (show: boolean) => void;
  onCountryChange: (country: string) => void;
  onMapViewChange: (view: 'roadmap' | 'satellite') => void;
}

export default function MapFilters({
  showMembers,
  showEvents,
  selectedCountry,
  mapView,
  onToggleMembers,
  onToggleEvents,
  onCountryChange,
  onMapViewChange
}: MapFiltersProps) {
  const countries = [
    { value: 'all', label: 'All Countries', flag: '🌍' },
    { value: 'us', label: 'United States', flag: '🇺🇸' },
    { value: 'uk', label: 'United Kingdom', flag: '🇬🇧' },
    { value: 'ca', label: 'Canada', flag: '🇨🇦' },
    { value: 'au', label: 'Australia', flag: '🇦🇺' },
    { value: 'in', label: 'India', flag: '🇮🇳' }
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Toggle Filters */}
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1.5 shadow-sm">
        <label className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all ${
          showMembers ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
        }`}>
          <input
            type="checkbox"
            checked={showMembers}
            onChange={(e) => onToggleMembers(e.target.checked)}
            className="hidden"
          />
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span className="text-sm font-medium">Members</span>
        </label>

        <label className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all ${
          showEvents ? 'bg-red-600 text-white' : 'text-gray-700 hover:bg-gray-100'
        }`}>
          <input
            type="checkbox"
            checked={showEvents}
            onChange={(e) => onToggleEvents(e.target.checked)}
            className="hidden"
          />
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm font-medium">Events</span>
        </label>
      </div>

      {/* Country Filter */}
      <select
        value={selectedCountry}
        onChange={(e) => onCountryChange(e.target.value)}
        className="px-4 py-2 text-sm font-medium border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white shadow-sm transition-all"
      >
        {countries.map((country) => (
          <option key={country.value} value={country.value}>
            {country.flag} {country.label}
          </option>
        ))}
      </select>
    </div>
  );
}
