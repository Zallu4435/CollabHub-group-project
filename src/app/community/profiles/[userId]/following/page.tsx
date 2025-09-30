import ProfileCard from '../../../_components/profiles/ProfileCard';
import { profiles } from '../../../_data/profiles';

export default function FollowingPage({ params }: { params: { userId: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Following</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <ProfileCard key={profile.id} {...profile} />
          ))}
        </div>
      </div>
    </div>
  );
}
