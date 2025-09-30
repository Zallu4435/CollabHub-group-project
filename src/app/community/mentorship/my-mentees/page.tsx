import MentorCard from '../../_components/mentorship/MentorCard';
import { mentors } from '../../_data/mentors';

export default function MyMentorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Mentors</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {mentors.slice(0, 2).map((mentor) => (
            <MentorCard key={mentor.id} {...mentor} />
          ))}
        </div>
      </div>
    </div>
  );
}
