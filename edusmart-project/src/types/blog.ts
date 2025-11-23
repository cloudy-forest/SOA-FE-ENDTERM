// src/types/blog.ts

// Dữ liệu blog đúng theo APIdocs (GET /product/blogs/{id})
export interface Article {
  id: number;        // id:int
  title: string;     // title:str
  subtitle: string;  // subtitle:str
  content: string;   // content:str
  writer: string;    // writer:str (tương ứng user_id trong DB)
  keywords: string;  // keywords:str (gộp từ blog_keywords)
  views: number;     // views:int

  // --- chỉ dùng ở FE, không bắt buộc backend phải có ---
  slug?: string;         // để build URL
  publishDate?: string;  // map từ created_at nếu backend trả về
}

// Response của GET /products/blogs?keyword=&page=&limit
export interface BlogListResponse {
  total_pages: number;
  current_page: number;
  blogs: Article[];
}

// Param query cho list blog
export interface BlogQueryParams {
  keyword?: string;
  page?: number;
  limit?: number;
}
