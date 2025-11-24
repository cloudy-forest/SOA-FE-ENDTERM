// // src/types/flashcard.ts

// // Các loại bộ lọc
// export type FlashcardSubject = 'math' | 'physics' | 'chemistry' | 'english' | 'ielts' | 'toeic' | 'biology' | 'history';
// export type FlashcardLevel = 'grade10' | 'grade11' | 'grade12' | 'university' | 'basic' | 'advanced';
// export type FlashcardSort = 'newest' | 'popular' | 'term-count-desc';

// // Dữ liệu của một BỘ flashcard
// export interface FlashcardSet {
//   id: number;
//   title: string;
//   description: string;
//   termCount: number; // Số lượng thẻ trong bộ
//   author: string;
//   authorImage?: string;
//   subject: FlashcardSubject;
//   level: FlashcardLevel;
//   createdAt: string;
//   views: number; // Lượt xem (dùng cho sắp xếp "popular")
//   // (Sau này có thể thêm: isPublic: boolean, ownerId: string)
// }

// // Dữ liệu state của bộ lọc (Dùng cho Tab "Khám phá")
// export interface FlashcardFilterState {
//   searchTerm: string;
//   subjects: FlashcardSubject[];
//   levels: FlashcardLevel[];
//   sortBy: FlashcardSort;
//   page: number;
// }


// src/types/flashcard.ts

// // Dựa trên APIDocs: /products/flash-card/{id}/words
// export interface FlashcardWord {
//   id: number;
//   text: string;         // "Word"
//   phonetic: string;     // "/wɜːrd/"
//   type_of_text: string; // "noun"
//   definition: string;   // "A single distinct meaningful element of speech or writing..."
//   example?: string;
//   image_url?: string;
//   note?: string;
// }

// // Dựa trên APIDocs: /products/flash-card/{id}
// export interface FlashcardDetail {
//   id: number;
//   title: string;
//   language: string;
//   description: string;
//   number_of_word: number;
//   words: FlashcardWord[]; // Mảng các từ vựng
//   views: number;
//   author: string;
//   authorImage?: string;
//   subject: FlashcardSubject;
//   level: FlashcardLevel;
//   createdAt: string; // ISO String (cho "Mới nhất")
//   bannerUrl?: string;
// }

// export type FlashcardSubject = 'toeic' | 'ielts' | 'vocab' | 'grammar';
// export type FlashcardLevel = 'easy' | 'medium' | 'hard';
// export type FlashcardSort = 'newest' | 'popular' | 'words-asc' | 'words-desc';

// export interface FilterOption {
//   id: string;
//   name: string;
// }

// export interface FlashcardFilterState {
//   searchTerm: string;
//   subjects: FlashcardSubject[];
//   levels: FlashcardLevel[];
//   sortBy: FlashcardSort;
//   page: number;
// }

// src/types/flashcard.ts

// --- SUBJECT ---
export interface Subject {
  id: number;
  name: string;
}

// ▼▼▼ CẬP NHẬT: Khớp với SubjectListResponse.java ▼▼▼
export interface SubjectListResponse {
  quantity: number;
  subjects: Subject[];
}

// --- FLASHCARD ---
export interface FlashCard {
  id: number;
  title: string;
  language: string;
  description: string;
  
  // @JsonProperty("number_of_word")
  number_of_word: number;
  
  // @JsonProperty("thumbnail_id")
  thumbnail_id: number;
  
  // @JsonProperty("thumbnail_url")
  thumbnail_url: string;
}

export interface FlashCardInput {
  id?: number;
  title: string;
  language: string;
  description: string;
  
  // @JsonProperty("number_of_word")
  number_of_word: number;
}

// --- WORD ---
export interface Word {
  id: number;
  text: string;
  phonetic: string;
  definition: string;
  
  // @JsonProperty("type_of_text")
  type_of_text: string;
  
  // @JsonProperty("audio_link")
  audio_link: string;
  
  // @JsonProperty("audio_id")
  audio_id: number;
}

export interface WordInput {
  id?: number;
  text: string;
  phonetic: string;
  definition: string;
  
  // @JsonProperty("type_of_text")
  type_of_text: string;
  
  // @JsonProperty("flash_card_id")
  flash_card_id: number;
}

export interface FlashcardDetail extends FlashCard {
  words: Word[];
}

// Interface phân trang chung (để xử lý response của search)
export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

