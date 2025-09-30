import Avatar from '../common/Avatar';

interface MessagePreviewProps {
  senderName: string;
  senderAvatar: string;
  message: string;
  timestamp: string;
  unread: boolean;
  onClick: () => void;
}

export default function MessagePreview({
  senderName,
  senderAvatar,
  message,
  timestamp,
  unread,
  onClick
}: MessagePreviewProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
        unread ? 'bg-blue-50' : ''
      }`}
    >
      <Avatar src={senderAvatar} alt={senderName} size="md" />
      
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between mb-1">
          <h4 className={`font-semibold ${unread ? 'text-gray-900' : 'text-gray-700'}`}>
            {senderName}
          </h4>
          <span className="text-xs text-gray-500">{timestamp}</span>
        </div>
        <p className={`text-sm truncate ${unread ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
          {message}
        </p>
      </div>

      {unread && (
        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
      )}
    </button>
  );
}
