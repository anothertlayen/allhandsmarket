import React from 'react';
import Link from 'next/link';
import MainLayout from '../components/layout/MainLayout';
import ListingGrid from '../components/listings/ListingGrid';
import Card from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';

// Mock data for search results
const getMockSearchResults = (query: string) => {
  // Mock listings results
  const listings = [
    {
      _id: '1',
      title: 'Vintage Bicycle',
      description: 'A well-maintained vintage bicycle from the 1970s. Perfect for city commuting or as a collector\'s item.',
      images: ['/images/listings/bicycle.svg'],
      category: 'Sports',
      location: 'Brooklyn, NY',
      createdAt: new Date().toISOString(),
      owner: {
        _id: '101',
        name: 'Alex Johnson',
        image: '/images/users/alex.svg',
        rating: 4.8
      }
    },
    {
      _id: '5',
      title: 'Camping Tent (4-Person)',
      description: 'Spacious 4-person camping tent, waterproof and easy to set up. Used only twice and in excellent condition.',
      images: ['/images/listings/tent.svg'],
      category: 'Outdoors',
      location: 'Denver, CO',
      createdAt: new Date().toISOString(),
      owner: {
        _id: '105',
        name: 'Michael Brown',
        image: '/images/users/michael.svg',
        rating: 4.6
      }
    },
    {
      _id: '2',
      title: 'Gardening Tools Set',
      description: 'Complete set of gardening tools including shovel, rake, pruning shears, and gloves. All in excellent condition.',
      images: ['/images/listings/gardening.svg'],
      category: 'Home & Garden',
      location: 'Portland, OR',
      createdAt: new Date().toISOString(),
      owner: {
        _id: '102',
        name: 'Maria Garcia',
        image: '/images/users/maria.svg',
        rating: 4.5
      }
    },
  ];

  // Mock users results
  const users = [
    {
      _id: '101',
      name: 'Alex Johnson',
      image: '/images/users/alex.svg',
      bio: 'Passionate about sustainability and community building.',
      rating: 4.8,
      location: 'Brooklyn, NY',
    },
    {
      _id: '102',
      name: 'Maria Garcia',
      image: '/images/users/maria.svg',
      bio: 'Gardening enthusiast and community organizer.',
      rating: 4.5,
      location: 'Portland, OR',
    },
  ];

  return {
    listings,
    users,
    query,
  };
};

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || '';
  const { listings, users } = getMockSearchResults(query);

  return (
    <MainLayout>
      <div className="py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Search Results</h1>
          <p className="text-sm text-gray-500 mt-1">
            {query ? `Showing results for "${query}"` : 'Showing all results'}
          </p>
        </div>

        {/* Search form */}
        <div className="mb-6">
          <Card>
            <form className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  name="q"
                  defaultValue={query}
                  placeholder="Search for items, services, or users..."
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex-shrink-0">
                <Button type="submit" variant="primary">
                  Search
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Search results */}
        <div className="space-y-8">
          {/* Listings results */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Listings</h2>
              <span className="text-sm text-gray-500">{listings.length} results</span>
            </div>

            {listings.length > 0 ? (
              <ListingGrid listings={listings} />
            ) : (
              <Card>
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="mt-2 text-gray-500">No listings found</p>
                  <div className="mt-4">
                    <Button href="/listings/create" variant="outline" size="sm">
                      Create a listing
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Users results */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Users</h2>
              <span className="text-sm text-gray-500">{users.length} results</span>
            </div>

            {users.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                  <Card key={user._id}>
                    <div className="flex items-start">
                      <Avatar
                        src={user.image}
                        alt={user.name}
                        size="lg"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium text-gray-900">{user.name}</h3>
                        <div className="flex items-center mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`h-4 w-4 ${
                                star <= Math.round(user.rating) ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-1 text-sm text-gray-600">{user.rating.toFixed(1)}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{user.location}</p>
                        {user.bio && (
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{user.bio}</p>
                        )}
                        <div className="mt-3 flex space-x-2">
                          <Button href={`/users/${user._id}`} variant="outline" size="sm">
                            View Profile
                          </Button>
                          <Button href={`/messages/${user._id}`} variant="outline" size="sm">
                            Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="mt-2 text-gray-500">No users found</p>
                </div>
              </Card>
            )}
          </div>

          {/* AI Assistant suggestion */}
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Need more specific results?</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Our AI Assistant can help you find exactly what you're looking for with a more natural conversation.
                </p>
                <div className="mt-3">
                  <Button href={`/chat?q=${encodeURIComponent(query)}`} variant="outline" size="sm">
                    Chat with AI Assistant
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}