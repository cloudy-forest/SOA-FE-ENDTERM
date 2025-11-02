// src/pages/blog/BlogListPage.tsx
import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { FunnelIcon, UserIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { 
  allArticles, articleCategories, articleSortOptions 
} from '../../data/mockBlogArticles';
import type { ArticleCategory, ArticleSort } from '../../types/blog';
import { ArticleCard } from './components/ArticleCard'; // Import ArticleCard

const ARTICLES_PER_LOAD = 6; // Số bài viết tải mỗi lần bấm "Tải thêm"

// Component Dropdown Lọc
interface FilterDropdownProps {
  title: string;
  options: { id: string; name: string }[];
  selected: string;
  onSelect: (id: string) => void;
}
const FilterDropdown = ({ title, options, selected, onSelect }: FilterDropdownProps) => (
  <Menu as="div" className="relative inline-block text-left">
    <MenuButton className="inline-flex justify-center items-center gap-2 w-full rounded-md px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none">
      {options.find(o => o.id === selected)?.name || title}
      <ChevronDownIcon className="w-4 h-4" />
    </MenuButton>
    <Transition
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <MenuItems className="absolute z-10 mt-2 w-56 origin-top-left rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="p-1">
          {options.map((opt: { id: string; name: string }) => (
            <MenuItem key={opt.id}>
              <button
                onClick={() => onSelect(opt.id)}
                className={clsx(
                  'group flex w-full items-center rounded-md px-3 py-2 text-sm',
                  opt.id === selected 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
                    : 'text-gray-900 dark:text-gray-200',
                  'data-[hover]:bg-gray-100 dark:data-[hover]:bg-gray-700'
                )}
              >
                {opt.name}
              </button>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Transition>
  </Menu>
);


export const BlogListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<ArticleSort>('newest');
  const [articlesToDisplay, setArticlesToDisplay] = useState(ARTICLES_PER_LOAD); // Quản lý số bài hiển thị

  const filteredAndSortedArticles = useMemo(() => {
    let articles = [...allArticles];

    // Lọc theo tìm kiếm
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      articles = articles.filter(article => 
        article.title.toLowerCase().includes(term) || article.excerpt.toLowerCase().includes(term)
      );
    }

    // Lọc theo danh mục
    if (selectedCategory !== 'all') {
      articles = articles.filter(article => article.category === selectedCategory);
    }

    // Sắp xếp
    switch (sortBy) {
      case 'popular':
        articles.sort((a, b) => b.views - a.views);
        break;
      case 'newest':
      default:
        articles.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
        break;
    }

    return articles;
  }, [searchTerm, selectedCategory, sortBy]);

  // Bài viết nổi bật
  const featuredArticle = useMemo(() => {
    // Ưu tiên bài nổi bật nhất, hoặc bài mới nhất nếu không có nổi bật
    return filteredAndSortedArticles.find(article => article.isFeatured) || filteredAndSortedArticles[0];
  }, [filteredAndSortedArticles]);


  const displayedArticles = useMemo(() => {
    // Lọc bỏ bài nổi bật nếu nó trùng với bài đầu tiên trong danh sách thường
    let articles = filteredAndSortedArticles;
    if (featuredArticle && articles[0]?.id === featuredArticle.id) {
      articles = articles.slice(1);
    }
    return articles.slice(0, articlesToDisplay);
  }, [filteredAndSortedArticles, articlesToDisplay, featuredArticle]);

  const canLoadMore = articlesToDisplay < filteredAndSortedArticles.length;

  const handleLoadMore = () => {
    setArticlesToDisplay(prev => prev + ARTICLES_PER_LOAD);
  };

  // Reset articlesToDisplay khi bộ lọc thay đổi
  useEffect(() => {
    setArticlesToDisplay(ARTICLES_PER_LOAD);
  }, [searchTerm, selectedCategory, sortBy]);


  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header (Breadcrumb) */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm">
            <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">Trang chủ</Link>
            <span className="mx-2 text-gray-400 dark:text-gray-500">/</span>
            <span className="text-gray-700 dark:text-gray-300">Blog</span>
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Blog EduSmart</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Cập nhật kiến thức mới nhất, mẹo học tập hiệu quả và tin tức từ cộng đồng.
        </p>

        {/* Featured Post (Bài viết nổi bật) */}
        {featuredArticle && (
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-12">
            <Link to={`/blog/${featuredArticle.slug}`} className="block">
              <img 
                src={featuredArticle.thumbnail} 
                alt={featuredArticle.title} 
                className="w-full h-64 sm:h-80 md:h-96 object-cover object-center" 
              />
              <div className="p-6 md:p-8">
                <span className="inline-block text-sm font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-4 py-1 rounded-full mb-3">
                  NỔI BẬT
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {featuredArticle.title}
                </h2>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center mr-4">
                    <UserIcon className="w-4 h-4 mr-1.5" />
                    {featuredArticle.author}
                  </span>
                  <span className="flex items-center">
                    <CalendarDaysIcon className="w-4 h-4 mr-1.5" />
                    {new Date(featuredArticle.publishDate).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Toolbar (Search, Filters, Sort) */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative w-full md:flex-1">
            <input
              type="search"
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          
          {/* Filters & Sort */}
          <div className="flex items-center gap-2">
            <FunnelIcon className="w-5 h-5 text-gray-500" />
            <FilterDropdown
              title="Danh mục"
              options={articleCategories}
              selected={selectedCategory}
              onSelect={(id) => setSelectedCategory(id as ArticleCategory | 'all')}
            />
            <FilterDropdown
              title="Sắp xếp"
              options={articleSortOptions}
              selected={sortBy}
              onSelect={(id) => setSortBy(id as ArticleSort)}
            />
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {displayedArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* Load More Button */}
        {canLoadMore && (
          <div className="text-center">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Tải thêm bài viết
            </button>
          </div>
        )}

        {displayedArticles.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-400 text-lg mt-10">
            Không tìm thấy bài viết nào phù hợp.
          </p>
        )}

      </div>
    </div>
  );
};