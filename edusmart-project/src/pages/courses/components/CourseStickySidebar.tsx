// src/pages/courses/components/CourseStickySidebar.tsx
import { Link, useNavigate } from 'react-router-dom';
import type { UICourseDetail } from '../../../types/course';
import {
  CheckCircleIcon,
  DevicePhoneMobileIcon,
  CalendarDaysIcon,
  GiftIcon,
} from '@heroicons/react/24/outline';
import { useAppSelector } from '../../../app/hooks';

interface CourseStickySidebarProps {
  course: UICourseDetail;
}

export const CourseStickySidebar = ({ course }: CourseStickySidebarProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleRegisterClick = (isTrial: boolean) => {
    const targetUrl = isTrial
      ? `/course-preview/${course.id}`
      : `/checkout/${course.id}`;

    if (isTrial) {
      alert("Logic 'Học thử' sẽ được thêm sau!");
      return;
    }

    if (user) {
      navigate(targetUrl);
    } else {
      navigate(`/login?redirect=${encodeURIComponent(targetUrl)}`);
    }
  };

  const formattedPrice =
    course.price === 0
      ? 'Miễn phí'
      : `${course.price.toLocaleString('vi-VN')}đ`;

  const formattedOriginal =
    course.originalPrice > course.price
      ? `${course.originalPrice.toLocaleString('vi-VN')}đ`
      : '';

  const totalLessons =
    course.totalLessons ??
    course.curriculum.reduce(
      (sum, section) => sum + section.lessons.length,
      0,
    );

  const validityText = course.validityText ?? 'Truy cập trọn đời';

  return (
    <div className="sticky top-24 space-y-6">
      {/* Card: Giá + CTA */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="h-40 bg-gray-100 dark:bg-gray-900 overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {formattedPrice}
            </span>
            {formattedOriginal && (
              <span className="text-lg line-through text-gray-500">
                {formattedOriginal}
              </span>
            )}
          </div>

          <button
            onClick={() => handleRegisterClick(false)}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Đăng ký học ngay
          </button>

          {course.price > 0 && (
            <button
              onClick={() => handleRegisterClick(true)}
              className="w-full mt-3 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Học thử miễn phí
            </button>
          )}
        </div>
      </div>

      {/* Thông tin thêm */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Khóa học này bao gồm:
        </h3>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
          {totalLessons > 0 && (
            <li className="flex items-center">
              <CheckCircleIcon className="w-5 h-5 text-blue-500 mr-2" />
              {totalLessons} bài học
            </li>
          )}
          {course.totalPractice && (
            <li className="flex items-center">
              <CheckCircleIcon className="w-5 h-5 text-blue-500 mr-2" />
              {course.totalPractice} bài tập
            </li>
          )}
          <li className="flex items-center">
            <CalendarDaysIcon className="w-5 h-5 text-blue-500 mr-2" />
            {validityText}
          </li>
          <li className="flex items-center">
            <DevicePhoneMobileIcon className="w-5 h-5 text-blue-500 mr-2" />
            Học trên điện thoại & máy tính
          </li>
          <li className="flex items-center">
            <GiftIcon className="w-5 h-5 text-blue-500 mr-2" />
            Tặng kèm tài liệu độc quyền
          </li>
        </ul>
      </div>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Chưa chắc chắn?{' '}
        <Link
          to="/contact"
          className="text-blue-600 font-medium hover:underline"
        >
          Liên hệ tư vấn
        </Link>
        !
      </p>
    </div>
  );
};
