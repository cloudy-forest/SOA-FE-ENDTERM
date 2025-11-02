// src/components/ui/FilterChip.tsx
import { XMarkIcon } from '@heroicons/react/24/solid';

interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

export const FilterChip = ({ label, onRemove }: FilterChipProps) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 dark:text-blue-200 dark:bg-blue-900/50 rounded-full">
    {label}
    <button
      onClick={onRemove}
      className="p-0.5 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
      aria-label={`Xóa bộ lọc ${label}`}
    >
      <XMarkIcon className="w-4 h-4" />
    </button>
  </span>
);