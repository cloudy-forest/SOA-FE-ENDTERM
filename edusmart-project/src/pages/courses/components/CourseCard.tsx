// src/pages/courses/components/CourseCard.tsx
import { Link } from 'react-router-dom';
import type { Course } from '../../../types/course';
import { StarIcon, UsersIcon } from '@heroicons/react/24/solid'; // Dùng 24/solid cho đẹp

interface CourseCardProps {
    course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
    // Định dạng giá tiền
    const formattedPrice = course.price === 0 
        ? 'Miễn phí' 
        : `${course.price.toLocaleString('vi-VN')}đ`;

    return (
        <Link 
            // Sửa link sau này, tạm thời là #
            to={`/courses/${course.id}`} 
            className="group block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
            {/* Ảnh */}
            <div className="h-48 overflow-hidden">
                <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                />
            </div>
            
            {/* Nội dung */}
            <div className="p-4 flex flex-col h-[calc(100%-12rem)]">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 truncate" title={course.title}>
                    {course.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{course.instructor}</p>
                
                {/* Rating và Học viên */}
                <div className="flex items-center mt-3 text-sm">
                    <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
                    <span className="text-gray-700 dark:text-gray-300 font-bold">{course.rating.toFixed(1)}</span>
                    <UsersIcon className="w-5 h-5 text-gray-400 ml-4 mr-1" />
                    <span className="text-gray-500 dark:text-gray-400">{course.students}</span>
                </div>
                
                {/* Giá (đẩy xuống dưới cùng) */}
                <div className="mt-auto pt-4">
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        {formattedPrice}
                    </span>
                </div>
            </div>
        </Link>
    );
};