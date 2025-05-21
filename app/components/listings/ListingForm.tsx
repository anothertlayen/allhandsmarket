"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface ListingFormProps {
  initialData?: {
    _id?: string;
    title: string;
    description: string;
    category: string;
    location: string;
    tags: string[];
    images: string[];
  };
  onSubmit: (data: any) => Promise<void>;
  isSubmitting: boolean;
}

const CATEGORIES = [
  'Electronics',
  'Furniture',
  'Clothing',
  'Books',
  'Sports',
  'Art',
  'Services',
  'Other'
];

const ListingForm: React.FC<ListingFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || CATEGORIES[0],
    location: initialData?.location || '',
    tags: initialData?.tags?.join(', ') || '',
    images: initialData?.images || []
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageUrls, setImageUrls] = useState<string[]>(initialData?.images || []);
  const [imageUploadError, setImageUploadError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setImageUploadError('');
    
    // In a real app, you would upload these to a storage service
    // For now, we'll create object URLs for preview
    const newImageUrls = Array.from(files).map(file => URL.createObjectURL(file));
    
    setImageUrls(prev => [...prev, ...newImageUrls]);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImageUrls]
    }));
  };

  const removeImage = (index: number) => {
    const newImages = [...imageUrls];
    newImages.splice(index, 1);
    setImageUrls(newImages);
    
    const newFormImages = [...formData.images];
    newFormImages.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      images: newFormImages
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Process tags from comma-separated string to array
    const processedData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };
    
    try {
      await onSubmit(processedData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            label="Title"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            placeholder="Enter a descriptive title"
            fullWidth
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your listing in detail"
            className={`
              block w-full rounded-md border-gray-300 shadow-sm
              focus:border-blue-500 focus:ring-blue-500 sm:text-sm
              ${errors.description ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' : ''}
            `}
            required
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            >
              {CATEGORIES.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <Input
              label="Location"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              error={errors.location}
              placeholder="City, State or Region"
              fullWidth
              required
            />
          </div>
        </div>
        
        <div>
          <Input
            label="Tags (comma separated)"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g. vintage, handmade, organic"
            fullWidth
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Images
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
                  <span>Upload images</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
          
          {imageUploadError && (
            <p className="mt-1 text-sm text-red-600">{imageUploadError}</p>
          )}
          
          {imageUrls.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`Listing image ${index + 1}`}
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {initialData?._id ? 'Update Listing' : 'Create Listing'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ListingForm;