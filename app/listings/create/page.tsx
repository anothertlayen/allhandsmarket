"use client";

import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

export default function CreateListingPage() {
  const categories = [
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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create a New Listing</h1>
          
          <Card>
            <form className="space-y-6">
              {/* Basic Information */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g., Vintage Bicycle"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <div className="mt-1">
                      <select
                        id="category"
                        name="category"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={5}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Describe your item in detail. Include condition, features, and any other relevant information."
                        required
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Be specific and detailed to help others understand what you're sharing.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Location */}
              <div className="pt-6 border-t border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Location</h2>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="location"
                      name="location"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="e.g., Brooklyn, NY"
                      required
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Enter a city, neighborhood, or general area. For privacy, don't enter your exact address.
                  </p>
                </div>
              </div>
              
              {/* Images */}
              <div className="pt-6 border-t border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Images</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Photos
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Upload files</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB (max 5 images)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Additional Information */}
              <div className="pt-6 border-t border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
                      Condition
                    </label>
                    <div className="mt-1">
                      <select
                        id="condition"
                        name="condition"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="">Select condition</option>
                        <option value="new">New</option>
                        <option value="like-new">Like New</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                        <option value="poor">Poor</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                      Tags (comma separated)
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="tags"
                        name="tags"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g., vintage, bicycle, commuting"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Add tags to help others find your listing.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Terms and Conditions */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-medium text-gray-700">
                      I agree to the terms and conditions
                    </label>
                    <p className="text-gray-500">
                      By creating this listing, I confirm that I am sharing this item in accordance with the{' '}
                      <a href="/terms" className="text-blue-600 hover:text-blue-500">
                        community guidelines
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200 flex justify-end">
                <Button href="/listings" variant="outline" className="mr-3">
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Create Listing
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}