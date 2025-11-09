// src/pages/courses/components/CourseStickySidebar.tsx
import { Link, useNavigate } from 'react-router-dom'; 
import type { Course } from '../../../types/course';
import { CourseCard } from './CourseCard'; // Tái sử dụng Card
import { allCourses } from '../../../data/mockCourses';
import { 
  CheckCircleIcon, DevicePhoneMobileIcon, CalendarDaysIcon, 
  GiftIcon
} from '@heroicons/react/24/outline';

import { useAppSelector } from '../../../app/hooks';

export const CourseStickySidebar = ({ course }: { course: Course }) => {
  // Lấy state user và các hooks
  const user = useAppSelector(state => state.auth.user);
  const navigate = useNavigate();
  // const location = useLocation(); // Lấy URl hiện tại (ví dụ: /courses/1)

  // Lấy 3 khóa học liên quan đầu tiên
  const relatedCourses = allCourses.filter(c => course.relatedCourseIds?.includes(c.id)).slice(0, 3);
  
  // Tạo hàm xử lí khi bấm nút
  const handleRegisterClick = (isTrial: boolean) => {
    // 1. Tạo URL đích
    // (Nếu là học thử, đi đến trang học. Nếu là đăng ký, đi đến trang checkout)
    const targetUrl = isTrial ? `/course-preview/${course.id}` : `/checkout/${course.id}`;
    
    // (Chúng ta chưa tạo trang "học thử", nên tạm thời gộp chung)
    if (isTrial) {
        alert("Logic 'Học thử' sẽ được thêm sau!");
        return;
    }

    if (user) {
      // 2. Đã đăng nhập: Đi thẳng đến trang thanh toán
      navigate(targetUrl);
    } else {
      // 3. Chưa đăng nhập: Yêu cầu đăng nhập, và GỬI HỌ ĐẾN TRANG THANH TOÁN sau đó
      navigate(`/login?redirect=${targetUrl}`);
    }
  };
  return (
    <div className="sticky top-24 space-y-6">
      {/* Card 1: Giá tiền & CTA */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
        <div className="p-6">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {course.price === 0 ? 'Miễn phí' : `${course.price.toLocaleString('vi-VN')}đ`}
            </span>
            {course.originalPrice && course.price > 0 && (
              <span className="text-lg line-through text-gray-500">
                {course.originalPrice.toLocaleString('vi-VN')}đ
              </span>
            )}
          </div>

          <button 
            onClick={() => handleRegisterClick(false)} // Thêm onClick
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Đăng ký học ngay
          </button>
          
          {course.price > 0 && (
            <button 
              onClick={() => handleRegisterClick(true)} // Thêm onClick
              className="w-full mt-3 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Học thử miễn phí
            </button>
          )}
        </div>
      </div>

      {/* Card 2: Thông tin thêm */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Khóa học này bao gồm:</h3>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          {course.totalLessons && <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-blue-500 mr-2" /> {course.totalLessons} bài học</li>}
          {course.totalPractice && <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-blue-500 mr-2" /> {course.totalPractice} bài tập</li>}
          {course.validityMonths && <li className="flex items-center"><CalendarDaysIcon className="w-5 h-5 text-blue-500 mr-2" /> {course.validityMonths} tháng truy cập</li>}
          <li className="flex items-center"><DevicePhoneMobileIcon className="w-5 h-5 text-blue-500 mr-2" /> Học trên điện thoại & máy tính</li>
          <li className="flex items-center"><GiftIcon className="w-5 h-5 text-blue-500 mr-2" /> Tặng kèm tài liệu độc quyền</li>
        </ul>
      </div>
      
      {/* Tư vấn */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Chưa chắc chắn? <Link to="/contact" className="text-blue-600 font-medium hover:underline">Liên hệ tư vấn</Link>!
      </p>

      {/* Khóa học tương tự */}
      {relatedCourses.length > 0 && (
        <div className="pt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Khóa học tương tự</h3>
          <div className="space-y-4">
            {relatedCourses.map(c => (
              // Tái sử dụng CourseCard, nó sẽ tự động link đến /courses/:id
              <CourseCard key={c.id} course={c} /> 
            ))}
          </div>
        </div>
      )}
    </div>
  );
};