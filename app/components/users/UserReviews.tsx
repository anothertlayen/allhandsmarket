"use client";

import React, { useState } from 'react';
import Card from '../ui/Card';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';

interface Review {
  _id: string;
  reviewer: {
    _id: string;
    name: string;
    image?: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
  relatedListing?: {
    _id: string;
    title: string;
  };
}

interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

interface UserReviewsProps {
  reviews: Review[];
  stats: ReviewStats;
  userId: string;
  canReview: boolean;
  onAddReview?: () => void;
}

const UserReviews: React.FC<UserReviewsProps> = ({
  reviews,
  stats,
  userId,
  canReview,
  onAddReview,
}) => {
  const [visibleReviews, setVisibleReviews] = useState(3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`h-5 w-5 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const renderRatingBar = (rating: number, count: number, total: number) => {
    const percentage = total > 0 ? (count / total) * 100 : 0;
    
    return (
      <div className="flex items-center text-sm">
        <span className="w-3">{rating}</span>
        <svg className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <div className="w-full bg-gray-200 rounded-full h-2 ml-2">
          <div
            className="bg-yellow-400 h-2 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="ml-2 text-gray-500 w-8">{count}</span>
      </div>
    );
  };

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 5);
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 p-4 border-b md:border-b-0 md:border-r border-gray-200">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}</div>
              <div className="mt-2">{renderStars(Math.round(stats.averageRating))}</div>
              <div className="mt-1 text-sm text-gray-500">{stats.totalReviews} reviews</div>
              
              {canReview && (
                <div className="mt-4">
                  <Button onClick={onAddReview} variant="primary" size="sm">
                    Write a Review
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="md:w-2/3 p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Rating Distribution</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating}>
                  {renderRatingBar(
                    rating,
                    stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution],
                    stats.totalReviews
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
      
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.slice(0, visibleReviews).map((review) => (
            <Card key={review._id}>
              <div className="flex items-start">
                <Avatar
                  src={review.reviewer.image}
                  alt={review.reviewer.name}
                  size="md"
                />
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{review.reviewer.name}</h4>
                      <div className="mt-1">{renderStars(review.rating)}</div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(review.createdAt)}
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700">{review.comment}</p>
                  
                  {review.relatedListing && (
                    <div className="mt-3 text-sm">
                      <span className="text-gray-500">Related to: </span>
                      <a
                        href={`/listings/${review.relatedListing._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {review.relatedListing.title}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
          
          {visibleReviews < reviews.length && (
            <div className="text-center">
              <Button
                onClick={loadMoreReviews}
                variant="outline"
              >
                Load More Reviews
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Card>
          <div className="text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <p className="mt-2 text-gray-500">No reviews yet</p>
            {canReview && (
              <div className="mt-4">
                <Button onClick={onAddReview} variant="primary" size="sm">
                  Be the first to write a review
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default UserReviews;