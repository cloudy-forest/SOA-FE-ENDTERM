import type { AdminBlog, BlogListResponse } from '../../types/admin';
import { FAKE_DELAY } from './constants';

const mockBlogs: AdminBlog[] = Array.from({ length: 25 }).map((_, index) => ({
  id: index + 1,
  title: `Bài viết mẫu số ${index + 1} về IELTS`,
  subtitle: `Tóm tắt nội dung quan trọng của bài viết ${index + 1}...`,
  content: '<p>Nội dung chi tiết...</p>',
  writer: index % 2 === 0 ? 'Admin EduSmart' : 'Teacher Lan',
  keywords: 'ielts, tips, vocabulary',
  views: Math.floor(Math.random() * 1000)
}));

/**
 * Giả lập API: GET /products/blogs?keyword=&page=&limit
 */
export const fetchAdminBlogs = async (
  keyword: string = '', 
  page: number = 1, 
  limit: number = 10
): Promise<BlogListResponse> => {
  console.log(`Fetching blogs: keyword="${keyword}", page=${page}, limit=${limit}`);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // 1. Lọc theo keyword
      let filtered = mockBlogs;
      if (keyword) {
        const lowerTerm = keyword.toLowerCase();
        filtered = mockBlogs.filter(b => 
          b.title.toLowerCase().includes(lowerTerm) || 
          b.writer.toLowerCase().includes(lowerTerm)
        );
      }

      // 2. Tính toán phân trang
      const total_pages = Math.ceil(filtered.length / limit);
      const startIndex = (page - 1) * limit;
      const paginatedBlogs = filtered.slice(startIndex, startIndex + limit);

      // 3. Trả về đúng cấu trúc API
      resolve({
        total_pages,
        current_page: page,
        blogs: paginatedBlogs
      });
    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: DELETE /products/blogs/{id}
 */
export const deleteAdminBlog = async (id: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Đã xóa blog ID: ${id}`);
      // Trong thực tế, bạn sẽ xóa khỏi mảng mockBlogs
      // const index = mockBlogs.findIndex(b => b.id === id);
      // if (index !== -1) mockBlogs.splice(index, 1);
      resolve();
    }, FAKE_DELAY);
  });
};