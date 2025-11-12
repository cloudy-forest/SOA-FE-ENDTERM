// src/pages/flashcards/components/FlashcardToolbarExplore.tsx
import { useState, useEffect, Fragment } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { useDebounced } from '../../../hooks/useDebounced';
import { 
  flashcardSubjectFilters, flashcardLevelFilters, flashcardSortOptions 
} from '../../../data/mockFlashcardData'; 
import {
  setFlashcardSearchTerm,
  setFlashcardSortBy,
  toggleFlashcardSubject,
  toggleFlashcardLevel,
  clearFlashcardFilters
} from '../../../app/slices/flashcardFilterSlice';
import type { FlashcardSort, FlashcardSubject, FlashcardLevel, FilterOption } from '../../../types/flashcard'; // <-- Đã thêm FilterOption
import { MagnifyingGlassIcon, ChevronDownIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import clsx from 'clsx';

// (Component FilterDropdown giữ nguyên, không đổi)
interface FilterDropdownProps {
  title: string;
  options: FilterOption[];
  selected: string[];
  onToggle: (id: string) => void;
}
const FilterDropdown = ({ title, options, selected, onToggle }: FilterDropdownProps) => (
  <Menu as="div" className="relative inline-block text-left">
    <MenuButton className="inline-flex justify-center items-center gap-2 w-full rounded-md px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none">
      {title}
      <ChevronDownIcon className="w-4 h-4" />
    </MenuButton>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <MenuItems className="absolute z-10 mt-2 w-56 origin-top-left rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="p-1">
          {options.map((opt: FilterOption) => (
            <MenuItem key={opt.id}>
              <button
                onClick={() => onToggle(opt.id)}
                className={clsx(
                  'group flex w-full items-center rounded-md px-3 py-2 text-sm',
                  selected.includes(opt.id) 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
                    : 'text-gray-900 dark:text-gray-200',
                  'data-[hover]:bg-gray-100 dark:data-[hover]:bg-gray-700'
                )}
              >
                {opt.name}
              </button>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Transition>
  </Menu>
);


export const FlashcardToolbarExplore = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.flashcardFilter);
  
  const [localSearch, setLocalSearch] = useState(filters.searchTerm);
  const debouncedSearch = useDebounced(localSearch, 350);

  useEffect(() => { setLocalSearch(filters.searchTerm); }, [filters.searchTerm]);
  useEffect(() => {
    if (debouncedSearch !== filters.searchTerm) {
      dispatch(setFlashcardSearchTerm(debouncedSearch));
    }
  }, [debouncedSearch, filters.searchTerm, dispatch]);

  const hasActiveFilters = filters.subjects.length > 0 || filters.levels.length > 0;

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:flex-1">
          <input
            type="search"
            placeholder="Tìm kiếm bộ thẻ công khai..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
          {/* ▼▼▼ SỬA LỖI TYPO: Đổi 'top-10.' thành 'top-1/2' ▼▼▼ */}
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        
        {/* (Phần còn lại của JSX giữ nguyên) */}
        <div className="flex items-center gap-2">
          <FunnelIcon className="w-5 h-5 text-gray-500" />
          <FilterDropdown
            title="Môn học"
            options={flashcardSubjectFilters}
            selected={filters.subjects}
            onToggle={(id) => dispatch(toggleFlashcardSubject(id as FlashcardSubject))}
          />
          <FilterDropdown
            title="Trình độ"
            options={flashcardLevelFilters}
            selected={filters.levels}
            onToggle={(id) => dispatch(toggleFlashcardLevel(id as FlashcardLevel))}
          />
          {hasActiveFilters && (
            <button 
              onClick={() => dispatch(clearFlashcardFilters())}
              className="inline-flex items-center gap-1.5 p-2 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {/* Sort Dropdown */}
        <div className="w-full md:w-auto">
          <select
            value={filters.sortBy}
            onChange={(e) => dispatch(setFlashcardSortBy(e.target.value as FlashcardSort))}
            className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          >
            {flashcardSortOptions.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};