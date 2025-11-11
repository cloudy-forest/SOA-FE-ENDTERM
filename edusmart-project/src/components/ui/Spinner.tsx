// src/components/ui/Spinner.tsx
import clsx from 'clsx';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'; // Cho phép tùy chỉnh kích thước
}

export const Spinner = ({ size = 'md' }: SpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div
      className={clsx(
        'rounded-full animate-spin',
        'border-blue-500 border-r-transparent', // Màu
        sizeClasses[size] // Kích thước
      )}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};