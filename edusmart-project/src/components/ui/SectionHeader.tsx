// src/components/ui/SectionHeader.tsx
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

interface SectionHeaderProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
}

export const SectionHeader = ({ title, isOpen, onToggle }: SectionHeaderProps) => (
  <button
    onClick={onToggle}
    className="w-full flex justify-between items-center py-3 text-left font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700"
    aria-expanded={isOpen}
  >
    <span>{title}</span>
    <ChevronUpIcon
      className={clsx(
        'w-5 h-5 transition-transform duration-200',
        !isOpen && 'transform rotate-180'
      )}
    />
  </button>
);