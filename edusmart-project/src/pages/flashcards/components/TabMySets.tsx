// src/pages/flashcards/components/TabMySets.tsx
import { useState, useMemo } from 'react';
import { myFlashcardSets } from '../../../data/mockFlashcards'; // Dùng data "của tôi"
import { FlashcardSetCard } from './FlashcardSetCard';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

export const TabMySets = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSets = useMemo(() => {
    if (!searchTerm) return myFlashcardSets;
    return myFlashcardSets.filter(set => 
      set.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div>
      {/* Toolbar cho Tab "Của tôi" */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative w-full md:w-1/2">
          <input
            type="search"
            placeholder="Tìm kiếm bộ thẻ của bạn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        {/* Nút CTA: Tạo bộ thẻ */}
        <Link 
          to="/flashcards/create" // (Sẽ tạo trang này sau)
          className="w-full md:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5" />
          Tạo bộ thẻ mới
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSets.map(set => (
          <FlashcardSetCard key={set.id} set={set} type="personal" />
        ))}
      </div>
    </div>
  );
};