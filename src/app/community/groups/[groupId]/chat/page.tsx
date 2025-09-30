import GroupChatRoom from "@/app/community/_components/groups/GroupChatRoom";
import Link from "next/link";

export default function GroupChatPage({ params }: { params: { groupId: string } }) {
  return (
    <div className="h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-4">
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
            <li className="text-gray-800 font-medium">Chat</li>
          </ol>
        </nav>
      </div>
      <GroupChatRoom groupName="Group" messages={[]} />
    </div>
  );
}
