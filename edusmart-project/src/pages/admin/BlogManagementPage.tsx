// src/pages/admin/BlogManagementPage.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAdminBlogs, deleteAdminBlog } from '../../services/adminService';
import type { AdminBlog } from '../../types/admin';
import { Spinner } from '../../components/ui/Spinner';
import { useDebounced } from '../../hooks/useDebounced'; // Hook debounce bạn đã có
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

export const BlogManagementPage = () => {
  // Data State
  const [blogs, setBlogs] = useState<AdminBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter & Pagination State
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 5; // Giới hạn số dòng mỗi trang

  // Debounce search term để không gọi API liên tục khi gõ
  const debouncedSearchTerm = useDebounced(searchTerm, 500);

  // Hàm tải dữ liệu
  const loadData = async () => {
    try {
      setLoading(true);
      // Gọi API với các tham số phân trang và tìm kiếm
      const response = await fetchAdminBlogs(debouncedSearchTerm, currentPage, ITEMS_PER_PAGE);
      
      setBlogs(response.blogs);
      setTotalPages(response.total_pages);
      // Nếu tìm kiếm mới trả về ít trang hơn trang hiện tại -> reset về trang 1
      if (response.current_page > response.total_pages && response.total_pages > 0) {
         setCurrentPage(1);
      }
    } catch (err) {
      console.error(err);
      setError('Không thể tải danh sách bài viết.');
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi search term hoặc page thay đổi
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, currentPage]);

  // Hàm xóa
  const handleDelete = async (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      try {
        await deleteAdminBlog(id);
        alert('Đã xóa thành công');
        loadData(); // Tải lại dữ liệu
      } catch (error) {
        console.error("Chi tiết lỗi xóa blog:", error);
        alert('Lỗi khi xóa bài viết');
      }
    }
  };

  // Chuyển trang
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Blog</h1>
        <Link 
          to="/blog/create" // Tái sử dụng trang Tạo bài viết bạn đã làm
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Viết bài mới
        </Link>
      </div>

      {/* Search Bar */}
      <div className="p-4 bg-white rounded-xl border border-gray-200">
        <div className="relative max-w-md">
          <input 
            type="text" 
            placeholder="Tìm kiếm bài viết theo tiêu đề hoặc tác giả..." 
            className="form-input pl-10 w-full"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex justify-center p-12"><Spinner /></div>
        ) : error ? (
          <div className="text-red-500 p-6 text-center">{error}</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bài viết</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tác giả</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lượt xem</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {blogs.length > 0 ? (
                    blogs.map(blog => (
                      <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{blog.id}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 line-clamp-1">{blog.title}</div>
                          <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">{blog.subtitle}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {blog.writer}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <EyeIcon className="w-4 h-4 mr-1" />
                            {blog.views}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3" title="Chỉnh sửa (Sẽ làm sau)">
                            <PencilSquareIcon className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(blog.id)}
                            className="text-red-600 hover:text-red-900" 
                            title="Xóa"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                        Không tìm thấy bài viết nào.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Trang <span className="font-medium">{currentPage}</span> / <span className="font-medium">{totalPages}</span>
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                      {/* Render số trang đơn giản */}
                      {Array.from({ length: totalPages }).map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => handlePageChange(idx + 1)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === idx + 1
                              ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};