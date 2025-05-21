import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import ProfileCard from '../../components/users/ProfileCard';
import UserReviews from '../../components/users/UserReviews';
import ListingGrid from '../../components/listings/ListingGrid';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// Mock data for a user
const getMockUser = (id: string) => {
  return {
    _id: id,
    name: 'Maria Garcia',
    image: '/images/users/maria.svg',
    bio: 'Gardening enthusiast and community organizer. I love sharing plants, tools, and knowledge with my neighbors.',
    rating: 4.5,
    reviewCount: 8,
    joinedAt: '2023-02-10T00:00:00.000Z',
    isCurrentUser: false,
  };
};

// Mock data for user reviews
const getMockReviews = (userId: string) => {
  return [
    {
      _id: '1',
      reviewer: {
        _id: '101',
        name: 'Alex Johnson',
        image: '/images/users/alex.svg',
      },
      rating: 5,
      comment: 'Maria was great to work with! The gardening tools were in excellent condition as described, and she even gave me some tips for my garden.',
      createdAt: '2023-05-15T00:00:00.000Z',
      relatedListing: {
        _id: '2',
        title: 'Gardening Tools Set',
      },
    },
    {
      _id: '2',
      reviewer: {
        _id: '103',
        name: 'David Kim',
        image: '/images/users/david.svg',
      },
      rating: 4,
      comment: 'Very helpful and responsive. The plant cuttings were healthy and are growing well.',
      createdAt: '2023-04-22T00:00:00.000Z',
      relatedListing: {
        _id: '9',
        title: 'Plant Cuttings Collection',
      },
    },
    {
      _id: '3',
      reviewer: {
        _id: '104',
        name: 'Sarah Wilson',
        image: '/images/users/sarah.svg',
      },
      rating: 5,
      comment: 'Maria is a wonderful community member. She shared her knowledge about composting and helped me set up my own system.',
      createdAt: '2023-03-15T00:00:00.000Z',
      relatedListing: {
        _id: '10',
        title: 'Composting Workshop',
      },
    },
  ];
};

// Mock data for review statistics
const getMockReviewStats = (userId: string) => {
  return {
    averageRating: 4.5,
    totalReviews: 8,
    ratingDistribution: {
      5: 5,
      4: 2,
      3: 1,
      2: 0,
      1: 0,
    },
  };
};

// Mock data for user listings
const getMockUserListings = (userId: string) => {
  return [
    {
      _id: '2',
      title: 'Gardening Tools Set',
      description: 'Complete set of gardening tools including shovel, rake, pruning shears, and gloves. All in excellent condition.',
      images: ['/images/listings/gardening.svg'],
      category: 'Home & Garden',
      location: 'Portland, OR',
      createdAt: new Date().toISOString(),
      owner: {
        _id: userId,
        name: 'Maria Garcia',
        image: '/images/users/maria.svg',
        rating: 4.5
      }
    },
    {
      _id: '9',
      title: 'Plant Cuttings Collection',
      description: 'Various plant cuttings from my garden, including pothos, monstera, and snake plant. All ready to root.',
      images: ['/images/listings/plants.svg'],
      category: 'Home & Garden',
      location: 'Portland, OR',
      createdAt: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
      owner: {
        _id: userId,
        name: 'Maria Garcia',
        image: '/images/users/maria.svg',
        rating: 4.5
      }
    },
    {
      _id: '10',
      title: 'Composting Workshop',
      description: 'I\'m offering a free workshop on home composting. Learn how to reduce waste and create nutrient-rich soil for your garden.',
      images: ['/images/listings/composting.svg'],
      category: 'Services',
      location: 'Portland, OR',
      createdAt: new Date(Date.now() - 1209600000).toISOString(), // 2 weeks ago
      owner: {
        _id: userId,
        name: 'Maria Garcia',
        image: '/images/users/maria.svg',
        rating: 4.5
      }
    }
  ];
};

interface UserProfilePageProps {
  params: {
    id: string;
  };
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const user = getMockUser(params.id);
  const reviews = getMockReviews(params.id);
  const reviewStats = getMockReviewStats(params.id);
  const listings = getMockUserListings(params.id);
  const currentUserId = '101'; // Alex Johnson

  return (
    <MainLayout>
      <div className="py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - User profile */}
          <div className="lg:col-span-1">
            <ProfileCard user={user} />
            
            <div className="mt-6">
              <Card>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Contact {user.name}</h3>
                <div className="space-y-3">
                  <Button href={`/messages/${user._id}`} variant="primary" fullWidth>
                    Send Message
                  </Button>
                  <Button href={`/chat?user=${user._id}`} variant="outline" fullWidth>
                    Ask AI About {user.name.split(' ')[0]}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
          
          {/* Right column - Listings and reviews */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{user.name}'s Listings</h2>
              <ListingGrid listings={listings} />
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Reviews</h2>
              <UserReviews
                reviews={reviews}
                stats={reviewStats}
                userId={user._id}
                canReview={true}
                onAddReview={() => console.log('Add review clicked')}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}