// src/pages/blog/components/ArticleCard.tsx
import { Link } from 'react-router-dom';
import type { Article } from '../../../types/blog';
import { UserIcon, CalendarDaysIcon, ClockIcon, EyeIcon } from '@heroicons/react/24/outline';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const publishDate = new Date(article.publishDate).toLocaleDateString('vi-VN', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <Link 
      to={`/blog/${article.slug}`} // Link đến trang chi tiết bài viết
      className="block bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
    >
      {/* Thumbnail */}
      <img 
        src={article.thumbnail} 
        alt={article.title} 
        className="w-full h-48 object-cover object-center" 
      />
      
      <div className="p-5">
        {/* Category */}
        <span className="inline-block text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full mb-3">
          {article.category.replace(/-/g, ' ').toUpperCase()}
        </span>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {article.title}
        </h3>
        
        {/* Excerpt */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400 gap-x-4 gap-y-2">
          <span className="flex items-center">
            <UserIcon className="w-4 h-4 mr-1.5" />
            {article.author}
          </span>
          <span className="flex items-center">
            <CalendarDaysIcon className="w-4 h-4 mr-1.5" />
            {publishDate}
          </span>
          <span className="flex items-center">
            <ClockIcon className="w-4 h-4 mr-1.5" />
            {article.readTimeMinutes} phút đọc
          </span>
           <span className="flex items-center">
            <EyeIcon className="w-4 h-4 mr-1.5" />
            {article.views}
          </span>
        </div>
      </div>
    </Link>
  );
};