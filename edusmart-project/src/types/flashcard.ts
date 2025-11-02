// src/types/flashcard.ts

// Các loại bộ lọc
export type FlashcardSubject = 'math' | 'physics' | 'chemistry' | 'english' | 'ielts' | 'toeic' | 'biology' | 'history';
export type FlashcardLevel = 'grade10' | 'grade11' | 'grade12' | 'university' | 'basic' | 'advanced';
export type FlashcardSort = 'newest' | 'popular' | 'term-count-desc';

// Dữ liệu của một BỘ flashcard
export interface FlashcardSet {
  id: number;
  title: string;
  description: string;
  termCount: number; // Số lượng thẻ trong bộ
  author: string;
  authorImage?: string;
  subject: FlashcardSubject;
  level: FlashcardLevel;
  createdAt: string;
  views: number; // Lượt xem (dùng cho sắp xếp "popular")
  // (Sau này có thể thêm: isPublic: boolean, ownerId: string)
}

// Dữ liệu state của bộ lọc (Dùng cho Tab "Khám phá")
export interface FlashcardFilterState {
  searchTerm: string;
  subjects: FlashcardSubject[];
  levels: FlashcardLevel[];
  sortBy: FlashcardSort;
  page: number;
}