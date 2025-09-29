// market/src/components/escrow/EscrowNotifications.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { EscrowNotification } from '../../types/escrow';

interface EscrowNotificationsProps {
  userId: string;
  className?: string;
}

// Mock notifications data
const mockNotifications: EscrowNotification[] = [
  {
    id: 'notif_1',
    userId: 'seller_1',
    escrowId: 'escrow_1',
    type: 'payment_received',
    title: 'Payment Received',
    message: 'Payment of $79.99 received for "Modern E-commerce Dashboard"',
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    actionUrl: '/marketplace/escrow/escrow_1'
  },
  {
    id: 'notif_2',
    userId: 'buyer_1',
    escrowId: 'escrow_2',
    type: 'project_released',
    title: 'Project Released',
    message: 'Your project "React Native Food Delivery App" has been released and is ready for download',
    isRead: false,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    actionUrl: '/marketplace/escrow/escrow_2'
  },
  {
    id: 'notif_3',
    userId: 'seller_1',
    escrowId: 'escrow_3',
    type: 'dispute_raised',
    title: 'Dispute Raised',
    message: 'A dispute has been raised for "Vue.js SaaS Landing Page"',
    isRead: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    actionUrl: '/marketplace/escrow/escrow_3'
  }
];

const getNotificationIcon = (type: string): string => {
  switch (type) {
    case 'payment_received':
      return '💰';
    case 'project_released':
      return '✅';
    case 'dispute_raised':
      return '⚠️';
    case 'dispute_resolved':
      return '🔧';
    case 'payment_expired':
      return '⏰';
    case 'project_reclaimed':
      return '🔄';
    default:
      return '📢';
  }
};

const getNotificationColor = (type: string): string => {
  switch (type) {
    case 'payment_received':
      return 'text-green-600';
    case 'project_released':
      return 'text-blue-600';
    case 'dispute_raised':
      return 'text-red-600';
    case 'dispute_resolved':
      return 'text-purple-600';
    case 'payment_expired':
      return 'text-orange-600';
    case 'project_reclaimed':
      return 'text-gray-600';
    default:
      return 'text-gray-600';
  }
};

export const EscrowNotifications: React.FC<EscrowNotificationsProps> = ({
  userId,
  className = ''
}) => {
  const [notifications, setNotifications] = useState<EscrowNotification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, [userId]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      // In real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const userNotifications = mockNotifications.filter(n => n.userId === userId);
      setNotifications(userNotifications);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, isRead: true }
          : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">Loading notifications...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Escrow Notifications</h2>
          {unreadCount > 0 && (
            <Badge variant="destructive">{unreadCount} unread</Badge>
          )}
        </div>
        {notifications.length > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark All as Read
          </Button>
        )}
      </CardHeader>
      
      <CardContent>
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📭</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Notifications</h3>
            <p className="text-gray-600">You don't have any escrow notifications yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border rounded-lg transition-colors ${
                  notification.isRead 
                    ? 'bg-gray-50 border-gray-200' 
                    : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium ${getNotificationColor(notification.type)}`}>
                        {notification.title}
                      </h4>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-700 mt-1">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">
                        {new Date(notification.createdAt).toLocaleString()}
                      </span>
                      
                      <div className="flex space-x-2">
                        {!notification.isRead && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark Read
                          </Button>
                        )}
                        
                        {notification.actionUrl && (
                          <Button
                            size="sm"
                            onClick={() => window.location.href = notification.actionUrl!}
                          >
                            View
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
