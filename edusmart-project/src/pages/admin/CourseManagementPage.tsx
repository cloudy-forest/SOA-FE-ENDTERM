// src/pages/admin/CourseManagementPage.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Course } from '../../types/course';
import { fetchAllCourses, deleteCourse } from '../../services/adminService';
import { Spinner } from '../../components/ui/Spinner';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export const CourseManagementPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hàm tải data
  const loadCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllCourses();
      setCourses(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Lỗi không xác định khi tải khóa học.');
    } finally {
      setLoading(false);
    }
  };

  // Tải data khi component mount
  useEffect(() => {
    loadCourses();
  }, []);

  // Hàm Xóa
  const handleDelete = async (courseId: string) => {
    const course = courses.find(c => c.id === parseInt(courseId));
    if (!course) return;
    
    if (window.confirm(`Bạn có chắc muốn xóa khóa học "${course.title}"?`)) {
      try {
        await deleteCourse(courseId);
        // Tải lại danh sách sau khi xóa
        loadCourses(); 
      } catch (err: unknown) {
        if (err instanceof Error) alert(`Lỗi: ${err.message}`);
        else alert('Lỗi không xác định khi xóa.');
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Spinner /></div>;
  }
  
  if (error) {
    return <div className="text-red-500 p-6">{error}</div>;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Quản lý Khóa học ({courses.length})</h2>
        <Link 
          to="new" // Link tới trang Form (sẽ tạo ở bước 3)
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Thêm khóa học mới
        </Link>
      </div>
      
      {/* Bảng */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chủ đề</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số bài học</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map(course => (
              <tr key={course.id} className="table-row">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{course.title}</div>
                  <div className="text-sm text-gray-500">ID: {course.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 capitalize">{course.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {course.price === 0 ? 'Miễn phí' : `${course.price.toLocaleString('vi-VN')}đ`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{course.totalLessons}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link 
                    to={`edit/${course.id}`} // Link tới trang Sửa
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    <PencilIcon className="w-5 h-5 inline" />
                  </Link>
                  <button 
                    onClick={() => handleDelete(String(course.id))}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="w-5 h-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};