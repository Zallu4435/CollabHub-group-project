// qa/pages/notifications.tsx
import NotificationList from '../components/notifications/NotificationList'

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <NotificationList />
      </div>
    </div>
  )
}
