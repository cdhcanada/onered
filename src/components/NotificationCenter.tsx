import React, { useState, useEffect } from 'react';
import { Bell, X, Gift, TrendingDown, Package, Star } from 'lucide-react';

interface Notification {
  id: string;
  type: 'discount' | 'new_product' | 'order_update' | 'review';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // محاكاة الإشعارات
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'discount',
        title: 'خصم خاص!',
        message: 'خصم 50% على جميع السماعات اللاسلكية لفترة محدودة',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 دقيقة مضت
        read: false
      },
      {
        id: '2',
        type: 'new_product',
        title: 'منتج جديد',
        message: 'تم إضافة ساعة ذكية جديدة بمميزات رائعة',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // ساعتين مضت
        read: false
      },
      {
        id: '3',
        type: 'order_update',
        title: 'تحديث الطلب',
        message: 'طلبك #12345 في الطريق إليك',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // يوم مضى
        read: true
      }
    ];
    
    setNotifications(mockNotifications);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'discount':
        return <TrendingDown className="w-5 h-5 text-green-400" />;
      case 'new_product':
        return <Gift className="w-5 h-5 text-blue-400" />;
      case 'order_update':
        return <Package className="w-5 h-5 text-yellow-400" />;
      case 'review':
        return <Star className="w-5 h-5 text-purple-400" />;
      default:
        return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `منذ ${minutes} دقيقة`;
    } else if (hours < 24) {
      return `منذ ${hours} ساعة`;
    } else {
      return `منذ ${days} يوم`;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900/95 backdrop-blur-lg border-l border-red-500/20 animate-slideInRight">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <Bell className="w-6 h-6 text-red-500" />
              <h2 className="text-xl font-bold text-white">الإشعارات</h2>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Actions */}
          {unreadCount > 0 && (
            <div className="p-4 border-b border-gray-700">
              <button
                onClick={markAllAsRead}
                className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors duration-200"
              >
                تحديد الكل كمقروء
              </button>
            </div>
          )}

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <Bell className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>لا توجد إشعارات</p>
              </div>
            ) : (
              <div className="space-y-1">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors duration-200 cursor-pointer ${
                      !notification.read ? 'bg-red-500/5 border-r-4 border-r-red-500' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`text-sm font-semibold ${
                            notification.read ? 'text-gray-300' : 'text-white'
                          }`}>
                            {notification.title}
                          </h3>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="text-gray-500 hover:text-red-400 transition-colors duration-200"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className={`text-sm ${
                          notification.read ? 'text-gray-400' : 'text-gray-300'
                        }`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {formatTimestamp(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;