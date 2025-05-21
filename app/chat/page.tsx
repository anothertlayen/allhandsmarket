"use client";

import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import ChatInterface from '../components/chat/ChatInterface';
import ChatSessionList from '../components/chat/ChatSessionList';

// Mock data for chat sessions
const getMockChatSessions = () => {
  return [
    {
      _id: '1',
      title: 'Looking for gardening tools',
      lastMessage: 'I found several listings for gardening tools in your area.',
      updatedAt: new Date().toISOString(),
    },
    {
      _id: '2',
      title: 'Help with finding musical instruments',
      lastMessage: 'Would you prefer acoustic or electric guitars?',
      updatedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    },
    {
      _id: '3',
      title: 'Book recommendations',
      lastMessage: 'Based on your interests, I recommend checking out these programming books.',
      updatedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    },
  ];
};

// Mock data for chat messages
const getMockChatMessages = () => {
  return [
    {
      role: 'user',
      content: 'Hi, I\'m looking for gardening tools in my area.',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    },
    {
      role: 'assistant',
      content: 'Hello! I\'d be happy to help you find gardening tools. Could you tell me what specific tools you\'re looking for and your location?',
      timestamp: new Date(Date.now() - 3540000), // 59 minutes ago
    },
    {
      role: 'user',
      content: 'I need a shovel, rake, and some pruning shears. I\'m in Portland, Oregon.',
      timestamp: new Date(Date.now() - 3480000), // 58 minutes ago
    },
    {
      role: 'assistant',
      content: 'Great! I found several listings for gardening tools in Portland:\n\n1. Complete Gardening Tool Set - includes shovel, rake, pruning shears, and gloves. Located in Southeast Portland.\n\n2. Premium Pruning Shears - professional grade, barely used. Located in the Pearl District.\n\n3. Garden Essentials Bundle - includes various tools and a storage rack. Located in Beaverton.\n\nWould you like more details about any of these listings?',
      timestamp: new Date(Date.now() - 3420000), // 57 minutes ago
    },
    {
      role: 'user',
      content: 'The Complete Gardening Tool Set sounds perfect. Can you tell me more about it?',
      timestamp: new Date(Date.now() - 3360000), // 56 minutes ago
    },
    {
      role: 'assistant',
      content: 'Here are the details for the Complete Gardening Tool Set:\n\n- Posted by: Maria Garcia (4.5★ rating)\n- Description: "Complete set of gardening tools including shovel, rake, pruning shears, and gloves. All in excellent condition."\n- Location: Southeast Portland, about 3 miles from downtown\n- Posted: Yesterday\n\nMaria mentions that all tools are in excellent condition and have been well-maintained. Would you like me to help you contact Maria about this listing?',
      timestamp: new Date(Date.now() - 3300000), // 55 minutes ago
    },
  ];
};

export default function ChatPage() {
  const chatSessions = getMockChatSessions();
  const messages = getMockChatMessages();

  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message);
    // In a real app, this would send the message to the API
  };

  const handleNewSession = () => {
    console.log('Creating new chat session');
    // In a real app, this would create a new chat session
  };

  return (
    <MainLayout>
      <div className="py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">AI Assistant</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat sessions sidebar */}
          <div className="lg:col-span-1">
            <ChatSessionList
              sessions={chatSessions}
              activeSessionId="1"
              onNewSession={handleNewSession}
            />
          </div>
          
          {/* Chat interface */}
          <div className="lg:col-span-3">
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              title="Looking for gardening tools"
              assistantName="AllHandsMarket Assistant"
              assistantImage="/images/assistant-avatar.svg"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}