import React from 'react';

interface Notification {
  id: string;
  type: 'event' | 'connection' | 'post' | 'news' | 'job' | 'comment' | 'analytics';
  avatar: string;
  title: string;
  description: string;
  time: string;
  unread?: boolean;
  actionButton?: {
    text: string;
    action: () => void;
  };
  stats?: {
    reactions?: number;
    comments?: number;
  };
}

interface NotificationsListProps {
  filter: 'all' | 'jobs' | 'posts' | 'mentions';
}

export default function NotificationsList({ filter }: NotificationsListProps) {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'event',
      avatar: 'bg-blue-600',
      title: 'IBM and others you follow created 5 events this week.',
      description: 'View all events.',
      time: '2h',
      unread: true,
    },
    {
      id: '2',
      type: 'connection',
      avatar: 'from-blue-400 to-cyan-500',
      title: 'You may know Suhaim Ma. Add to your network.',
      description: 'Attended MG UNIVERSITY\n252 mutual connections',
      time: '7h',
      unread: true,
    },
    {
      id: '3',
      type: 'post',
      avatar: 'from-purple-400 to-pink-500',
      title: 'arunima edamana posted:',
      description: '✨ Proud Moment ✨ I am delighted to share that I have successfully completed the VR Developer with Unity course conducted by ASAP Kerala. This...',
      time: '8h',
      unread: true,
    },
    {
      id: '4',
      type: 'news',
      avatar: 'bg-gray-900',
      title: 'New from Amazon in Amazon News:',
      description: 'Breaking: Everything announced at Amazon\'s Devices & Services event, and more news',
      time: '10h',
      unread: true,
    },
    {
      id: '5',
      type: 'job',
      avatar: 'bg-gray-900',
      title: 'Software Engineer: new opportunities in Asia.',
      description: '',
      time: '12h',
      unread: true,
      actionButton: {
        text: 'View jobs',
        action: () => {},
      },
    },
    {
      id: '6',
      type: 'comment',
      avatar: 'from-green-400 to-emerald-500',
      title: 'Muhammed Shifil commented on Jalva P\'s post:',
      description: 'No doubt on pressing "Accept ", it could be hard tough. Beacuse thats were we get learned and shaped!!',
      time: '17h',
      unread: true,
    },
    {
      id: '7',
      type: 'post',
      avatar: 'from-orange-400 to-red-500',
      title: 'Ramshiya ck posted:',
      description: 'Hi everyone! I\'m seeking a new role and would appreciate your support. If you hear of any opportunities or just want to catch up, please send me a message or...',
      time: '17h',
      unread: true,
    },
    {
      id: '8',
      type: 'post',
      avatar: 'bg-gray-600',
      title: 'How can office festivities adapt to a hybrid work world? Share your take.',
      description: '642 reactions • 117 comments',
      time: '18h',
      stats: {
        reactions: 642,
        comments: 117,
      },
    },
    {
      id: '9',
      type: 'analytics',
      avatar: 'bg-gradient-to-br from-orange-400 to-yellow-500',
      title: 'Your posts got 32 impressions last week.',
      description: 'View your analytics.',
      time: '23h',
    },
  ];

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === 'all') return true;
    if (filter === 'jobs') return notif.type === 'job';
    if (filter === 'posts') return notif.type === 'post' || notif.type === 'comment';
    if (filter === 'mentions') return notif.type === 'comment';
    return true;
  });

  return (
    <div>
      {filteredNotifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-start gap-3 p-4 border-b border-gray-200 hover:bg-gray-50 transition-all cursor-pointer relative ${
            notification.unread ? 'bg-blue-50' : ''
          }`}
        >
          {/* Unread indicator */}
          {notification.unread && (
            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full"></div>
          )}

          {/* Avatar */}
          <div className={`w-12 h-12 bg-gradient-to-br ${notification.avatar} rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold`}>
            {notification.type === 'analytics' && '📊'}
            {notification.type === 'event' && '📅'}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900 mb-1">
              <span className="font-semibold">{notification.title.split(':')[0]}</span>
              {notification.title.includes(':') && `: ${notification.title.split(':')[1]}`}
            </p>
            <p className="text-sm text-gray-700 mb-2 line-clamp-2 whitespace-pre-line">
              {notification.description}
            </p>

            {notification.actionButton && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  notification.actionButton?.action();
                }}
                className="px-4 py-1.5 border-2 border-blue-600 text-blue-600 rounded-full font-semibold text-sm hover:bg-blue-50 transition-all"
              >
                {notification.actionButton.text}
              </button>
            )}

            {notification.stats && (
              <div className="flex items-center gap-2 text-xs text-gray-600">
                {notification.stats.reactions && (
                  <span>{notification.stats.reactions} reactions</span>
                )}
                {notification.stats.comments && (
                  <>
                    <span>•</span>
                    <span>{notification.stats.comments} comments</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Time and menu */}
          <div className="flex flex-col items-end gap-2">
            <span className="text-xs text-gray-600 whitespace-nowrap">{notification.time}</span>
            <button className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
