import { ReactNode } from 'react'
import QAHeader from './components/common/QAHeader'
import { users } from './lib/dummy-data/users'

interface LayoutProps {
  children: ReactNode
}

export default function QALayout({ children }: LayoutProps) {
  const currentUser = {
    ...users[0],
    unreadNotifications: 3
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <QAHeader user={currentUser} />
      <main>{children}</main>
    </div>
  )
}
