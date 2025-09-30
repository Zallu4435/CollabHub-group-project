import { notFound } from 'next/navigation';
import ProfileHeader from '../../_components/profiles/ProfileHeader';
import ProfileBio from '../../_components/profiles/ProfileBio';
import ProfileSkills from '../../_components/profiles/ProfileSkills';
import MutualConnections from '../../_components/profiles/MutualConnections';
import { profiles, mutualConnections, connections } from '../../_data/profiles';

interface PageProps {
  params: { userId: string };
}

export default function ProfilePage({ params }: PageProps) {
  const { userId } = params;
  const profile = profiles.find((p) => p.id === userId);

  if (!profile) return notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <ProfileHeader
          id={profile.id}
          username={profile.username}
          name={profile.name}
          avatar={profile.avatar}
          coverPhoto={profile.coverPhoto}
          bio={profile.bio}
          location={profile.location}
          joinedDate={profile.joinedDate}
          followerCount={profile.followerCount}
          followingCount={profile.followingCount}
          isFollowing={profile.isFollowing}
          isOwnProfile={false}
        />

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <MutualConnections connections={mutualConnections} totalCount={mutualConnections.length} />
          </div>
          <div className="text-sm text-gray-600">
            <span className="hidden sm:inline">Recent connections:</span>
            <span className="sm:ml-2 font-medium">{connections.length.toLocaleString()}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <ProfileBio bio={profile.bio || ''} />
          </div>
          <div className="space-y-6">
            <ProfileSkills skills={profile.skills || []} interests={profile.interests || []} />
          </div>
        </div>
      </div>
    </div>
  );
}


