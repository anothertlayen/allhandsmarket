"use client";

import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: ReactNode;
  user?: any;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, user }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user} />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;