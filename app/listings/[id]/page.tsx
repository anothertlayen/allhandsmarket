import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import ListingGrid from '../../components/listings/ListingGrid';

// Mock data for a single listing
const getMockListing = (id: string) => {
  return {
    _id: id,
    title: 'Vintage Bicycle',
    description: 'A well-maintained vintage bicycle from the 1970s. Perfect for city commuting or as a collector\'s item. This bicycle has been carefully restored with original parts where possible, and has been serviced recently. The frame is in excellent condition with no rust or damage. Includes a new bell and basket.',
    images: ['/images/listings/bicycle.svg', '/images/listings/bicycle-2.svg', '/images/listings/bicycle-3.svg'],
    category: 'Sports',
    location: 'Brooklyn, NY',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    owner: {
      _id: '101',
      name: 'Alex Johnson',
      image: '/images/users/alex.svg',
      rating: 4.8,
      reviewCount: 12,
      joinedAt: '2023-01-15T00:00:00.000Z',
    }
  };
};

// Mock data for similar listings
const getMockSimilarListings = () => {
  return [
    {
      _id: '4',
      title: 'Mountain Bike',
      description: 'High-quality mountain bike in great condition. Perfect for trails and off-road cycling.',
      images: ['/images/listings/mountain-bike.svg'],
      category: 'Sports',
      location: 'Queens, NY',
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
      title: 'Road Bike Helmet',
      description: 'Lightweight road bike helmet, barely used. Size medium.',
      images: ['/images/listings/helmet.svg'],
      category: 'Sports',
      location: 'Manhattan, NY',
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
      title: 'Cycling Accessories Bundle',
      description: 'Bundle of cycling accessories including lights, water bottle, and repair kit.',
      images: ['/images/listings/cycling-accessories.svg'],
      category: 'Sports',
      location: 'Brooklyn, NY',
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

interface ListingDetailPageProps {
  params: {
    id: string;
  };
}

export default function ListingDetailPage({ params }: ListingDetailPageProps) {
  const listing = getMockListing(params.id);
  const similarListings = getMockSimilarListings();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`h-5 w-5 ${
              star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {listing.owner.rating.toFixed(1)} ({listing.owner.reviewCount} reviews)
        </span>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Listing images and details */}
          <div className="lg:col-span-2">
            <Card>
              {/* Image gallery */}
              <div className="mb-6">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                  <div className="relative h-96">
                    {listing.images && listing.images.length > 0 ? (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        {/* In a real app, this would be a proper image gallery */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                {listing.images && listing.images.length > 1 && (
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {listing.images.map((image, index) => (
                      <div key={index} className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-md overflow-hidden">
                        <div className="h-20 w-full bg-gray-200 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Listing details */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{listing.title}</h1>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {listing.location}
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Posted on {formatDate(listing.createdAt)}
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {listing.category}
                </div>

                <div className="mt-6">
                  <h2 className="text-lg font-medium text-gray-900">Description</h2>
                  <p className="mt-2 text-gray-600 whitespace-pre-line">{listing.description}</p>
                </div>
              </div>
            </Card>

            {/* Similar listings */}
            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Similar Listings</h2>
              <ListingGrid listings={similarListings} />
            </div>
          </div>

          {/* Right column - Owner info and actions */}
          <div className="lg:col-span-1">
            <Card>
              <div className="flex items-center">
                <Avatar
                  src={listing.owner.image}
                  alt={listing.owner.name}
                  size="lg"
                />
                <div className="ml-4">
                  <h2 className="text-lg font-medium text-gray-900">{listing.owner.name}</h2>
                  <p className="text-sm text-gray-500">
                    Member since {new Date(listing.owner.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                  <div className="mt-1">
                    {renderStars(listing.owner.rating)}
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button href={`/messages/${listing.owner._id}`} variant="primary" fullWidth>
                  Message
                </Button>
                <Button href={`/users/${listing.owner._id}`} variant="outline" fullWidth>
                  View Profile
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Ask AI Assistant</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Have questions about this listing? Our AI assistant can help you.
                </p>
                <Button href={`/chat?listing=${listing._id}`} variant="outline" fullWidth>
                  Chat with Assistant
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Safety Tips</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Meet in a public place
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Check the item before accepting
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Use our messaging system
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Report suspicious behavior
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}