import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { StatusBadge } from '../common/StatusBadge';
import { announcementsData, circularsData } from '../../data/mockData';
import { 
  MessageSquare, Bell, FileText, Calendar, 
  Send, Plus, CheckCircle2, Search, User, 
  Clock, Sparkles 
} from 'lucide-react';

export const CommunicationsView: React.FC = () => {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'announcements' | 'messages' | 'circulars' | 'ptm'>('announcements');
  const [chatMessage, setChatMessage] = useState('');
  
  const [chatThreads, setChatThreads] = useState([
    {
      id: 'th-1',
      sender: 'Tariq Al-Rashid (Father of Ahmed 10-A)',
      time: '10:45 AM',
      unread: false,
      messages: [
        { sender: 'Tariq Al-Rashid', text: 'Good morning Ms. Ayesha. Ahmed mentioned he had some questions about quadratic roots on yesterday\'s worksheet.', time: '09:15 AM' },
        { sender: 'Ms. Ayesha Khan', text: 'Good morning Mr. Tariq! Yes, we reviewed those this morning during period 1. He grasped the discriminant formula very quickly.', time: '10:30 AM' },
        { sender: 'Tariq Al-Rashid', text: 'Wonderful, thank you for your support as always!', time: '10:45 AM' }
      ]
    },
    {
      id: 'th-2',
      sender: 'Farhan Khan (Father of Fatima 10-A)',
      time: 'Yesterday',
      unread: true,
      messages: [
        { sender: 'Farhan Khan', text: 'Hello, will the midterm review session be recorded for students who were at medical appointments?', time: 'Yesterday 3:20 PM' }
      ]
    }
  ]);

  const [activeThreadId, setActiveThreadId] = useState('th-1');
  const currentThread = chatThreads.find(t => t.id === activeThreadId) || chatThreads[0];

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    const newMsg = {
      sender: 'Ms. Ayesha Khan',
      text: chatMessage,
      time: 'Just now'
    };
    setChatThreads(prev => prev.map(t => {
      if (t.id === activeThreadId) {
        return {
          ...t,
          messages: [...t.messages, newMsg]
        };
      }
      return t;
    }));
    setChatMessage('');
    addToast({
      type: 'success',
      title: 'Message Sent',
      message: 'Direct response delivered to parent portal app.'
    });
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[
        { label: 'Communication', route: '/communications/announcements' },
        { label: 'School-Wide Communication & Messaging' }
      ]} />

      {/* Header and Mode Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200/80 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Communication Center</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Broadcast announcements, direct parent messaging, KHDA circulars & PTM booking
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl text-xs">
          {[
            { id: 'announcements', label: 'Announcements', icon: Bell },
            { id: 'messages', label: 'Direct Messages', icon: MessageSquare },
            { id: 'circulars', label: 'Official Circulars', icon: FileText },
            { id: 'ptm', label: 'PTM Scheduler', icon: Calendar },
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold cursor-pointer transition-colors ${
                  isSelected ? 'bg-white text-indigo-600 shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Announcements */}
      {activeTab === 'announcements' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-gray-900">Active Campus Bulletins</h3>
            <button
              onClick={() => {
                addToast({
                  type: 'info',
                  title: 'New Announcement Composer',
                  message: 'Announcement modal ready to broadcast.'
                });
              }}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Compose Bulletin</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {announcementsData.map(ann => (
              <div key={ann.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      {ann.target}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      ann.priority === 'Urgent' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                      ann.priority === 'Important' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {ann.priority}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mt-2 leading-snug">{ann.title}</h4>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{ann.content}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-mono">
                  <span>By {ann.author}</span>
                  <span>{ann.readCount.toLocaleString()} Reads</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Direct Messages */}
      {activeTab === 'messages' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden grid grid-cols-1 md:grid-cols-3 min-h-[500px]">
          {/* Threads list */}
          <div className="border-r border-gray-100 p-3 space-y-1 bg-gray-50/50">
            <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-400">
              Parent Conversations
            </div>
            {chatThreads.map(thread => (
              <div
                key={thread.id}
                onClick={() => setActiveThreadId(thread.id)}
                className={`p-3 rounded-xl cursor-pointer transition-colors ${
                  activeThreadId === thread.id ? 'bg-white shadow-2xs border border-gray-200' : 'hover:bg-gray-100/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-900 truncate">{thread.sender}</span>
                  <span className="text-[10px] text-gray-400 font-mono">{thread.time}</span>
                </div>
                <p className="text-[11px] text-gray-500 truncate">
                  {thread.messages[thread.messages.length - 1].text}
                </p>
              </div>
            ))}
          </div>

          {/* Active Chat Conversation Pane */}
          <div className="md:col-span-2 flex flex-col justify-between p-4 bg-white">
            <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-gray-900">{currentThread.sender}</h4>
                <p className="text-[10px] text-emerald-600 font-medium">Active on Parent App</p>
              </div>
            </div>

            {/* Messages feed */}
            <div className="py-4 space-y-3 overflow-y-auto max-h-[350px]">
              {currentThread.messages.map((msg, idx) => {
                const isMe = msg.sender.includes('Ms. Ayesha');
                return (
                  <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className={`p-3 rounded-2xl max-w-sm text-xs leading-relaxed ${
                      isMe ? 'bg-indigo-600 text-white rounded-br-xs' : 'bg-gray-100 text-gray-900 rounded-bl-xs'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono mt-1 px-1">{msg.time}</span>
                  </div>
                );
              })}
            </div>

            {/* Input Bar */}
            <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={e => setChatMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message to parent..."
                className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Circulars */}
      {activeTab === 'circulars' && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-gray-900">Official Institutional Circulars</h3>
              <p className="text-xs text-gray-500">Formally signed policies dispatched to student portals</p>
            </div>
            <button 
              onClick={() => {
                addToast({
                  type: 'success',
                  title: 'Circular Draft Created',
                  message: 'New administrative letter template initialized.'
                });
              }}
              className="px-3.5 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
            >
              Draft Circular
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {circularsData.map(cir => (
              <div key={cir.id} className="py-3.5 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-gray-400 text-[11px]">{cir.refNo}</span>
                    <StatusBadge status={cir.status} />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm">{cir.title}</h4>
                  <p className="text-gray-500 text-[11px] mt-0.5">Signed by: {cir.signedBy} · Date: {cir.date}</p>
                </div>
                <button
                  onClick={() => {
                    addToast({
                      type: 'info',
                      title: 'Official Letterhead Generated',
                      message: `Opened preview for ${cir.refNo}`
                    });
                  }}
                  className="px-3 py-1.5 border border-gray-200 hover:bg-gray-50 rounded-lg font-semibold text-gray-700 cursor-pointer"
                >
                  View Letterhead PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: PTM Scheduler */}
      {activeTab === 'ptm' && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-gray-900">Parent-Teacher Consultation Booking</h3>
              <p className="text-xs text-gray-500">Upcoming Session: Wednesday, October 22 (4:00 PM - 8:00 PM)</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">
              82% Slots Booked
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { teacher: 'Ms. Ayesha Khan', subject: 'Mathematics HOD', slots: '14 / 16 Booked', status: 'Almost Full' },
              { teacher: 'Dr. Vikram Patel', subject: 'Science HOD', slots: '12 / 16 Booked', status: 'Available' },
              { teacher: 'Ms. Emma Richardson', subject: 'English HOD', slots: '16 / 16 Booked', status: 'Full (Waitlist)' }
            ].map((slot, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50 space-y-2 text-xs">
                <h4 className="font-bold text-gray-900 text-sm">{slot.teacher}</h4>
                <p className="text-gray-500">{slot.subject}</p>
                <div className="flex items-center justify-between pt-2 border-t border-gray-200 font-mono">
                  <span className="font-semibold text-indigo-700">{slot.slots}</span>
                  <span className="text-emerald-700 font-bold">{slot.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
