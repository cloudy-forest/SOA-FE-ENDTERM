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

  // Tạo danh sách category mới để random (bao gồm cả 'ielts', 'toeic'...)
  const categories: ArticleCategory[] = [
    'study-tips', 'news', 'tutorials', 'math', 'english', 'technology',
    'ielts', 'toeic', 'physics', 'chemistry', 'ielts-listening', 'ielts-tips',
    'features', 'ielts-review', 'toeic-review'
  ];
  // Lấy category ngẫu nhiên từ danh sách trên
  const category = categories[i % categories.length];
  const title = `Bài viết ${['Hướng dẫn', 'Mẹo', 'Phân tích'][i % 3]} về ${category.replace('-', ' ').toUpperCase()}`;
  const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  
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

// 1. Dữ liệu cho BỘ LỌC CỘT TRÁI (Nested)
export const mockBlogFilterCategories = [
  {
    name: 'Tìm hiểu về EduSmart',
    subCategories: [
      { id: 'features', name: 'Tính năng trên EduSmart' },
      { id: 'courses', name: 'Khóa học' },
    ],
  },
  {
    name: 'Review của học viên',
    subCategories: [
      { id: 'ielts-review', name: 'Học viên IELTS' },
      { id: 'toeic-review', name: 'Học viên TOEIC' },
    ],
  },
  {
    name: 'Luyện thi IELTS',
    subCategories: [
      { id: 'ielts', name: 'Tất cả IELTS' }, // ID này phải khớp với 'category' cũ
      { id: 'ielts-listening', name: 'IELTS Listening' },
      { id: 'ielts-reading', name: 'IELTS Reading' },
      { id: 'ielts-info', name: 'Thông tin kỳ thi IELTS' },
      { id: 'ielts-tips', name: 'Kinh nghiệm thi IELTS' },
    ],
  },
  {
    name: 'Luyện thi TOEIC',
    subCategories: [
      { id: 'toeic', name: 'Tất cả TOEIC' }, // ID này phải khớp
    ],
  },
  {
    name: 'Luyện thi THPT Quốc gia',
    subCategories: [
      { id: 'math', name: 'Môn Toán' }, // ID này phải khớp
      { id: 'physics', name: 'Môn Lý' }, // ID này phải khớp
      { id: 'chemistry', name: 'Môn Hóa' }, // ID này phải khớp
    ],
  },
];

// 2. Dữ liệu cho WIDGET "TÌM HIỂU THÊM" (Cột phải)
export const mockSidebarLinks = [
  { name: 'KHÓA HỌC IELTS INTENSIVE LISTENING', url: '/courses/1' },
  { name: 'KHÓA HỌC IELTS INTENSIVE READING', url: '/courses/1' },
  { name: 'KHÓA HỌC IELTS INTENSIVE SPEAKING', url: '/courses/1' },
  { name: 'KHÓA HỌC IELTS INTENSIVE WRITING', url: '/courses/1' },
  { name: 'KHÓA HỌC COMPLETE TOEIC', url: '/courses/1' },
  { name: 'Cấu trúc đề thi IELTS', url: '/blog/cau-truc-de-thi-ielts' },
  { name: 'Thang điểm IELTS và cách tính điểm', url: '/blog/thang-diem-ielts' },
];

// 3. Dữ liệu cho WIDGET "REVIEW" (Cột phải)
export const mockSidebarReviews = [
  { id: 1, title: 'Mình đã đạt 7.5 IELTS chỉ sau 3 tháng như thế nào?', url: '/blog/review-1' },
  { id: 2, title: 'Từ mất gốc đến 850 TOEIC: Lộ trình tự học cho người đi làm', url: '/blog/review-2' },
  { id: 3, title: 'Review chi tiết khóa IELTS Intensive Speaking của EduSmart', url: '/blog/review-3' },
];