import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { Message, User } from '../types';

interface MessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  currentUser?: User | null;
  onSendMessage: (toUserId: string, content: string) => void;
  onMarkAsRead: (id: string) => void;
}

const MessagesModal: React.FC<MessagesModalProps> = ({ isOpen, onClose, messages, currentUser, onSendMessage, onMarkAsRead }) => {
  const [messageText, setMessageText] = useState('');
  const [selectedReceiver, setSelectedReceiver] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText || !selectedReceiver) return;
    onSendMessage(selectedReceiver, messageText);
    setMessageText('');
  };

  const conversations = Array.from(new Map(messages.map(m => [m.senderId === currentUser?.id ? m.receiverId : m.senderId, m])).values());

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 md:mx-0">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Messages</h3>
          <div className="flex items-center space-x-3">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
          </div>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 border-r pr-2">
            <h4 className="text-sm font-medium mb-2">Conversations</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {conversations.length > 0 ? conversations.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedReceiver((c as Message).senderId === currentUser?.id ? (c as Message).receiverId : (c as Message).senderId)}
                  className={`w-full text-left p-2 rounded-md hover:bg-gray-100 ${selectedReceiver === ((c as Message).senderId === currentUser?.id ? (c as Message).receiverId : (c as Message).senderId) ? 'bg-gray-50' : ''}`}
                >
                  <div className="text-sm text-gray-700 truncate">Conversation with {((c as Message).senderId === currentUser?.id ? (c as Message).receiverId : (c as Message).senderId)}</div>
                  <div className="text-xs text-gray-400 truncate">{(c as Message).content.slice(0, 80)}</div>
                </button>
              )) : (
                <div className="text-xs text-gray-400">No conversations yet</div>
              )}
            </div>
          </div>

          <div className="col-span-2">
            <div className="flex flex-col h-80">
              <div className="flex-1 overflow-y-auto p-3 border rounded-md bg-gray-50">
                {messages.length === 0 ? (
                  <div className="text-center text-sm text-gray-500 py-8">No messages</div>
                ) : (
                  messages.map(msg => (
                    <div key={msg.id} className={`p-2 rounded-md my-1 ${msg.senderId === currentUser?.id ? 'bg-[#C14953] text-white self-end' : 'bg-white text-gray-800'}`}>
                      <div className="text-xs text-gray-500">{msg.senderId === currentUser?.id ? 'You' : `User ${msg.senderId}`}</div>
                      <div className="mt-1 text-sm">{msg.content}</div>
                      <div className="text-xs text-gray-400 mt-1">{new Date(msg.createdAt).toLocaleString()}</div>
                      {!msg.read && (
                        <div className="mt-1">
                          <button onClick={() => onMarkAsRead(msg.id)} className="text-xs text-[#6C9A8B] hover:text-[#5a7f73]">Mark read</button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleSend} className="mt-3 flex items-center space-x-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Write a message..."
                  className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                />
                <input
                  type="text"
                  value={selectedReceiver || ''}
                  onChange={(e) => setSelectedReceiver(e.target.value)}
                  placeholder="Recipient user id"
                  className="w-40 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9A8B]"
                />
                <button type="submit" className="px-3 py-2 bg-[#C14953] text-white rounded-md inline-flex items-center">
                  <Send className="h-4 w-4 mr-2" /> Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesModal;
