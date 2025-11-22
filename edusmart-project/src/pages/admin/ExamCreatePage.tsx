// src/pages/admin/ExamCreatePage.tsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { fetchAllSubjects, createExam } from '../../services/adminService';
import type { Subject, CreateExamInput } from '../../types/admin';
import { Spinner } from '../../components/ui/Spinner';
import { ArrowLeftIcon, PhotoIcon } from '@heroicons/react/24/outline';

export const ExamCreatePage = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form setup
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateExamInput>({
    defaultValues: {
      completed: false,
      number_of_completion: 0,
      part: 1,
      total_score: 100,
      time: 60,
      exam_type: 'READING'
    }
  });

  // Tải danh sách Category (Subject) để chọn
  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const data = await fetchAllSubjects();
        setSubjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadSubjects();
  }, []);

  const onSubmit: SubmitHandler<CreateExamInput> = async (data) => {
    try {
      // Lưu ý: data.thumbnail từ react-hook-form trả về FileList
      // Cần lấy file đầu tiên nếu có
      const file = (data.thumbnail as unknown as FileList)[0];
      
      await createExam({
        ...data,
        thumbnail: file || null
      });
      
      alert('Tạo đề thi thành công!');
      navigate('/admin/exams'); // Quay về danh sách
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra khi tạo đề thi.');
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Spinner /></div>;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link to="/admin/exams" className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-2">
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Quay lại danh sách
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Tạo đề thi mới</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl border border-gray-200 p-6 space-y-6 shadow-sm">
        
        {/* --- Hàng 1: Tiêu đề & Loại --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề đề thi *</label>
            <input 
              {...register('title', { required: 'Vui lòng nhập tiêu đề' })}
              className="form-input w-full" 
              placeholder="Ví dụ: IELTS Reading Test 1"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loại bài thi *</label>
            <select {...register('exam_type')} className="form-input w-full">
              <option value="READING">READING</option>
              <option value="LISTENING">LISTENING</option>
              <option value="WRITING">WRITING</option>
              <option value="SPEAKING">SPEAKING</option>
            </select>
          </div>
        </div>

        {/* --- Hàng 2: Category & Term --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục (Category) *</label>
            <select 
              {...register('category_id', { required: 'Vui lòng chọn danh mục' })} 
              className="form-input w-full"
            >
              <option value="">-- Chọn danh mục --</option>
              {subjects.map(sub => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
            {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Học kỳ / Term *</label>
            <input 
              {...register('term', { required: 'Vui lòng nhập Term' })}
              className="form-input w-full"
              placeholder="Ví dụ: Spring 2025"
            />
            {errors.term && <p className="text-red-500 text-xs mt-1">{errors.term.message}</p>}
          </div>
        </div>

        {/* --- Hàng 3: Thông tin mô tả --- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Thông tin mô tả (Info) *</label>
          <textarea 
            {...register('info', { required: 'Vui lòng nhập mô tả' })}
            rows={3}
            className="form-input w-full"
            placeholder="Mô tả ngắn về đề thi..."
          />
          {errors.info && <p className="text-red-500 text-xs mt-1">{errors.info.message}</p>}
        </div>

        {/* --- Hàng 4: Các chỉ số (Time, Part, Score, Question) --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian (phút)</label>
            <input type="number" {...register('time', { valueAsNumber: true })} className="form-input w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số phần (Part)</label>
            <input type="number" {...register('part', { valueAsNumber: true })} className="form-input w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tổng điểm</label>
            <input type="number" {...register('total_score', { valueAsNumber: true })} className="form-input w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số câu hỏi</label>
            <input type="number" {...register('number_of_question', { valueAsNumber: true })} className="form-input w-full" />
          </div>
        </div>

        {/* --- Hàng 5: Upload Ảnh (Thumbnail) --- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh bìa (Thumbnail)</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors">
            <div className="space-y-1 text-center">
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                  <span>Upload một file</span>
                  <input 
                    type="file" 
                    className="sr-only" 
                    accept="image/*"
                    {...register('thumbnail')} 
                  />
                </label>
                <p className="pl-1">hoặc kéo thả vào đây</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, SVG up to 5MB</p>
            </div>
          </div>
        </div>

        {/* Nút Submit */}
        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {isSubmitting ? <Spinner size="sm" className="text-white" /> : 'Tạo đề thi'}
          </button>
        </div>

      </form>
    </div>
  );
};