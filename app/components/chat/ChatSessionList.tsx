"use client";

import React from 'react';
import Link from 'next/link';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface ChatSession {
  _id: string;
  title: string;
  lastMessage?: string;
  updatedAt: string;
}

interface ChatSessionListProps {
  sessions: ChatSession[];
  activeSessionId?: string;
  onNewSession: () => void;
}

const ChatSessionList: React.FC<ChatSessionListProps> = ({
  sessions,
  activeSessionId,
  onNewSession,
}) => {
  return (
    <Card className="h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Your Chats</h2>
        <Button onClick={onNewSession} size="sm">
          New Chat
        </Button>
      </div>

      {sessions.length === 0 ? (
        <div className="text-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className="mt-2 text-gray-500">No chat sessions yet</p>
          <div className="mt-4">
            <Button onClick={onNewSession} size="sm">
              Start a new chat
            </Button>
          </div>
        </div>
      ) : (
        <ul className="space-y-2">
          {sessions.map((session) => (
            <li key={session._id}>
              <Link href={`/chat/${session._id}`}>
                <div
                  className={`
                    p-3 rounded-md hover:bg-gray-50 transition-colors
                    ${activeSessionId === session._id ? 'bg-blue-50 border border-blue-200' : ''}
                  `}
                >
                  <div className="font-medium text-gray-900 truncate">{session.title}</div>
                  {session.lastMessage && (
                    <p className="text-sm text-gray-500 mt-1 truncate">{session.lastMessage}</p>
                  )}
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(session.updatedAt).toLocaleDateString()} at {new Date(session.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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

export default ChatSessionList;