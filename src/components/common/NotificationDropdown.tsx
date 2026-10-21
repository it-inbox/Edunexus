import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, CheckCheck, Clock, ShieldAlert, FileCheck, Info, X } from 'lucide-react';

interface NotificationDropdownProps {
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, setActiveRoute } = useApp();
  const [activeTab, setActiveTab] = useState<'All' | 'Approvals' | 'Alerts' | 'Reminders'>('All');

  const filtered = activeTab === 'All' 
    ? notifications 
    : notifications.filter(n => n.category === activeTab);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleItemClick = (id: string, actionRoute?: string) => {
    markNotificationAsRead(id);
    if (actionRoute) {
      setActiveRoute(actionRoute);
    }
    onClose();
  };

  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-semibold text-gray-900">Notifications</span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 text-[11px] font-bold bg-indigo-600 text-white rounded-full font-mono">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsAsRead}
              className="text-[11px] font-medium text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Mark all read
            </button>
          )}
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="px-3 pt-2 border-b border-gray-100 flex gap-1 bg-white">
        {(['All', 'Approvals', 'Alerts', 'Reminders'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === tab 
                ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notification items list */}
      <div className="divide-y divide-gray-50 max-h-[380px] overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-xs text-gray-500 font-medium">No {activeTab.toLowerCase()} notifications</p>
          </div>
        ) : (
          filtered.map(item => {
            let Icon = Info;
            let iconColor = 'text-indigo-600 bg-indigo-50';
            let targetRoute = '/dashboard';

            if (item.category === 'Approvals') {
              Icon = FileCheck;
              iconColor = 'text-amber-600 bg-amber-50';
              targetRoute = '/staff/leave';
            } else if (item.category === 'Alerts') {
              Icon = ShieldAlert;
              iconColor = 'text-rose-600 bg-rose-50';
              targetRoute = '/transport';
            } else if (item.category === 'Reminders') {
              Icon = Clock;
              iconColor = 'text-sky-600 bg-sky-50';
              targetRoute = '/finance';
            }

            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item.id, targetRoute)}
                className={`p-3.5 flex items-start gap-3 hover:bg-gray-50/80 transition-colors cursor-pointer ${
                  !item.read ? 'bg-indigo-50/20' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <p className={`text-xs font-semibold truncate ${!item.read ? 'text-gray-900' : 'text-gray-700'}`}>
                      {item.title}
                    </p>
                    {!item.read && <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />}
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {item.message}
                  </p>
                  <span className="text-[10px] text-gray-400 mt-1 block font-mono">
                    {item.timestamp}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer link */}
      <div className="p-2.5 bg-gray-50 text-center border-t border-gray-100">
        <button
          onClick={() => { setActiveRoute('/settings/notifications'); onClose(); }}
          className="text-xs font-medium text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          Configure Notification Preferences →
        </button>
      </div>
    </div>
  );
};
