"use client";

import React, { useState, useRef, useEffect } from 'react';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  title?: string;
  assistantName?: string;
  assistantImage?: string;
  userName?: string;
  userImage?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  isLoading = false,
  title = 'Chat with Assistant',
  assistantName = 'Assistant',
  assistantImage,
  userName = 'You',
  userImage,
}) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const formatTimestamp = (timestamp?: Date) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Chat header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
      </div>

      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p className="text-lg font-medium">No messages yet</p>
            <p className="mt-1">Start a conversation by sending a message below.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 ${message.role === 'user' ? 'ml-3' : 'mr-3'}`}>
                    <Avatar
                      src={message.role === 'user' ? userImage : assistantImage}
                      alt={message.role === 'user' ? userName : assistantName}
                      size="sm"
                    />
                  </div>
                  <div>
                    <div className={`
                      px-4 py-2 rounded-lg
                      ${message.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'}
                    `}>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.timestamp && (
                      <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-right' : 'text-left'} text-gray-500`}>
                        {formatTimestamp(message.timestamp)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            isLoading={isLoading}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;