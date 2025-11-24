// src/pages/courses/components/CourseCard.tsx
import { Link } from 'react-router-dom';
import type { UICourseListItem } from '../../../types/course';
import { StarIcon, UsersIcon } from '@heroicons/react/24/solid';

interface CourseCardProps {
  course: UICourseListItem;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const formattedPrice =
    course.price === 0
      ? 'Miễn phí'
      : `${course.price.toLocaleString('vi-VN')}đ`;

  const formattedOriginal =
    course.originalPrice > course.price
      ? `${course.originalPrice.toLocaleString('vi-VN')}đ`
      : '';

  return (
    <Link
      to={`/courses/${course.id}`}
      className="group block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
    >
      {/* Ảnh */}
      <div className="h-48 overflow-hidden bg-gray-100 dark:bg-gray-900">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Nội dung */}
      <div className="p-4 flex flex-col gap-3">
        {/* Category & Level */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 font-medium">
            {course.category}
          </span>
          <span>{course.level}</span>
        </div>

        <h3
          className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 line-clamp-2"
          title={course.title}
        >
          {course.title}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {course.description}
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {course.author}
        </p>

        {/* Rating + Students */}
        <div className="flex items-center justify-between text-sm mt-1">
          <div className="flex items-center">
            <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
            <span className="text-gray-800 dark:text-gray-200 font-semibold">
              {course.rating.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <UsersIcon className="w-5 h-5 mr-1" />
            <span>{course.students.toLocaleString('vi-VN')}</span>
          </div>
        </div>

        {/* Giá */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {formattedPrice}
          </span>
          {formattedOriginal && (
            <span className="text-sm line-through text-gray-400">
              {formattedOriginal}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
