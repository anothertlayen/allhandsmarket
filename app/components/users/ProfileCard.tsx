"use client";

import React from 'react';
import Link from 'next/link';
import Card from '../ui/Card';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';

interface ProfileCardProps {
  user: {
    _id: string;
    name: string;
    image?: string;
    bio?: string;
    rating?: number;
    reviewCount?: number;
    joinedAt: string;
    isCurrentUser?: boolean;
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
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
          {rating?.toFixed(1) || 'No ratings'} {user.reviewCount ? `(${user.reviewCount})` : ''}
        </span>
      </div>
    );
  };

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-24"></div>
      <div className="px-4 pb-5">
        <div className="flex justify-between -mt-12">
          <Avatar
            src={user.image}
            alt={user.name}
            size="xl"
            className="ring-4 ring-white"
          />
          {!user.isCurrentUser && (
            <div className="mt-12 flex space-x-2">
              <Button href={`/messages/${user._id}`} variant="outline" size="sm">
                Message
              </Button>
            </div>
          )}
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-500">
            Member since {formatDate(user.joinedAt)}
          </p>
          {user.rating !== undefined && (
            <div className="mt-2">
              {renderStars(user.rating)}
            </div>
          )}
          {user.bio && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900">About</h3>
              <p className="mt-1 text-sm text-gray-600">{user.bio}</p>
            </div>
          )}
          {user.isCurrentUser && (
            <div className="mt-4">
              <Button href="/profile/edit" variant="outline" size="sm" fullWidth>
                Edit Profile
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;