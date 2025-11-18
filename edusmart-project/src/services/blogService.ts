// // src/services/blogService.ts
// import type { Article, ArticleCategory } from '../types/blog';
// import { allArticles } from '../data/mockBlogArticles';

// const FAKE_DELAY = 500;

// // Dữ liệu đầu vào (Input) cho API
// type CreateArticleData = {
//   title: string;
//   excerpt: string;
//   thumbnail: string;
//   content: string; // Nội dung HTML của bài viết
//   category: ArticleCategory;
//   author: string; // Tên tác giả (lấy từ Redux)
//   authorImage: string; // Avatar (lấy từ Redux)
// };

// /**
//  * Giả lập API: POST /api/blog/articles
//  * (Tạo bài viết mới)
//  */
// export const createArticle = (data: CreateArticleData): Promise<Article> => {
//   console.log("(Giả lập API) Đang tạo bài viết mới:", data.title);
  
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const newArticle: Article = {
//         id: allArticles.length + 100, // ID ngẫu nhiên
//         slug: data.title.toLowerCase().replace(/\s+/g, '-'), // Slug đơn giản
        
//         title: data.title,
//         excerpt: data.excerpt,
//         thumbnail: data.thumbnail || 'https://picsum.photos/seed/newpost/400/250',
//         category: data.category,
        
//         author: data.author,
//         authorImage: data.authorImage,
        
//         publishDate: new Date().toISOString(),
//         readTimeMinutes: Math.ceil(data.content.length / 1000), // Ước tính thời gian đọc
//         views: 0,
//         isFeatured: false,
//       };

//       // Thêm bài viết mới vào "database" giả (để nó xuất hiện ở trang chủ)
//       allArticles.unshift(newArticle);
      
//       console.log("(Giả lập API) Đã tạo thành công:", newArticle);
//       resolve(newArticle);

//     }, FAKE_DELAY);
//   });
// };

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