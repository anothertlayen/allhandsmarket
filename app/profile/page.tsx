import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import ProfileCard from '../components/users/ProfileCard';
import UserReviews from '../components/users/UserReviews';
import ListingGrid from '../components/listings/ListingGrid';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

// Mock data for the current user
const getMockCurrentUser = () => {
  return {
    _id: '101',
    name: 'Alex Johnson',
    image: '/images/users/alex.svg',
    bio: 'Passionate about sustainability and community building. I love cycling, gardening, and sharing resources with neighbors.',
    rating: 4.8,
    reviewCount: 12,
    joinedAt: '2023-01-15T00:00:00.000Z',
    isCurrentUser: true,
  };
};

// Mock data for user reviews
const getMockReviews = () => {
  return [
    {
      _id: '1',
      reviewer: {
        _id: '102',
        name: 'Maria Garcia',
        image: '/images/users/maria.svg',
      },
      rating: 5,
      comment: 'Alex was great to work with! The bicycle was in perfect condition as described, and the pickup was smooth and easy.',
      createdAt: '2023-04-10T00:00:00.000Z',
      relatedListing: {
        _id: '1',
        title: 'Vintage Bicycle',
      },
    },
    {
      _id: '2',
      reviewer: {
        _id: '103',
        name: 'David Kim',
        image: '/images/users/david.svg',
      },
      rating: 5,
      comment: 'Very responsive and helpful. The camping gear was clean and well-maintained.',
      createdAt: '2023-03-22T00:00:00.000Z',
      relatedListing: {
        _id: '7',
        title: 'Camping Gear Set',
      },
    },
    {
      _id: '3',
      reviewer: {
        _id: '104',
        name: 'Sarah Wilson',
        image: '/images/users/sarah.svg',
      },
      rating: 4,
      comment: 'Good experience overall. The books were in good condition, though one had some highlighting.',
      createdAt: '2023-02-15T00:00:00.000Z',
      relatedListing: {
        _id: '8',
        title: 'Science Fiction Book Collection',
      },
    },
  ];
};

// Mock data for review statistics
const getMockReviewStats = () => {
  return {
    averageRating: 4.8,
    totalReviews: 12,
    ratingDistribution: {
      5: 10,
      4: 1,
      3: 1,
      2: 0,
      1: 0,
    },
  };
};

// Mock data for user listings
const getMockUserListings = () => {
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
      _id: '7',
      title: 'Camping Gear Set',
      description: 'Complete camping set including tent, sleeping bags, and cooking equipment. Perfect for a weekend getaway.',
      images: ['/images/listings/camping.svg'],
      category: 'Outdoors',
      location: 'Brooklyn, NY',
      createdAt: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
      owner: {
        _id: '101',
        name: 'Alex Johnson',
        image: '/images/users/alex.svg',
        rating: 4.8
      }
    },
    {
      _id: '8',
      title: 'Science Fiction Book Collection',
      description: 'Collection of classic sci-fi novels including works by Asimov, Clarke, and Herbert. All in good condition.',
      images: ['/images/listings/scifi.svg'],
      category: 'Books',
      location: 'Brooklyn, NY',
      createdAt: new Date(Date.now() - 1209600000).toISOString(), // 2 weeks ago
      owner: {
        _id: '101',
        name: 'Alex Johnson',
        image: '/images/users/alex.svg',
        rating: 4.8
      }
    }
  ];
};

export default function ProfilePage() {
  const user = getMockCurrentUser();
  const reviews = getMockReviews();
  const reviewStats = getMockReviewStats();
  const listings = getMockUserListings();

  return (
    <MainLayout>
      <div className="py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - User profile */}
          <div className="lg:col-span-1">
            <ProfileCard user={user} />
            
            <div className="mt-6">
              <Card>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button href="/listings/create" variant="outline" fullWidth>
                    Create New Listing
                  </Button>
                  <Button href="/messages" variant="outline" fullWidth>
                    View Messages
                  </Button>
                  <Button href="/chat" variant="outline" fullWidth>
                    Chat with Assistant
                  </Button>
                </div>
              </Card>
            </div>
          </div>
          
          {/* Right column - Listings and reviews */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">My Listings</h2>
                <Button href="/listings/create" variant="primary" size="sm">
                  Create Listing
                </Button>
              </div>
              <ListingGrid listings={listings} />
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Reviews</h2>
              <UserReviews
                reviews={reviews}
                stats={reviewStats}
                userId={user._id}
                canReview={false}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}