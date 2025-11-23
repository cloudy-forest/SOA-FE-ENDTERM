// src/pages/blog/BlogEditPage.tsx

import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import Quill from 'quill';
import 'quill/dist/quill.snow.css';

import { Spinner } from '../../components/ui/Spinner';
import { useAppSelector } from '../../app/hooks';
import { getBlogById, createOrUpdateBlog } from '../../services/blogService';
import type { CreateOrUpdateBlogPayload } from '../../services/blogService';
import type { Article } from '../../types/blog';

type BlogFormInputs = {
  title: string;
  subtitle: string;
  keywords: string;
  content: string;
};

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link'],
    ['clean'],
  ],
};

interface BasicUser {
  id?: string | number;
  _id?: string | number;
  user_id?: string | number;
  name?: string;
}

export const BlogEditPage = () => {
  const { id } = useParams<'id'>();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormInputs>();

  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    register('content', { required: 'Nội dung là bắt buộc' });
  }, [register]);

  // khởi tạo editor + nếu đã có article thì set nội dung
  useEffect(() => {
    if (!editorRef.current) return;

    if (!quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: quillModules,
      });

      quillInstance.current.on('text-change', () => {
        if (quillInstance.current) {
          const contentHtml = quillInstance.current.root.innerHTML;
          setValue('content', contentHtml, { shouldValidate: true });
        }
      });
    }

    if (article && quillInstance.current) {
      quillInstance.current.root.innerHTML = article.content;
      setValue('content', article.content, { shouldValidate: false });
    }
  }, [setValue, article]);

  // load blog theo id
  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const numericId = Number(id);
        const blog = await getBlogById(numericId);
        if (isMounted) {
          setArticle(blog ?? null);
          if (blog) {
            setValue('title', blog.title);
            setValue('subtitle', blog.subtitle);
            setValue('keywords', blog.keywords);
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      isMounted = false;
    };
  }, [id, setValue]);

  const onSubmit: SubmitHandler<BlogFormInputs> = async (data) => {
    if (!user || !article) {
      alert('Không xác định được user hoặc bài viết.');
      return;
    }

    const basicUser = user as BasicUser;
    const rawWriterId =
      basicUser.id ?? basicUser._id ?? basicUser.user_id ?? basicUser.name ?? '';

    const payload: CreateOrUpdateBlogPayload = {
      id: article.id,
      title: data.title,
      subtitle: data.subtitle,
      content: data.content,
      keywords: data.keywords,
      writer: String(rawWriterId),
      views: article.views,
    };

    try {
      await createOrUpdateBlog(payload);
      alert('Cập nhật bài viết thành công!');
      navigate(`/blog/${article.id}`);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      alert('Đã xảy ra lỗi khi cập nhật bài viết.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Quay lại Blog
        </Link>
        <p className="text-gray-700 dark:text-gray-300">
          Không tìm thấy bài viết để chỉnh sửa.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <Link
          to={`/blog/${article.id}`}
          className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Quay lại bài viết
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Chỉnh sửa bài viết
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tiêu đề
              </label>
              <input
                {...register('title', { required: 'Tiêu đề là bắt buộc' })}
                className="form-input w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tiêu đề phụ (Subtitle)
              </label>
              <input
                {...register('subtitle', { required: 'Tiêu đề phụ là bắt buộc' })}
                className="form-input w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.subtitle && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.subtitle.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Keywords (phân cách bằng dấu phẩy)
              </label>
              <input
                {...register('keywords')}
                className="form-input w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nội dung chính
            </label>
            <div className="quill-container bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
              <div
                ref={editorRef}
                style={{ minHeight: '320px' }}
                className="prose max-w-none dark:prose-invert"
              />
            </div>
            {errors.content && (
              <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>
            )}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              {isSubmitting ? <Spinner size="sm" /> : 'Lưu thay đổi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
