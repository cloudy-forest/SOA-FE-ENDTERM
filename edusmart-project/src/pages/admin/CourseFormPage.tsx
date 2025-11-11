// src/pages/admin/CourseFormPage.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { Course } from '../../types/course';
import { fetchCourseById, createCourse, updateCourse } from '../../services/adminService';
import { Spinner } from '../../components/ui/Spinner';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// Định nghĩa các trường trong form
type CourseFormInputs = {
  title: string;
  subject: string;
  price: number;
  originalPrice: number;
  totalLessons: number;
  description: string;
};

export const CourseFormPage = () => {
  const { courseId } = useParams<{ courseId: string }>(); // Lấy ID từ URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Kiểm tra xem đây là trang "Sửa" hay "Tạo mới"
  const isEditMode = Boolean(courseId);

  // react-hook-form
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CourseFormInputs>();

  // Nếu là "Sửa", tải data khóa học và điền vào form
  useEffect(() => {
    if (isEditMode && courseId) {
      setLoading(true);
      fetchCourseById(courseId)
        .then(course => {
          // Điền dữ liệu vào form
          setValue('title', course.title);
          setValue('subject', course.subject);
          setValue('price', course.price);
          setValue('originalPrice', course.originalPrice || 0);
          setValue('totalLessons', course.totalLessons || 0);
          setValue('description', course.description || '');
        })
        .catch((err: unknown) => {
            if (err instanceof Error) {alert(`Lỗi tải dữ liệu: ${err.message}`);
            } else {
                alert('Lỗi tải dữ liệu khóa học.');
            }
        })
        .finally(() => setLoading(false));
    }
  }, [courseId, isEditMode, setValue]);

  // Xử lý khi bấm nút "Lưu"
  const onSubmit: SubmitHandler<CourseFormInputs> = async (data) => {
    setLoading(true);
    try {
      const apiData = {
        ...data,
        price: Number(data.price), // Đảm bảo là số
        originalPrice: Number(data.originalPrice),
        totalLessons: Number(data.totalLessons),
        // (Thêm các trường mock khác nếu API của bạn yêu cầu)
        image: 'https://via.placeholder.com/400x200', 
        instructor: 'Admin',
      };

      if (isEditMode && courseId) {
        // --- CHẾ ĐỘ SỬA ---
        await updateCourse(courseId, apiData);
      } else {
        // --- CHẾ ĐỘ TẠO MỚI ---
        await createCourse(apiData as Omit<Course, 'id'>);
      }
      
      alert(`Đã ${isEditMode ? 'cập nhật' : 'tạo mới'} khóa học thành công!`);
      navigate('/admin/courses'); // Quay về trang danh sách

    } catch (err: unknown) {
      if (err instanceof Error) alert(`Lỗi: ${err.message}`);
      else alert('Lỗi không xác định.');
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return <div className="flex justify-center p-12"><Spinner /></div>;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {isEditMode ? 'Cập nhật Khóa học' : 'Tạo Khóa học mới'}
        </h2>
        <button onClick={() => navigate('/admin/courses')} className="text-sm text-blue-600 flex items-center mt-1">
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Quay lại danh sách
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
        {/* Tiêu đề */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề Khóa học</label>
          <input 
            {...register('title', { required: 'Tiêu đề là bắt buộc' })}
            className="form-input" 
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>

        {/* Chủ đề */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Chủ đề</label>
          <select {...register('subject', { required: true })} className="form-input">
            <option value="math">Toán</option>
            <option value="physics">Lý</option>
            <option value="chemistry">Hóa</option>
            <option value="english">Tiếng Anh</option>
            <option value="ielts">IELTS</option>
            <option value="toeic">TOEIC</option>
          </select>
        </div>

        {/* Giá */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Giá bán (VNĐ)</label>
            <input 
              {...register('price', { required: true, valueAsNumber: true })}
              type="number"
              className="form-input" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Giá gốc (VNĐ)</label>
            <input 
              {...register('originalPrice', { valueAsNumber: true })}
              type="number"
              className="form-input" 
            />
          </div>
        </div>

        {/* Số bài học */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tổng số bài học</label>
          <input 
            {...register('totalLessons', { required: true, valueAsNumber: true })}
            type="number"
            className="form-input" 
          />
        </div>

        {/* Mô tả */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
          <textarea 
            {...register('description')}
            rows={5}
            className="form-input" 
          />
        </div>
        
        {/* Nút Lưu */}
        <div className="pt-4">
          <button 
            type="submit" 
            disabled={loading}
            className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            {loading ? <Spinner size="sm" /> : (isEditMode ? 'Lưu Cập nhật' : 'Tạo Khóa học')}
          </button>
        </div>
      </form>
    </div>
  );
};