"use client";

import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import MessageList from '../../components/messages/MessageList';
import MessageThread from '../../components/messages/MessageThread';

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
const getMockMessages = (userId: string) => {
  if (userId === '102') {
    // Maria Garcia
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
  } else if (userId === '103') {
    // David Kim
    return [
      {
        _id: '11',
        sender: '103', // David Kim
        content: 'Hello Alex, I noticed you have some programming books listed. I\'m interested in learning more about them.',
        createdAt: '2023-05-19T09:30:00.000Z',
        read: true,
      },
      {
        _id: '12',
        sender: '101', // Current user (Alex)
        content: 'Hi David! Yes, I have a collection of programming books covering JavaScript, Python, React, and more. Are you looking for any specific topics?',
        createdAt: '2023-05-19T09:35:00.000Z',
        read: true,
      },
      {
        _id: '13',
        sender: '103',
        content: 'I\'m particularly interested in the JavaScript and React books. I\'m trying to improve my front-end development skills.',
        createdAt: '2023-05-19T09:40:00.000Z',
        read: true,
      },
      {
        _id: '14',
        sender: '101',
        content: 'Great! I have "JavaScript: The Good Parts", "Eloquent JavaScript", and "React Up and Running". All are in excellent condition.',
        createdAt: '2023-05-19T09:45:00.000Z',
        read: true,
      },
      {
        _id: '15',
        sender: '103',
        content: 'That sounds perfect! I\'m interested in all three. Are they still available?',
        createdAt: '2023-05-19T09:50:00.000Z',
        read: true,
      },
      {
        _id: '16',
        sender: '101',
        content: 'Yes, they\'re all available. Would you like to pick them up this weekend?',
        createdAt: '2023-05-19T09:55:00.000Z',
        read: true,
      },
      {
        _id: '17',
        sender: '103',
        content: 'I\'m interested in your programming books. Are they still available?',
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        read: true,
      },
    ];
  } else if (userId === '104') {
    // Sarah Wilson
    return [
      {
        _id: '18',
        sender: '104', // Sarah Wilson
        content: 'Hi Alex, I\'m interested in the acoustic guitar you listed. Is it still available?',
        createdAt: '2023-05-17T15:00:00.000Z',
        read: true,
      },
      {
        _id: '19',
        sender: '101', // Current user (Alex)
        content: 'Hi Sarah! Yes, the guitar is still available. It\'s a Yamaha FG800 in great condition.',
        createdAt: '2023-05-17T15:05:00.000Z',
        read: true,
      },
      {
        _id: '20',
        sender: '104',
        content: 'That\'s great! I\'ve been looking for a good acoustic guitar to learn on. Would it be possible to see it in person?',
        createdAt: '2023-05-17T15:10:00.000Z',
        read: true,
      },
      {
        _id: '21',
        sender: '101',
        content: 'Absolutely! When would be a good time for you?',
        createdAt: '2023-05-17T15:15:00.000Z',
        read: true,
      },
      {
        _id: '22',
        sender: '104',
        content: 'Would this Saturday around 2pm work for you?',
        createdAt: '2023-05-17T15:20:00.000Z',
        read: true,
      },
      {
        _id: '23',
        sender: '101',
        content: 'Saturday at 2pm works for me. I\'ll send you my address.',
        createdAt: '2023-05-17T15:25:00.000Z',
        read: true,
      },
      {
        _id: '24',
        sender: '104',
        content: 'Let me know when you\'re free to meet up for the guitar handoff.',
        createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        read: true,
      },
    ];
  } else {
    return [];
  }
};

// Mock data for user info
const getMockUserInfo = (userId: string) => {
  const users = {
    '102': {
      _id: '102',
      name: 'Maria Garcia',
      image: '/images/users/maria.svg',
    },
    '103': {
      _id: '103',
      name: 'David Kim',
      image: '/images/users/david.svg',
    },
    '104': {
      _id: '104',
      name: 'Sarah Wilson',
      image: '/images/users/sarah.svg',
    },
  };
  
  return users[userId as keyof typeof users] || {
    _id: userId,
    name: 'User',
    image: undefined,
  };
};

interface MessageThreadPageProps {
  params: {
    userId: string;
  };
}

export default function MessageThreadPage({ params }: MessageThreadPageProps) {
  const conversations = getMockConversations();
  const messages = getMockMessages(params.userId);
  const currentUserId = '101'; // Alex Johnson
  const otherUser = getMockUserInfo(params.userId);

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
              activeConversation={params.userId}
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