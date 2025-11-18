// src/pages/blog/BlogWritePage.tsx
import { useEffect, useRef } from 'react'; // <<< Thêm useRef
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useAppSelector } from '../../app/hooks';
import { createArticle } from '../../services/blogService';
import { Spinner } from '../../components/ui/Spinner';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// ▼▼▼ 1. IMPORT "Quill" (THƯ VIỆN GỐC) ▼▼▼
import Quill from 'quill';

// (Xóa bỏ "ReactQuill" và "eslint-disable")

// (Các trường trong form giữ nguyên)
type BlogFormInputs = {
  title: string;
  subtitle: string;
  keywords: string;
  content: string;
};

// Cấu hình thanh công cụ (giữ nguyên)
const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link'], 
    ['clean']
  ],
};

export const BlogWritePage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = 
    useForm<BlogFormInputs>();
  
  const user = useAppSelector(state => state.auth.user);
  
  // ▼▼▼ 2. TẠO REF ĐỂ "BẮT" LẤY EDITOR ▼▼▼
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill | null>(null);

  // 3. Đăng ký thủ công trường 'content' (giữ nguyên)
  useEffect(() => {
    register('content', { required: 'Nội dung là bắt buộc' });
  }, [register]);

  // ▼▼▼ 4. KHỞI TẠO QUILL BẰNG TAY (useEffect) ▼▼▼
  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      // Khởi tạo Quill trên <div ref={editorRef}>
      quillInstance.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: quillModules,
      });
      
      // Lắng nghe sự kiện "text-change"
      quillInstance.current.on('text-change', () => {
        if (quillInstance.current) {
          const content = quillInstance.current.root.innerHTML;
          // Cập nhật giá trị vào React Hook Form
          setValue('content', content, { shouldValidate: true });
        }
      });
    }
  }, [setValue]); // Chỉ chạy 1 lần

  const onSubmit: SubmitHandler<BlogFormInputs> = async (data) => {
    if (!user) {
      alert("Bạn phải đăng nhập để thực hiện việc này.");
      return;
    }
    
    try {
      // (Data đã được 'setValue' ở trên)
      const apiData = { ...data, writer: user.name };
      await createArticle(apiData);
      alert('Đăng bài thành công!');
      navigate('/blog'); 
    } catch (err) {
      console.error(err);
      alert('Đã xảy ra lỗi khi đăng bài.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline mb-4">
        <ArrowLeftIcon className="w-4 h-4" />
        Quay lại trang Blog
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Tạo bài viết mới</h1>
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 space-y-6"
      >
        {/* (Tiêu đề, Tiêu đề phụ, Keywords... giữ nguyên) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tiêu đề</label>
          <input {...register('title', { required: 'Tiêu đề là bắt buộc' })} className="form-input" />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tiêu đề phụ (Subtitle)</label>
          <input {...register('subtitle', { required: 'Tiêu đề phụ là bắt buộc' })} className="form-input" />
          {errors.subtitle && <p className="text-red-500 text-xs mt-1">{errors.subtitle.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Keywords (phân cách bằng dấu phẩy)</label>
          <input {...register('keywords')} className="form-input" placeholder="ielts, speaking, tips" />
        </div>

        {/* ▼▼▼ 5. THAY THẾ <ReactQuill> BẰNG <div ref> ▼▼▼ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nội dung chính</label>
          <div className="quill-container bg-white dark:bg-gray-900">
            {/* Đây là nơi Quill sẽ "vẽ" editor vào */}
            <div ref={editorRef} style={{ minHeight: '300px' }} />
          </div>
          {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
        </div>
        {/* ▲▲▲ HẾT SỬA LỖI ▲▲▲ */}

        <div className="pt-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            {isSubmitting ? <Spinner size="sm" /> : 'Đăng bài viết'}
          </button>
        </div>
      </form>
    </div>
  );
};