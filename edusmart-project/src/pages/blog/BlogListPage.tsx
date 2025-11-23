// // src/pages/blog/BlogListPage.tsx
// import { useState, useMemo, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   allArticles 
// } from '../../data/mockBlogArticles';
// import type { ArticleCategory } from '../../types/blog';

// // Import các component con
// import { BlogFilterSidebar } from './components/BlogFilterSidebar';
// import { BlogSidebarWidgets } from './components/BlogSidebarWidgets';
// import { ArticleCard } from './components/ArticleCard'; 
// import { useDebounced } from '../../hooks/useDebounced';

// const ARTICLES_PER_LOAD = 6;

// export const BlogListPage = () => {
//   // State (giữ nguyên)
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | 'all'>('all');
//   const debouncedSearchTerm = useDebounced(searchTerm, 350);
//   const [articlesToDisplay, setArticlesToDisplay] = useState(ARTICLES_PER_LOAD);

//   // Logic lọc (giữ nguyên)
//   const filteredArticles = useMemo(() => {
//     let articles = [...allArticles];
//     if (debouncedSearchTerm) {
//       const term = debouncedSearchTerm.toLowerCase();
//       articles = articles.filter(article => 
//         article.title.toLowerCase().includes(term) || article.excerpt.toLowerCase().includes(term)
//       );
//     }
//     if (selectedCategory !== 'all') {
//       if (selectedCategory === 'ielts') {
//         articles = articles.filter(article => article.category.startsWith('ielts'));
//       } else if (selectedCategory === 'toeic') {
//          articles = articles.filter(article => article.category.startsWith('toeic'));
//       } else {
//          articles = articles.filter(article => article.category === selectedCategory);
//       }
//     }
//     articles.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
//     return articles;
//   }, [debouncedSearchTerm, selectedCategory]);

//   const displayedArticles = useMemo(() => {
//     return filteredArticles.slice(0, articlesToDisplay);
//   }, [filteredArticles, articlesToDisplay]);

//   const canLoadMore = articlesToDisplay < filteredArticles.length;
//   const handleLoadMore = () => setArticlesToDisplay(prev => prev + ARTICLES_PER_LOAD);

//   useEffect(() => {
//     setArticlesToDisplay(ARTICLES_PER_LOAD);
//   }, [debouncedSearchTerm, selectedCategory]);


//   return (
//     <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
//       {/* Breadcrumb & Hero (Giữ nguyên) */}
//       <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <nav className="text-sm">
//             <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">Trang chủ</Link>
//             <span className="mx-2 text-gray-400 dark:text-gray-500">/</span>
//             <span className="text-gray-700 dark:text-gray-300">Blog</span>
//           </nav>
//         </div>
//       </div>
//       {/* 1. Ảnh Hero (Mới) - Đã sửa */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
//         <div 
//           className="h-64 bg-cover bg-center rounded-lg shadow-sm" // <<< Bỏ w-full, thêm rounded-lg
//           style={{ backgroundImage: "url('https://picsum.photos/seed/bloghero/1500/400')" }} // (Thay ảnh thật)
//         >
//           {/* (Có thể thêm lớp phủ tối) */}
//         </div>
//       </div>

//       {/* Tiêu đề trang */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6"> {/* <<< Sửa pt-8 thành pt-6 */}
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Blog EduSmart</h1>
//         <p className="text-lg text-gray-600 dark:text-gray-400">
//           Cập nhật kiến thức mới nhất, mẹo học tập hiệu quả và tin tức từ cộng đồng.
//         </p>
//       </div>
      
//       {/* ▼▼▼ LAYOUT 3 CỘT ĐÃ SỬA TỶ LỆ (20% / 60% / 20%) ▼▼▼ */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex flex-col lg:flex-row lg:gap-8">
          
//           {/* CỘT TRÁI (BỘ LỌC) - THU HẸP CÒN 20% */}
//           <aside className="w-full lg:w-1/5 mb-8 lg:mb-0">
//             <BlogFilterSidebar 
//               selectedCategory={selectedCategory}
//               onSelectCategory={setSelectedCategory}
//             />
//           </aside>
          
//           {/* CỘT GIỮA (NỘI DUNG CHÍNH) - MỞ RỘNG RA 60% */}
//           <main className="w-full lg:w-3/5">
//             {/* Lưới Bài viết - SỬA THÀNH 3 CỘT */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
//               {/* (Sử dụng 'gap-6' thay vì 'gap-8' để tiết kiệm không gian) */}
//               {displayedArticles.map(article => (
//                 <ArticleCard key={article.id} article={article} />
//               ))}
//             </div>

//             {/* Nút "Tải thêm" */}
//             {canLoadMore && (
//               <div className="text-center">
//                 <button
//                   onClick={handleLoadMore}
//                   className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
//                 >
//                   Tải thêm bài viết
//                 </button>
//               </div>
//             )}
//             {displayedArticles.length === 0 && (
//               <p className="text-center text-gray-600 dark:text-gray-400 text-lg mt-10">
//                 Không tìm thấy bài viết nào phù hợp.
//               </p>
//             )}
//           </main>

