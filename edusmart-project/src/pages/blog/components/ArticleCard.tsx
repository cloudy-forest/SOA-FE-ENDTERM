// // src/pages/blog/components/ArticleCard.tsx
// import { Link } from 'react-router-dom';
// import type { Article } from '../../../types/blog';
// import { UserIcon, CalendarDaysIcon, ClockIcon, EyeIcon } from '@heroicons/react/24/outline';

// interface ArticleCardProps {
//   article: Article;
// }

// export const ArticleCard = ({ article }: ArticleCardProps) => {
//   const publishDate = new Date(article.publishDate).toLocaleDateString('vi-VN', {
//     year: 'numeric', month: 'long', day: 'numeric'
//   });

//   return (
//     <Link 
//       to={`/blog/${article.slug}`} // Link đến trang chi tiết bài viết
//       className="block bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
//     >
//       {/* Thumbnail */}
//       <img 
//         src={article.thumbnail} 
//         alt={article.title} 
//         className="w-full h-48 object-cover object-center" 
//       />
      
//       <div className="p-5">
//         {/* Category */}
//         <span className="inline-block text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full mb-3">
//           {article.category.replace(/-/g, ' ').toUpperCase()}
//         </span>

//         {/* Title */}
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
//           {article.title}
//         </h3>
        
//         {/* Excerpt */}
//         <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
//           {article.excerpt}
//         </p>

//         {/* Meta Info */}
//         <div className="flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400 gap-x-4 gap-y-2">
//           <span className="flex items-center">
//             <UserIcon className="w-4 h-4 mr-1.5" />
//             {article.author}
//           </span>
//           <span className="flex items-center">
//             <CalendarDaysIcon className="w-4 h-4 mr-1.5" />
//             {publishDate}
//           </span>
//           <span className="flex items-center">
//             <ClockIcon className="w-4 h-4 mr-1.5" />
//             {article.readTimeMinutes} phút đọc
//           </span>
//            <span className="flex items-center">
//             <EyeIcon className="w-4 h-4 mr-1.5" />
//             {article.views}
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// };

// src/pages/blog/components/ArticleCard.tsx

import { Link } from 'react-router-dom';
import type { FC } from 'react';
import type { Article } from '../../../types/blog';

interface ArticleCardProps {
  article: Article;
}

const stripHtml = (html: string): string =>
  html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

export const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  const previewText = stripHtml(article.content).slice(0, 140);

  const keywordList = article.keywords
    .split(',')
    .map((k) => k.trim())
    .filter((k) => k.length > 0)
    .slice(0, 3);

  const createdAtText = article.publishDate
    ? new Date(article.publishDate).toLocaleDateString()
    : '';

  return (
    <Link
      to={`/blog/${article.id}`}
      className="group h-full flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="h-40 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 relative">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-white" />
        <div className="absolute bottom-3 left-4 text-xs text-white/90 font-medium uppercase tracking-wide">
          Blog EduSmart
        </div>
      </div>

      <div className="flex-1 flex flex-col px-4 py-3">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {article.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 line-clamp-1">
          {article.subtitle}
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-3">
          {previewText}
          {previewText.length === 140 && '...'}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {keywordList.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
              >
                #{kw}
              </span>
            ))}
          </div>
          <div className="text-[10px] text-gray-400 dark:text-gray-500 text-right">
            {createdAtText && <div>{createdAtText}</div>}
            <div>{article.views} lượt xem</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
