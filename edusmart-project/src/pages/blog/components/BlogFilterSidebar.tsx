// // src/pages/blog/components/BlogFilterSidebar.tsx
// import { mockBlogFilterCategories } from '../../../data/mockBlogArticles';
// import type { ArticleCategory } from '../../../types/blog';

// interface BlogFilterSidebarProps {
//   selectedCategory: ArticleCategory | 'all';
//   onSelectCategory: (category: ArticleCategory | 'all') => void;
// }

// export const BlogFilterSidebar = ({ selectedCategory, onSelectCategory }: BlogFilterSidebarProps) => {
//   return (
//     // Lớp "sticky" vẫn giữ nguyên
//     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 sticky top-24">
//       <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
//         Chuyên mục
//       </h3>
//       <div className="space-y-4"> {/* Tăng khoảng cách giữa các nhóm */}
        
//         {/* Nút "Tất cả" */}
//         <div>
//           <button
//             onClick={() => onSelectCategory('all')}
//             className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
//               selectedCategory === 'all'
//                 ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
//                 : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
//             }`}
//           >
//             Tất cả bài viết
//           </button>
//         </div>

//         {/* ▼▼▼ BỎ LOGIC DISCLOSURE (THU GỌN) ▼▼▼ */}
//         {/* Lặp qua các danh mục chính */}
//         {mockBlogFilterCategories.map((mainCategory) => (
//           <div key={mainCategory.name}>
//             {/* Hiển thị tên danh mục chính (không bấm được) */}
//             <h4 className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//               {mainCategory.name}
//             </h4>
            
//             {/* Hiển thị luôn danh sách mục con */}
//             <div className="space-y-1">
//               {mainCategory.subCategories.map((sub) => (
//                 <button
//                   key={sub.id}
//                   onClick={() => onSelectCategory(sub.id as ArticleCategory)}
//                   // Thêm padding-left để thụt vào
//                   className={`w-full text-left pl-4 pr-2 py-2 rounded-md text-sm ${
//                     selectedCategory === sub.id
//                       ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
//                       : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
//                   }`}
//                 >
//                   {sub.name}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ))}
//         {/* ▲▲▲ KẾT THÚC THAY ĐỔI ▲▲▲ */}

//       </div>
//     </div>
//   );
// };