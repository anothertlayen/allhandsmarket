"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface Message {
  _id: string;
  sender: string;
  content: string;
  createdAt: string;
  read: boolean;
}

interface MessageThreadProps {
  messages: Message[];
  currentUserId: string;
  otherUser: {
    _id: string;
    name: string;
    image?: string;
  };
  onSendMessage: (content: string) => Promise<void>;
  isLoading?: boolean;
}

const MessageThread: React.FC<MessageThreadProps> = ({
  messages,
  currentUserId,
  otherUser,
  onSendMessage,
  isLoading = false,
}) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && !isLoading) {
      try {
        await onSendMessage(newMessage);
        setNewMessage('');
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
  };

  // Group messages by date
  const groupedMessages: { [date: string]: Message[] } = {};
  messages.forEach((message) => {
    const date = new Date(message.createdAt).toLocaleDateString();
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });

  return (
    <Card className="flex flex-col h-[calc(100vh-200px)]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center">
        <Link href={`/users/${otherUser._id}`} className="flex items-center group">
          <Avatar src={otherUser.image} alt={otherUser.name} size="md" />
          <div className="ml-3">
            <h2 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
              {otherUser.name}
            </h2>
          </div>
        </Link>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {Object.keys(groupedMessages).length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p className="text-lg font-medium">No messages yet</p>
            <p className="mt-1">Start a conversation with {otherUser.name}.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.keys(groupedMessages).map((date) => (
              <div key={date}>
                <div className="text-center mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                    {formatDate(groupedMessages[date][0].createdAt)}
                  </span>
                </div>
                <div className="space-y-3">
                  {groupedMessages[date].map((message) => {
                    const isCurrentUser = message.sender === currentUserId;
                    return (
                      <div
                        key={message._id}
                        className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex max-w-[75%] ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
                          {!isCurrentUser && (
                            <div className={`flex-shrink-0 ${isCurrentUser ? 'ml-3' : 'mr-3'}`}>
                              <Avatar
                                src={otherUser.image}
                                alt={otherUser.name}
                                size="sm"
                              />
                            </div>
                          )}
                          <div>
                            <div
                              className={`
                                px-4 py-2 rounded-lg
                                ${isCurrentUser
                                  ? 'bg-blue-600 text-white rounded-tr-none'
                                  : 'bg-gray-100 text-gray-800 rounded-tl-none'}
                              `}
                            >
                              <p className="whitespace-pre-wrap">{message.content}</p>
                            </div>
                            <p
                              className={`
                                text-xs mt-1
                                ${isCurrentUser ? 'text-right' : 'text-left'}
                                text-gray-500
                              `}
                            >
                              {formatTime(message.createdAt)}
                              {isCurrentUser && (
                                <span className="ml-1">
                                  {message.read ? '• Read' : ''}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Message ${otherUser.name}...`}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!newMessage.trim() || isLoading}
            isLoading={isLoading}
          >
            Send
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default MessageThread;