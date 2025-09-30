import MentorDiscovery from '../../_components/mentorship/MentorDiscovery';
import { mentors } from '../../_data/mentors';

export default function FindMentorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find a Mentor</h1>
          <p className="text-gray-600">Connect with experienced professionals to guide your growth</p>
        </div>
        <MentorDiscovery mentors={mentors} />
      </div>
    </div>
  );
}
