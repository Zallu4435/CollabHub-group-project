import Link from 'next/link';

const whiteboards = [
  {
    id: '1',
    name: 'Project Planning Board',
    createdBy: 'John Doe',
    updatedAt: '2024-09-30T14:30:00Z',
    collaborators: 5
  },
  {
    id: '2',
    name: 'Architecture Diagram',
    createdBy: 'Jane Smith',
    updatedAt: '2024-09-29T10:15:00Z',
    collaborators: 3
  }
];

export default function WhiteboardsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Whiteboards</h1>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            New Whiteboard
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whiteboards.map((whiteboard) => (
            <Link
              key={whiteboard.id}
              href={`/community/collaboration/whiteboards/${whiteboard.id}`}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2">{whiteboard.name}</h3>
              <p className="text-sm text-gray-600 mb-4">by {whiteboard.createdBy}</p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{whiteboard.collaborators} collaborators</span>
                <span>
                  {new Date(whiteboard.updatedAt).toLocaleDateString('en-US', {
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
