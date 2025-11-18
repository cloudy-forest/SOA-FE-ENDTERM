// // src/pages/blog/components/BlogSidebarWidgets.tsx
// import { Link } from 'react-router-dom';
// import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
// import { mockSidebarLinks, mockSidebarReviews } from '../../../data/mockBlogArticles';

// interface BlogSidebarWidgetsProps {
//   searchTerm: string;
//   onSearchTermChange: (term: string) => void;
// }

// export const BlogSidebarWidgets = ({ searchTerm, onSearchTermChange }: BlogSidebarWidgetsProps) => {
//   return (
//     <div className="space-y-8">
//       {/* 1. Thanh Tìm kiếm */}
//       <div>
//         <div className="relative">
//           <input
//             type="search"
//             placeholder="Tìm kiếm bài viết..."
//             value={searchTerm}
//             onChange={(e) => onSearchTermChange(e.target.value)}
//             className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
//           />
//           <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//         </div>
//       </div>

//       {/* 2. Tìm hiểu thêm */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
//         <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
//           Tìm hiểu thêm
//         </h3>
//         <ul className="space-y-3">
//           {mockSidebarLinks.map((link) => (
//             <li key={link.name}>
//               <Link to={link.url} className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
//                 {link.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* 3. Review của học viên */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
//         <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
//           Review học viên
//         </h3>
//         <ul className="space-y-3">
//           {mockSidebarReviews.map((review) => (
//             <li key={review.id}>
//               <Link to={review.url} className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2">
//                 {review.title}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* 4. Quảng cáo */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
//         <Link to="/flashcards">
//           <img src="https://via.placeholder.com/300x200.png?text=Flashcards+CTA" alt="Flashcards" className="rounded-md mb-2" />
//           <h4 className="font-semibold text-gray-900 dark:text-white">Học từ vựng với Flashcards</h4>
//           <p className="text-sm text-gray-600 dark:text-gray-400">Học nhanh, nhớ lâu. Thử ngay!</p>
//         </Link>
//       </div>
//     </div>
//   );
// };

// src/pages/blog/components/BlogSidebarWidgets.tsx
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

interface BlogSidebarWidgetsProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

export const BlogSidebarWidgets = ({ searchTerm, onSearchTermChange }: BlogSidebarWidgetsProps) => {
  return (
    <div className="space-y-8">
      {/* 1. Thanh Tìm kiếm (Khớp với APIDocs) */}
      <div>
        <label htmlFor="blog-search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Tìm bài viết
        </label>
        <div className="relative">
          <input
            id="blog-search"
            type="search"
            placeholder="Từ khóa..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>
      
      {/* (Các widget khác đã bị xóa vì không khớp APIDocs) */}
    </div>
  );
};