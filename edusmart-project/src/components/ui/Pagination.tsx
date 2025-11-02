// src/components/ui/Pagination.tsx
import clsx from 'clsx';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  // Nút về trang 1 và "..."
  if (startPage > 1) {
    pageNumbers.push(1);
    if (startPage > 2) pageNumbers.push(-1); // -1 là dấu ...
  }
  // Các trang ở giữa
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  // Nút về trang cuối và "..."
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) pageNumbers.push(-1);
    pageNumbers.push(totalPages);
  }

  const baseClass = "flex items-center justify-center min-w-[36px] h-9 px-3 py-1 text-sm font-medium rounded-lg transition-colors";
  const btnClass = "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700";
  const activeClass = "bg-blue-600 text-white border-blue-600 pointer-events-none";
  const disabledClass = "opacity-50 cursor-not-allowed";
  const dotsClass = "text-gray-500 dark:text-gray-400";

  return (
    <nav className="flex justify-center items-center space-x-2" aria-label="Phân trang">
      {/* Nút Trước */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={clsx(baseClass, btnClass, currentPage === 1 && disabledClass)}
      >
        <ChevronLeftIcon className="w-4 h-4" />
        <span className="hidden sm:inline ml-1">Trước</span>
      </button>

      {/* Các nút số */}
      {pageNumbers.map((page, index) =>
        page === -1 ? (
          <span key={`dots-${index}`} className={clsx(baseClass, dotsClass)}>...</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={clsx(
              baseClass,
              page === currentPage ? activeClass : btnClass
            )}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        )
      )}

      {/* Nút Sau */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={clsx(baseClass, btnClass, currentPage === totalPages && disabledClass)}
      >
        <span className="hidden sm:inline mr-1">Sau</span>
        <ChevronRightIcon className="w-4 h-4" />
      </button>
    </nav>
  );
};