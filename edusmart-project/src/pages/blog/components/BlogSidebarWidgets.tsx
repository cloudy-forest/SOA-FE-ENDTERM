// src/pages/blog/components/BlogSidebarWidgets.tsx

import type { FC, ChangeEvent } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { allArticles } from '../../../data/mockBlogArticles';

interface BlogSidebarWidgetsProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
}

export const BlogSidebarWidgets: FC<BlogSidebarWidgetsProps> = ({
  searchTerm,
  onSearchTermChange,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(e.target.value);
  };

  const popularArticles = [...allArticles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Search */}
      <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Tìm kiếm bài viết
        </h3>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Nhập từ khóa..."
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 px-9 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500"
          />
          <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
        </div>
      </section>

      {/* Popular */}
      <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
          Bài viết nổi bật
        </h3>
        <ul className="space-y-3">
          {popularArticles.map((blog) => (
            <li key={blog.id} className="text-xs">
              <Link
                to={`/blog/${blog.id}`}
                className="block text-gray-800 dark:text-gray-100 font-medium leading-snug hover:text-blue-600 dark:hover:text-blue-400"
              >
                {blog.title}
              </Link>
              <div className="text-[10px] text-gray-500 dark:text-gray-400">
                {blog.views} lượt xem
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
