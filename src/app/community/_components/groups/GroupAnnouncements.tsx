import Avatar from '../common/Avatar';

interface Announcement {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  title: string;
  content: string;
  createdAt: string;
  isPinned: boolean;
}

interface GroupAnnouncementsProps {
  announcements: Announcement[];
  isAdmin?: boolean;
}

export default function GroupAnnouncements({ announcements, isAdmin = false }: GroupAnnouncementsProps) {
  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <div
          key={announcement.id}
          className={`bg-white border rounded-lg p-6 ${
            announcement.isPinned ? 'border-blue-500 shadow-md' : 'border-gray-200'
          }`}
        >
          {announcement.isPinned && (
            <div className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-3">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
              Pinned Announcement
            </div>
          )}

          <div className="flex items-start gap-3 mb-4">
            <Avatar src={announcement.authorAvatar} alt={announcement.authorName} size="md" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-lg">{announcement.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{announcement.authorName}</span>
                <span>•</span>
                <span>
                  {new Date(announcement.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>

            {isAdmin && (
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            )}
          </div>

          <p className="text-gray-700 whitespace-pre-wrap">{announcement.content}</p>
        </div>
      ))}

      {announcements.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center text-gray-500">
          No announcements yet
        </div>
      )}
    </div>
  );
}
