// src/services/blogService.ts

import type { Article, BlogListResponse, BlogQueryParams } from '../types/blog';
import { allArticles } from '../data/mockBlogArticles';

const FAKE_DELAY = 500;

// Payload gửi lên endpoint POST /products/blogs
export type CreateOrUpdateBlogPayload = {
  id?: number;       // có id => update, không có => create
  title: string;
  subtitle: string;
  content: string;
  writer: string;    // nên là user_id
  keywords: string;
  views?: number;    // khi tạo mới FE sẽ set = 0
};

/**
 * Giả lập API: GET /products/blogs?keyword=&page=&limit
 * - Lọc theo keyword (title, subtitle, writer, keywords)
 * - Phân trang theo page, limit
 */
export const fetchBlogs = (
  params: BlogQueryParams = {}
): Promise<BlogListResponse> => {
  const { keyword = '', page = 1, limit = 6 } = params;

  return new Promise((resolve) => {
    setTimeout(() => {
      let blogs = [...allArticles];

      // Lọc theo keyword
      if (keyword.trim()) {
        const term = keyword.toLowerCase();
        blogs = blogs.filter((article) =>
          article.title.toLowerCase().includes(term) ||
          article.subtitle.toLowerCase().includes(term) ||
          article.writer.toLowerCase().includes(term) ||
          article.keywords.toLowerCase().includes(term)
        );
      }

      // Sắp xếp theo publishDate (nếu có), không thì giữ nguyên
      blogs.sort((a, b) => {
        const timeA = a.publishDate ? new Date(a.publishDate).getTime() : 0;
        const timeB = b.publishDate ? new Date(b.publishDate).getTime() : 0;
        return timeB - timeA;
      });

      const total_pages = Math.max(1, Math.ceil(blogs.length / limit));
      const current_page = Math.min(Math.max(page, 1), total_pages);

      const start = (current_page - 1) * limit;
      const end = start + limit;

      const pagedBlogs = blogs.slice(start, end);

      const response: BlogListResponse = {
        total_pages,
        current_page,
        blogs: pagedBlogs,
      };

      resolve(response);
    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: GET /product/blogs/{id}
 */
export const getBlogById = (id: number): Promise<Article | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const found = allArticles.find((b) => b.id === id) || null;
      resolve(found);
    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: POST /products/blogs
 * - Nếu có data.id => update
 * - Nếu không có => create mới
 */
export const createOrUpdateBlog = (
  data: CreateOrUpdateBlogPayload
): Promise<Article> => {
  console.log('(Giả lập API) POST /products/blogs', data);

  return new Promise((resolve) => {
    setTimeout(() => {
      // UPDATE
      if (data.id != null) {
        const idx = allArticles.findIndex((b) => b.id === data.id);
        if (idx !== -1) {
          const updated: Article = {
            ...allArticles[idx],
            ...data,
          };
          allArticles[idx] = updated;
          console.log('(Giả lập API) Đã cập nhật:', updated);
          return resolve(updated);
        }
      }

      // CREATE
      const newId =
        allArticles.length > 0
          ? Math.max(...allArticles.map((b) => b.id)) + 1
          : 1;

      const newArticle: Article = {
        id: newId,
        title: data.title,
        subtitle: data.subtitle,
        content: data.content,
        writer: data.writer,
        keywords: data.keywords,
        views: data.views ?? 0,

        // client-only
        slug: data.title.toLowerCase().replace(/\s+/g, '-').slice(0, 50),
        publishDate: new Date().toISOString(),
      };

      allArticles.unshift(newArticle);
      console.log('(Giả lập API) Đã tạo thành công:', newArticle);
      resolve(newArticle);
    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: DELETE /products/blogs/{id}
 */
export const deleteBlog = (id: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const idx = allArticles.findIndex((b) => b.id === id);
      if (idx !== -1) {
        allArticles.splice(idx, 1);
      }
      console.log('(Giả lập API) Đã xóa blog id =', id);
      resolve();
    }, FAKE_DELAY);
  });
};
