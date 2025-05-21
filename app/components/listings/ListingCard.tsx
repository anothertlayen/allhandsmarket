"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Card from '../ui/Card';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

interface ListingCardProps {
  listing: {
    _id: string;
    title: string;
    description: string;
    images: string[];
    category: string;
    location: string;
    createdAt: string;
    owner: {
      _id: string;
      name: string;
      image?: string;
      rating?: number;
    };
  };
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  return (
    <Card hover className="h-full flex flex-col">
      <Link href={`/listings/${listing._id}`} className="block">
        <div className="relative h-48 w-full mb-4 overflow-hidden rounded-md">
          {listing.images && listing.images.length > 0 ? (
            <Image
              src={listing.images[0]}
              alt={listing.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          <div className="absolute top-2 left-2">
            <Badge variant="primary" size="sm">{listing.category}</Badge>
          </div>
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-1">{listing.title}</h3>
        
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">{listing.description}</p>
      </Link>
      
      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
        <Link href={`/users/${listing.owner._id}`} className="flex items-center group">
          <Avatar 
            src={listing.owner.image} 
            alt={listing.owner.name} 
            size="sm" 
          />
          <span className="ml-2 text-sm text-gray-700 group-hover:text-blue-600">
            {listing.owner.name}
          </span>
        </Link>
        
        <div className="text-sm text-gray-500">
          {new Date(listing.createdAt).toLocaleDateString()}
        </div>
      </div>
    </Card>
  );
};

export default ListingCard;