// // src/types/blog.ts

// export type ArticleCategory = 
//   'study-tips' | 'news' | 'tutorials' | 'math' | 'english' | 'technology' | 'life-hacks' |
//   'features' | 'courses' |
//   'ielts-review' | 'toeic-review' |
//   'ielts' | 'ielts-listening' | 'ielts-reading' | 'ielts-info' | 'ielts-tips' |
//   'toeic' | 'physics' | 'chemistry';

// export type ArticleSort = 'newest' | 'popular';

// export interface Article {
//   id: number;
//   title: string;
//   slug: string; // Dùng cho URL: /blog/slug-cua-bai-viet
//   thumbnail: string;
//   excerpt: string; // Đoạn mô tả ngắn
//   author: string;
//   authorImage?: string;
//   publishDate: string; // ISO string
//   readTimeMinutes: number;
//   category: ArticleCategory;
//   views: number;
//   isFeatured: boolean; // Bài viết nổi bật
// }

// export interface BlogFilterState {
//   searchTerm: string;
//   category: ArticleCategory | 'all';
//   sortBy: ArticleSort;
//   // page: number; (Không dùng nữa)
//   // articlesToShow: number; (quản lý state này cục bộ)
// }

// src/types/blog.ts

// Dựa trên Output của APIDocs (GET /product/blogs/{id})
export interface Article {
  id: number;
  slug: string; // (Tự thêm slug để làm URL)
  title: string;
  subtitle: string;
  content: string;
  writer: string;
  keywords: string; // (Dạng "tag1, tag2, tag3")
  views: number;
  publishDate: string; // (Tự thêm để sắp xếp, APIDocs không có)
}

// (Chúng ta không dùng ArticleCategory nữa)