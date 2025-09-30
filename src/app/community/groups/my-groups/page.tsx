import GroupCard from '../../_components/groups/GroupCard';
import { groups } from '../../_data/groups';

export default function MyGroupsPage() {
  const myGroups = groups.filter(g => g.isJoined);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Groups</h1>
          <span className="text-gray-600">{myGroups.length} groups</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {myGroups.map((group) => (
            <GroupCard key={group.id} {...group} />
          ))}
        </div>
      </div>
    </div>
  );
}
