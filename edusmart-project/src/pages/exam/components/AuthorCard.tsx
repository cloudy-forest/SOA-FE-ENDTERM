// src/pages/exam/components/AuthorCard.tsx
import React from 'react';

interface AuthorCardProps {
  name: string;
  title: string;
  bio: string;
  imageUrl?: string;
}

export const AuthorCard = ({ name, title, bio, imageUrl }: AuthorCardProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Tác giả đề thi</h2>
    <div className="flex items-center space-x-4">
      {imageUrl ? (
        <img className="w-16 h-16 rounded-full object-cover" src={imageUrl} alt={name} />
      ) : (
        <span className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-2xl">
          {name.charAt(0)}
        </span>
      )}
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{name}</h3>
        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{title}</p>
      </div>
    </div>
    <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">{bio}</p>
  </div>
);