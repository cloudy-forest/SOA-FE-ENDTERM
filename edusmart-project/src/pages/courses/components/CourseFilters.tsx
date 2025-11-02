// src/pages/courses/components/CourseFilters.tsx
import { useState } from 'react';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { CheckboxPill } from '../../../components/ui/CheckboxPill';
import { RadioPill } from '../../../components/ui/RadioPill';
import { 
  categoryFilters, levelFilters, priceFilters, ratingFilters 
} from '../../../data/mockCourses';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  toggleCategory,
  toggleLevel,
  setPrice,
  toggleRating,
  clearFilters
} from '../../../app/slices/courseFilterSlice';

export const CourseFilters = () => {
  const dispatch = useAppDispatch();
  
  // 1. ĐỌC state từ Redux
  const { categories, levels, price, ratings } = useAppSelector(state => state.courseFilter);

  // 2. DÙNG useState cho trạng thái UI CỤC BỘ
  const [openSections, setOpenSections] = useState({
    category: true,
    level: true,
    price: true,
    rating: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };
  
  const hasActiveFilters = categories.length > 0 || levels.length > 0 || price !== 'all' || ratings.length > 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-24">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Bộ lọc</h2>

      {/* 1. Category */}
      <div className="mb-4">
        <SectionHeader title="Danh mục" isOpen={openSections.category} onToggle={() => toggleSection('category')} />
        {openSections.category && (
          <div className="py-3 flex flex-wrap gap-2">
            {categoryFilters.map(filter => (
              <CheckboxPill
                key={filter.id}
                id={`cat-${filter.id}`}
                label={filter.name}
                checked={categories.includes(filter.id)}
                // 3. DISPATCH action khi thay đổi
                onChange={() => dispatch(toggleCategory(filter.id))}
              />
            ))}
          </div>
        )}
      </div>

      {/* 2. Level */}
      <div className="mb-4">
        <SectionHeader title="Trình độ" isOpen={openSections.level} onToggle={() => toggleSection('level')} />
        {openSections.level && (
          <div className="py-3 flex flex-wrap gap-2">
            {levelFilters.map(filter => (
              <CheckboxPill
                key={filter.id}
                id={`lvl-${filter.id}`}
                label={filter.name}
                checked={levels.includes(filter.id)}
                onChange={() => dispatch(toggleLevel(filter.id))}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* 3. Price */}
      <div className="mb-4">
        <SectionHeader title="Giá" isOpen={openSections.price} onToggle={() => toggleSection('price')} />
        {openSections.price && (
          <div className="py-3 flex flex-wrap gap-2">
            {priceFilters.map(filter => (
              <RadioPill
                key={filter.id}
                id={`price-${filter.id}`}
                label={filter.name}
                name="price"
                value={filter.id}
                checked={price === filter.id}
                onChange={() => dispatch(setPrice(filter.id))}
              />
            ))}
          </div>
        )}
      </div>

      {/* 4. Rating */}
      <div className="mb-4">
        <SectionHeader title="Đánh giá" isOpen={openSections.rating} onToggle={() => toggleSection('rating')} />
        {openSections.rating && (
          <div className="py-3 flex flex-wrap gap-2">
            {ratingFilters.map(filter => (
              <CheckboxPill
                key={filter.id}
                id={`rating-${filter.id}`}
                label={filter.name}
                checked={ratings.includes(filter.id)}
                onChange={() => dispatch(toggleRating(filter.id))}
              />
            ))}
          </div>
        )}
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={() => dispatch(clearFilters())}
          className="w-full mt-4 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        >
          Xóa tất cả bộ lọc
        </button>
      )}
    </div>
  );
};