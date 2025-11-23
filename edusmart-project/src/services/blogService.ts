// src/services/blogService.ts
import type { Article } from '../types/blog';
import { allArticles } from '../data/mockBlogArticles';

const FAKE_DELAY = 500;

// Dữ liệu đầu vào (Input) cho API (POST /products/blogs)
type CreateArticleData = {
  title: string;
  subtitle: string;
  content: string;
  writer: string;
  keywords: string;
};

/**
 * Giả lập API: POST /products/blogs
 * (Tạo bài viết mới)
 */
export const createArticle = (data: CreateArticleData): Promise<Article> => {
  console.log("(Giả lập API) Đang tạo bài viết mới:", data.title);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const newArticle: Article = {
        id: allArticles.length + 100,
        slug: data.title.toLowerCase().replace(/\s+/g, '-').slice(0, 50),
        
        title: data.title,
        subtitle: data.subtitle,
        content: data.content,
        writer: data.writer,
        keywords: data.keywords,
        
        views: 0, // Mặc định là 0
        publishDate: new Date().toISOString(),
      };

      allArticles.unshift(newArticle);
      console.log("(Giả lập API) Đã tạo thành công:", newArticle);
      resolve(newArticle);

    }, FAKE_DELAY);
  });
};