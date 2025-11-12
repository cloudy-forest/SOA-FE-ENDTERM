// src/services/flashcardService.ts
import type { FlashcardDetail } from '../types/flashcard';
import { mockFlashcardDetails } from '../data/mockFlashcardData';

const FAKE_DELAY = 300;

/**
 * Giả lập API: GET /products/flash-card/{id}
 * (Lấy chi tiết bộ thẻ, bao gồm danh sách từ vựng)
 */
export const getFlashcardDetail = (flashcardId: number): Promise<FlashcardDetail> => {
  console.log(`(Giả lập API) Đang tải chi tiết bộ thẻ ID: ${flashcardId}`);
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const details = mockFlashcardDetails.find(set => set.id === flashcardId);
      
      if (details) {
        resolve(details);
      } else {
        reject(new Error('Không tìm thấy bộ thẻ flashcard.'));
      }
    }, FAKE_DELAY);
  });
};