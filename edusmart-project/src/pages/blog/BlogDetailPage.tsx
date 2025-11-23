// src/pages/blog/BlogDetailPage.tsx

import { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

import { Spinner } from '../../components/ui/Spinner';
import type { Article } from '../../types/blog';
import { getBlogById, deleteBlog } from '../../services/blogService';
import { useAppSelector } from '../../app/hooks';

interface BasicUser {
  id?: string | number;
  _id?: string | number;
  user_id?: string | number;
  name?: string;
}

export const BlogDetailPage = () => {
  const { id } = useParams<'id'>();
  const navigate = useNavigate();

  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const user = useAppSelector((state) => state.auth.user);
  const isLoggedIn = !!user;
  const basicUser: BasicUser | null = (user ?? null) as BasicUser | null;

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
          setArticle(blog);
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
  }, [id]);

  const canEditOrDelete = useMemo(() => {
    if (!article || !basicUser) return false;
    const writerIdStr = String(article.writer);
    const currentId =
      basicUser.id ?? basicUser._id ?? basicUser.user_id ?? basicUser.name;
    return currentId != null && String(currentId) === writerIdStr;
  }, [article, basicUser]);

  const handleDelete = async () => {
    if (!article) return;
    const confirmDelete = window.confirm(
      'Bạn có chắc chắn muốn xóa bài viết này?'
    );
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      await deleteBlog(article.id);
      alert('Đã xóa bài viết.');
      navigate('/blog');
    } finally {
      setIsDeleting(false);
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
          Quay lại trang Blog
        </Link>
        <p className="text-gray-700 dark:text-gray-300">
          Không tìm thấy bài viết.
        </p>
      </div>
    );
  }

  const createdAtText = article.publishDate
    ? new Date(article.publishDate).toLocaleString()
    : '';

  const keywordList = article.keywords
    .split(',')
    .map((k) => k.trim())
    .filter((k) => k.length > 0);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Quay lại Blog
          </Link>

          {isLoggedIn && canEditOrDelete && (
            <div className="flex items-center gap-2">
              <Link
                to={`/blog/${article.id}/edit`}
                className="inline-flex items-center gap-1 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <PencilSquareIcon className="w-4 h-4" />
                Sửa
              </Link>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-1 rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700 disabled:bg-red-400"
              >
                <TrashIcon className="w-4 h-4" />
                {isDeleting ? 'Đang xóa...' : 'Xóa'}
              </button>
            </div>
          )}
        </div>

        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {article.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-3">
            {article.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span>Người viết: {article.writer}</span>
            {createdAtText && (
              <>
                <span className="w-1 h-1 rounded-full bg-gray-400" />
                <span>{createdAtText}</span>
              </>
            )}
            <span className="w-1 h-1 rounded-full bg-gray-400" />
            <span>{article.views} lượt xem</span>
          </div>

          {keywordList.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {keywordList.map((kw) => (
                <span
                  key={kw}
                  className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                >
                  #{kw}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-6" />

        <article
          className="prose max-w-none lg:prose-lg dark:prose-invert prose-img:rounded-lg prose-img:shadow"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  );
};
