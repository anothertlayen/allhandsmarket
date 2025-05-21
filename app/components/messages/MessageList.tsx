"use client";

import React from 'react';
import Link from 'next/link';
import Avatar from '../ui/Avatar';
import Card from '../ui/Card';

interface Conversation {
  userId: string;
  userName: string;
  userImage?: string;
  lastMessage: string;
  lastMessageDate: string;
  unreadCount: number;
}

interface MessageListProps {
  conversations: Conversation[];
  activeConversation?: string;
}

const MessageList: React.FC<MessageListProps> = ({
  conversations,
  activeConversation,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <Card className="h-full">
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h2 className="text-lg font-medium text-gray-900">Messages</h2>
      </div>

      {conversations.length === 0 ? (
        <div className="text-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <p className="mt-2 text-gray-500">No messages yet</p>
          <p className="mt-1 text-sm text-gray-400">
            When you connect with other users, your conversations will appear here.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {conversations.map((conversation) => (
            <li key={conversation.userId}>
              <Link href={`/messages/${conversation.userId}`}>
                <div
                  className={`
                    py-4 px-2 flex items-start hover:bg-gray-50 transition-colors rounded-md
                    ${activeConversation === conversation.userId ? 'bg-blue-50' : ''}
                  `}
                >
                  <div className="relative">
                    <Avatar
                      src={conversation.userImage}
                      alt={conversation.userName}
                      size="md"
                    />
                    {conversation.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {conversation.userName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(conversation.lastMessageDate)}
                      </p>
                    </div>
                    <p
                      className={`
                        text-sm truncate
                        ${conversation.unreadCount > 0 ? 'font-semibold text-gray-900' : 'text-gray-500'}
                      `}
                    >
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default MessageList;