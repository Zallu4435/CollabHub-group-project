import GroupMemberList from '../../../_components/groups/GroupMemberList';
import { groupMembers } from '../../../_data/groups';
import Link from 'next/link';

export default function GroupMembersPage({ params }: { params: { groupId: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 flex-wrap">
            <li>
              <Link href="/community" className="hover:underline">Community</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/community/groups" className="hover:underline">Groups</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href={`/community/groups/${params.groupId}`} className="hover:underline">Group {params.groupId}</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-800 font-medium">Members</li>
          </ol>
        </nav>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Group Members</h1>
        <GroupMemberList members={groupMembers} isAdmin={true} />
      </div>
    </div>
  );
}
