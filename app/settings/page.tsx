import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';

export default function SettingsPage() {
  // Mock user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    image: '/images/users/alex.svg',
    location: 'Brooklyn, NY',
    bio: 'Passionate about sustainability and community building. I love sharing resources and connecting with like-minded individuals.',
    joinedAt: '2023-01-15T00:00:00.000Z',
  };

  return (
    <MainLayout>
      <div className="py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings navigation */}
          <div className="lg:col-span-1">
            <Card>
              <nav className="space-y-1">
                <a
                  href="#profile"
                  className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </a>
                <a
                  href="#account"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Account
                </a>
                <a
                  href="#notifications"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  Notifications
                </a>
                <a
                  href="#privacy"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Privacy & Security
                </a>
              </nav>
            </Card>
          </div>
          
          {/* Settings content */}
          <div className="lg:col-span-3">
            {/* Profile section */}
            <section id="profile" className="mb-6">
              <Card>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h2>
                
                <div className="flex items-center mb-6">
                  <Avatar
                    src={user.image}
                    alt={user.name}
                    size="xl"
                  />
                  <div className="ml-5">
                    <Button variant="outline" size="sm">
                      Change Photo
                    </Button>
                    <p className="mt-1 text-xs text-gray-500">
                      JPG, GIF or PNG. 1MB max.
                    </p>
                  </div>
                </div>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        defaultValue={user.name}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        defaultValue={user.email}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      defaultValue={user.location}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      defaultValue={user.bio}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" variant="primary">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Card>
            </section>
            
            {/* Account section */}
            <section id="account" className="mb-6">
              <Card>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h2>
                
                <form className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Change Password</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="current-password"
                          name="current-password"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div className="sm:col-span-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                            New Password
                          </label>
                          <input
                            type="password"
                            id="new-password"
                            name="new-password"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Linked Accounts</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg className="h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                          </svg>
                          <span className="ml-3 text-sm text-gray-700">Google</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Connect
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg className="h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                          </svg>
                          <span className="ml-3 text-sm text-gray-700">Facebook</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Connect
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-red-600 mb-2">Danger Zone</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button variant="danger" size="sm">
                      Delete Account
                    </Button>
                  </div>
                  
                  <div className="flex justify-end pt-4 border-t border-gray-200">
                    <Button type="submit" variant="primary">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Card>
            </section>
            
            {/* Notifications section */}
            <section id="notifications" className="mb-6">
              <Card>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h2>
                
                <form className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Email Notifications</h3>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="email-messages"
                              name="email-messages"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="email-messages" className="font-medium text-gray-700">
                              Messages
                            </label>
                            <p className="text-gray-500">Get notified when someone sends you a message.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="email-listings"
                              name="email-listings"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="email-listings" className="font-medium text-gray-700">
                              Listing Activity
                            </label>
                            <p className="text-gray-500">Get notified when someone interacts with your listings.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="email-newsletter"
                              name="email-newsletter"
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="email-newsletter" className="font-medium text-gray-700">
                              Newsletter
                            </label>
                            <p className="text-gray-500">Receive our newsletter with community updates and tips.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Push Notifications</h3>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="push-messages"
                              name="push-messages"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="push-messages" className="font-medium text-gray-700">
                              Messages
                            </label>
                            <p className="text-gray-500">Get push notifications for new messages.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="push-listings"
                              name="push-listings"
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="push-listings" className="font-medium text-gray-700">
                              Listing Activity
                            </label>
                            <p className="text-gray-500">Get push notifications for listing interactions.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4 border-t border-gray-200">
                    <Button type="submit" variant="primary">
                      Save Preferences
                    </Button>
                  </div>
                </form>
              </Card>
            </section>
            
            {/* Privacy & Security section */}
            <section id="privacy">
              <Card>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Privacy & Security</h2>
                
                <form className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Privacy Settings</h3>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="profile-visibility"
                              name="profile-visibility"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="profile-visibility" className="font-medium text-gray-700">
                              Public Profile
                            </label>
                            <p className="text-gray-500">Allow others to view your profile information.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="location-visibility"
                              name="location-visibility"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="location-visibility" className="font-medium text-gray-700">
                              Show Location
                            </label>
                            <p className="text-gray-500">Display your general location on your profile and listings.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Security</h3>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="two-factor"
                              name="two-factor"
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="two-factor" className="font-medium text-gray-700">
                              Two-Factor Authentication
                            </label>
                            <p className="text-gray-500">Add an extra layer of security to your account.</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button variant="outline" size="sm">
                            View Login Activity
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Data & Privacy</h3>
                      <div className="space-y-2">
                        <div className="mt-2">
                          <Button variant="outline" size="sm">
                            Download Your Data
                          </Button>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          You can request a copy of your personal data, including your profile information, listings, and messages.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4 border-t border-gray-200">
                    <Button type="submit" variant="primary">
                      Save Settings
                    </Button>
                  </div>
                </form>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}