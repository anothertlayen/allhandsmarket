import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import ListingGrid from '../components/listings/ListingGrid';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

// This would be replaced with actual data fetching in a real app
const getMockListings = () => {
  return [
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
    {
      _id: '3',
      title: 'Programming Books Collection',
      description: 'Collection of programming books covering JavaScript, Python, React, and more. Great for beginners and intermediate developers.',
      images: ['/images/listings/books.svg'],
      category: 'Books',
      location: 'Austin, TX',
      createdAt: new Date().toISOString(),
      owner: {
        _id: '103',
        name: 'David Kim',
        image: '/images/users/david.svg',
        rating: 4.9
      }
    },
    {
      _id: '4',
      title: 'Acoustic Guitar',
      description: 'Beautiful acoustic guitar in great condition. Comes with a case, extra strings, and a tuner.',
      images: ['/images/listings/guitar.svg'],
      category: 'Music',
      location: 'Nashville, TN',
      createdAt: new Date().toISOString(),
      owner: {
        _id: '104',
        name: 'Sarah Wilson',
        image: '/images/users/sarah.svg',
        rating: 4.7
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
      _id: '6',
      title: 'Digital Camera with Accessories',
      description: 'DSLR camera with extra lenses, tripod, and carrying case. Perfect for photography enthusiasts.',
      images: ['/images/listings/camera.svg'],
      category: 'Electronics',
      location: 'San Francisco, CA',
      createdAt: new Date().toISOString(),
      owner: {
        _id: '106',
        name: 'Emily Chen',
        image: '/images/users/emily.svg',
        rating: 4.9
      }
    }
  ];
};

export default function ListingsPage() {
  const listings = getMockListings();
  
  const categories = [
    'All Categories',
    'Electronics',
    'Furniture',
    'Clothing',
    'Books',
    'Sports',
    'Music',
    'Outdoors',
    'Home & Garden',
    'Art',
    'Services',
    'Other'
  ];

  return (
    <MainLayout>
      <div className="py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <Card>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        id={`category-${index}`}
                        name="category"
                        type="radio"
                        defaultChecked={index === 0}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`category-${index}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Location</h3>
                <div>
                  <input
                    type="text"
                    placeholder="City, state, or zip code"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Date Posted</h3>
                <div className="space-y-2">
                  {['Any time', 'Today', 'This week', 'This month'].map((option, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        id={`date-${index}`}
                        name="date"
                        type="radio"
                        defaultChecked={index === 0}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`date-${index}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Browse Listings</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Showing {listings.length} results
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex space-x-2">
                <select
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  defaultValue="newest"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="rating">Highest rated</option>
                </select>
                <Button href="/listings/create" variant="primary" size="sm">
                  Create Listing
                </Button>
              </div>
            </div>

            <ListingGrid listings={listings} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}