//           {/* CỘT PHẢI (WIDGETS) - THU HẸP CÒN 20% */}
//           <aside className="w-full lg:w-1/5">
//             <div className="sticky top-24">
//               <BlogSidebarWidgets 
//                 searchTerm={searchTerm}
//                 onSearchTermChange={setSearchTerm}
//               />
//             </div>
//           </aside>

//         </div>
//       </div>
//       {/* ▲▲▲ KẾT THÚC LAYOUT 3 CỘT ▲▲▲ */}
//     </div>
//   );
// };

// src/pages/blog/BlogListPage.tsx
// src/pages/blog/BlogListPage.tsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { BlogSidebarWidgets } from './components/BlogSidebarWidgets';
import { ArticleCard } from './components/ArticleCard';
import { useDebounced } from '../../hooks/useDebounced';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useAppSelector } from '../../app/hooks';
import { fetchBlogs } from '../../services/blogService';
import type { Article } from '../../types/blog';
import { Spinner } from '../../components/ui/Spinner';

const ARTICLES_PER_PAGE = 6;

export const BlogListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounced(searchTerm, 350);

  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = useAppSelector((state) => state.auth.user);
  const isLoggedIn = !!user;

  // gọi API mỗi khi keyword hoặc currentPage đổi
  useEffect(() => {
    let isMounted = true;

    const loadBlogs = async () => {
      try {
        setError(null);
        setIsLoading(currentPage === 1);
        setIsLoadingMore(currentPage > 1);

        const res = await fetchBlogs({
          keyword: debouncedSearchTerm,
          page: currentPage,
          limit: ARTICLES_PER_PAGE,
        });

        if (!isMounted) {
          return;
        }

        setTotalPages(res.total_pages);

        setArticles((prev) =>
          currentPage === 1 ? res.blogs : [...prev, ...res.blogs]
        );
      } catch (err) {
        if (!isMounted) {
          return;
        }
        setError('Không tải được danh sách blog. Vui lòng thử lại.');
        // eslint-disable-next-line no-console
        console.error(err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setIsLoadingMore(false);
        }
      }
    };

    void loadBlogs();

    return () => {
      isMounted = false;
    };
  }, [debouncedSearchTerm, currentPage]);

  // reset page khi keyword đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  const canLoadMore = currentPage < totalPages;

  const handleLoadMore = () => {
    if (canLoadMore && !isLoadingMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <nav className="text-sm">
            <Link
              to="/"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Trang chủ
            </Link>
            <span className="mx-2 text-gray-400 dark:text-gray-500">/</span>
            <span className="text-gray-700 dark:text-gray-300">Blog</span>
          </nav>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Tổng {totalPages} trang
          </span>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div
          className="h-64 bg-cover bg-center rounded-xl shadow-md overflow-hidden relative"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1533069027836-fa937181a8ce?w=1200&auto=format&fit=crop&q=60")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-900/40 to-transparent" />
          <div className="relative h-full flex flex-col justify-center px-6 sm:px-10 max-w-xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 drop-shadow">
              Blog EduSmart
            </h1>
            <p className="text-sm sm:text-base text-gray-100/90">
              Cập nhật kiến thức, mẹo học tập và câu chuyện từ cộng đồng người
              học.
            </p>
          </div>
        </div>
      </div>

      {/* Layout 2 cột */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* Cột chính */}
          <main className="w-full lg:w-3/4">
            {/* Skeleton khi loading lần đầu */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {Array.from({ length: ARTICLES_PER_PAGE }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 space-y-3"
                  >
                    <div className="h-40 rounded-md bg-gray-200 dark:bg-gray-700" />
                    <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                ))}
              </div>
            )}

            {!isLoading && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>

                {error && (
                  <p className="text-center text-red-500 text-sm mb-4">
                    {error}
                  </p>
                )}

                {articles.length === 0 && !error && (
                  <p className="text-center text-gray-600 dark:text-gray-400 text-lg mt-10">
                    Không tìm thấy bài viết nào phù hợp.
                  </p>
                )}

                {canLoadMore && articles.length > 0 && (
                  <div className="flex justify-center">
                    <button
                      onClick={handleLoadMore}
                      disabled={isLoadingMore}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold text-sm shadow hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                    >
                      {isLoadingMore && <Spinner size="sm" />}
                      <span>
                        {isLoadingMore ? 'Đang tải...' : 'Tải thêm bài viết'}
                      </span>
                    </button>
                  </div>
                )}
              </>
            )}
          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 mt-8 lg:mt-0">
            <div className="sticky top-24 space-y-6">
              {isLoggedIn && (
                <Link
                  to="/blog/create"
                  className="flex items-center justify-center w-full gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-semibold shadow hover:from-blue-700 hover:to-indigo-700 transition-colors"
                >
                  <PlusIcon className="w-5 h-5" />
                  Tạo bài viết mới
                </Link>
              )}

              <BlogSidebarWidgets
                searchTerm={searchTerm}
                onSearchTermChange={setSearchTerm}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
