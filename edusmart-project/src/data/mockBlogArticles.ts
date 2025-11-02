// src/data/mockBlogArticles.ts
import type { Article, ArticleCategory, ArticleSort } from '../types/blog';

// Dùng cho UI (component lọc)
export const articleCategories: { id: ArticleCategory | 'all'; name: string }[] = [
  { id: 'all', name: 'Tất cả' },
  { id: 'study-tips', name: 'Mẹo học tập' },
  { id: 'news', name: 'Tin tức EduSmart' },
  { id: 'tutorials', name: 'Hướng dẫn sử dụng' },
  { id: 'math', name: 'Môn Toán' },
  { id: 'english', name: 'Môn Tiếng Anh' },
  { id: 'technology', name: 'Công nghệ' },
  { id: 'life-hacks', name: 'Kỹ năng sống' },
];

export const articleSortOptions: { id: ArticleSort; name: string }[] = [
  { id: 'newest', name: 'Mới nhất' },
  { id: 'popular', name: 'Xem nhiều nhất' },
];

// Tạo 20 bài viết mẫu
export const allArticles: Article[] = Array.from({ length: 20 }, (_, i) => {
  const id = i + 1;
  const category = ['study-tips', 'news', 'tutorials', 'math', 'english', 'technology'][i % 6] as ArticleCategory;
  const title = `Bài viết ${['Hướng dẫn', 'Mẹo', 'Phân tích'][i % 3]} về ${category.replace('-', ' ').toUpperCase()}`;
  const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''); // Tạo slug đơn giản
  
  return {
    id,
    title,
    slug,
    thumbnail: `https://picsum.photos/seed/${id + 100}/400/250`, // Ảnh ngẫu nhiên
    excerpt: `Đây là đoạn mô tả ngắn gọn cho bài viết số ${id}. Nó cung cấp cái nhìn tổng quan về nội dung chính của bài viết.`,
    author: `Tác giả EduSmart ${id % 5 + 1}`,
    authorImage: `https://i.pravatar.cc/150?img=${id + 20}`,
    publishDate: new Date(Date.now() - id * 1000 * 3600 * 24 * 7).toISOString(), // Mỗi bài cách nhau 1 tuần
    readTimeMinutes: Math.floor(Math.random() * 5) + 3, // 3-7 phút đọc
    category: category,
    views: Math.floor(Math.random() * 10000) + 500,
    isFeatured: i === 0 || i === 1, // Bài 1 và 2 là nổi bật
  };
});