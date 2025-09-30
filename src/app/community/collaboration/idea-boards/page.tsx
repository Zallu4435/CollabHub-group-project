import Link from 'next/link';

const ideaBoards = [
  {
    id: '1',
    name: 'Feature Brainstorming',
    createdBy: 'John Doe',
    updatedAt: '2024-09-30T14:30:00Z',
    ideas: 23
  },
  {
    id: '2',
    name: 'Design Concepts',
    createdBy: 'Jane Smith',
    updatedAt: '2024-09-29T10:15:00Z',
    ideas: 15
  }
];

export default function IdeaBoardsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Idea Boards</h1>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            New Idea Board
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideaBoards.map((board) => (
            <Link
              key={board.id}
              href={`/community/collaboration/idea-boards/${board.id}`}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="aspect-video bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-16 h-16 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2">{board.name}</h3>
              <p className="text-sm text-gray-600 mb-4">by {board.createdBy}</p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{board.ideas} ideas</span>
                <span>
                  {new Date(board.updatedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
