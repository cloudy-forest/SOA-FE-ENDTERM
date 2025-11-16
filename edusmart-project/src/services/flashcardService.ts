// src/services/flashcardService.ts
import type { FlashcardDetail } from '../types/flashcard';
import { mockFlashcardDetails as initialSets } from '../data/mockFlashcardData';

const FAKE_DELAY = 300;

// ▼▼▼ BIẾN DATA THÀNH "DATABASE ẢO" (Dùng 'let') ▼▼▼
const flashcardDB: FlashcardDetail[] = [...initialSets];

/**
 * Giả lập API: GET /products/flash-card (Lấy TẤT CẢ bộ thẻ)
 * (Chúng ta dùng hàm này cho cả 3 tab)
 */
export const getFlashcardSets = (): Promise<FlashcardDetail[]> => {
  console.log("(Giả lập API) Đang tải tất cả bộ thẻ...");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...flashcardDB]); // Trả về bản sao
    }, FAKE_DELAY);
  });
};

/**
 * Giả lập API: GET /products/flash-card/{id}
 * (Hàm này giữ nguyên)
 */
export const getFlashcardDetail = (flashcardId: number): Promise<FlashcardDetail> => {
  console.log(`(Giả lập API) Đang tải chi tiết bộ thẻ ID: ${flashcardId}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const details = flashcardDB.find(set => set.id === flashcardId);
      if (details) {
        resolve(details);
      } else {
        reject(new Error('Không tìm thấy bộ thẻ flashcard.'));
      }
    }, FAKE_DELAY);
  });
};

/**
 * ▼▼▼ HÀM MỚI: Dựa trên APIDocs (POST /products/flash-card) ▼▼▼
 */
export const createFlashcardSet = (data: {
  title: string;
  language: string;
  description: string;
}): Promise<FlashcardDetail> => {
  console.log("(Giả lập API) Đang tạo bộ thẻ mới:", data.title);
  return new Promise((resolve) => {
    setTimeout(() => {
      const newSet: FlashcardDetail = {
        id: Math.floor(Math.random() * 1000) + 100, // ID ngẫu nhiên
        title: data.title,
        language: data.language,
        description: data.description,
        number_of_word: 0, // Mới tạo, chưa có từ
        words: [],
        views: 0,
        author: 'Văn An', // (Hardcode user hiện tại)
        authorImage: 'https://i.pravatar.cc/150?img=5',
        subject: 'vocab', // (Hardcode mặc định)
        level: 'easy', // (Hardcode mặc định)
        createdAt: new Date().toISOString(),
      };
      
      flashcardDB.unshift(newSet); // Thêm vào "DB giả"
      resolve(newSet);
    }, FAKE_DELAY);
  });
};