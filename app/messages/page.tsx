"use client";

import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import MessageList from '../components/messages/MessageList';
import MessageThread from '../components/messages/MessageThread';

// Mock data for conversations
const getMockConversations = () => {
  return [
    {
      userId: '102',
      userName: 'Maria Garcia',
      userImage: '/images/users/maria.svg',
      lastMessage: 'Thanks for the gardening tools! They work great.',
      lastMessageDate: new Date().toISOString(),
      unreadCount: 2,
    },
    {
      userId: '103',
      userName: 'David Kim',
      userImage: '/images/users/david.svg',
      lastMessage: 'I\'m interested in your programming books. Are they still available?',
      lastMessageDate: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      unreadCount: 0,
    },
    {
      userId: '104',
      userName: 'Sarah Wilson',
      userImage: '/images/users/sarah.svg',
      lastMessage: 'Let me know when you\'re free to meet up for the guitar handoff.',
      lastMessageDate: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      unreadCount: 0,
    },
  ];
};

// Mock data for messages in a conversation
const getMockMessages = () => {
  return [
    {
      _id: '1',
      sender: '102', // Maria Garcia
      content: 'Hi Alex, I saw your listing for gardening tools. Are they still available?',
      createdAt: '2023-05-15T10:00:00.000Z',
      read: true,
    },
    {
      _id: '2',
      sender: '101', // Current user (Alex)
      content: 'Hi Maria! Yes, they\'re still available. When would you like to pick them up?',
      createdAt: '2023-05-15T10:05:00.000Z',
      read: true,
    },
    {
      _id: '3',
      sender: '102',
      content: 'Great! Would tomorrow afternoon around 3pm work for you?',
      createdAt: '2023-05-15T10:10:00.000Z',
      read: true,
    },
    {
      _id: '4',
      sender: '101',
      content: 'Tomorrow at 3pm works perfectly. I\'ll send you my address.',
      createdAt: '2023-05-15T10:15:00.000Z',
      read: true,
    },
    {
      _id: '5',
      sender: '101',
      content: '123 Main Street, Portland, OR. There\'s street parking available.',
      createdAt: '2023-05-15T10:16:00.000Z',
      read: true,
    },
    {
      _id: '6',
      sender: '102',
      content: 'Perfect! I\'ll see you tomorrow at 3pm. Thanks!',
      createdAt: '2023-05-15T10:20:00.000Z',
      read: true,
    },
    {
      _id: '7',
      sender: '102',
      content: 'Just wanted to let you know I\'m on my way. Should be there in about 15 minutes.',
      createdAt: '2023-05-16T14:45:00.000Z',
      read: true,
    },
    {
      _id: '8',
      sender: '101',
      content: 'Sounds good! I\'ll be ready.',
      createdAt: '2023-05-16T14:47:00.000Z',
      read: true,
    },
    {
      _id: '9',
      sender: '102',
      content: 'Thanks for the gardening tools! They work great.',
      createdAt: new Date().toISOString(),
      read: false,
    },
    {
      _id: '10',
      sender: '102',
      content: 'I\'ve already started using them in my garden and they\'re making a huge difference.',
      createdAt: new Date(Date.now() - 60000).toISOString(), // 1 minute ago
      read: false,
    },
  ];
};

export default function MessagesPage() {
  const conversations = getMockConversations();
  const messages = getMockMessages();
  const currentUserId = '101'; // Alex Johnson
  const otherUser = {
    _id: '102',
    name: 'Maria Garcia',
    image: '/images/users/maria.svg',
  };

  const handleSendMessage = async (content: string) => {
    console.log('Sending message:', content);
    // In a real app, this would send the message to the API
    return Promise.resolve();
  };

  return (
    <MainLayout>
      <div className="py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Messages</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Conversations list */}
          <div className="lg:col-span-1">
            <MessageList
              conversations={conversations}
              activeConversation="102" // Maria Garcia
            />
          </div>
          
          {/* Message thread */}
          <div className="lg:col-span-3">
            <MessageThread
              messages={messages}
              currentUserId={currentUserId}
              otherUser={otherUser}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}