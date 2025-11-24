// src/services/product/flashcardService.ts
import axiosClient from '../api';
import type { 
  Subject, FlashCard, FlashCardInput, Word, WordInput, 
  SubjectListResponse, PageResponse, FlashcardDetail
} from '../../types/flashcard';

// --- SUBJECTS ---

/**
 * Lấy tất cả môn học
 * GET /products/subjects
 */
export const getAllSubjects = async (): Promise<Subject[]> => {
  const res = await axiosClient.get<unknown>('/products/subjects');

  // Xử lý dữ liệu trả về theo SubjectListResponse
  const data = res as unknown as SubjectListResponse;
  
  if (data && data.subjects && Array.isArray(data.subjects)) {
    return data.subjects;
  }
  
  return [];
};

/**
 * Tạo/Update môn học
 */
export const createSubject = async (name: string): Promise<Subject> => {
  return axiosClient.post<unknown>('/products/subjects', { name }) as unknown as Subject;
};

// --- FLASHCARDS ---

/**
 * Tìm kiếm Flashcard (Theo keyword)
 * GET /products/flashcards/search?keyword=...&page=...&limit=...
 * Lưu ý: Controller hiện tại KHÔNG hỗ trợ lọc theo subjectId
 */
export const searchFlashCards = async (
  keyword: string = '',
  page: number = 1,
  limit: number = 20
): Promise<FlashCard[]> => {
  const res = await axiosClient.get<unknown>('/products/flashcards/search', {
    params: { keyword, page, limit }
  });

  // Xử lý PageResponse hoặc List
  if (Array.isArray(res)) return res as FlashCard[];
  
  if (res && typeof res === 'object' && 'content' in res) {
    return (res as unknown as PageResponse<FlashCard>).content;
  }
  
  return [];
};

export const getFlashcardDetail = async (id: number): Promise<FlashcardDetail> => {
  // 1. Lấy danh sách Flashcard (Lấy trang 1, limit lớn một chút để hy vọng tìm thấy)
  // Lưu ý: Đây là giải pháp tạm thời. Nếu ID nằm ở trang 2 sẽ không tìm thấy.
  // Nhưng vì không được sửa Backend nên đành chịu.
  const cards = await searchFlashCards('', 1, 100); 
  
  const cardInfo = cards.find(c => c.id === id);

  if (!cardInfo) {
    throw new Error("Không tìm thấy bộ thẻ (hoặc bộ thẻ nằm ở trang sau).");
  }

  // 2. Lấy danh sách từ vựng của bộ thẻ đó
  const words = await getWordsByFlashCard(id);

  // 3. Ghép lại thành FlashcardDetail
  return {
    ...cardInfo,
    words: words
  };
};

export const createOrUpdateFlashCard = async (data: FlashCardInput): Promise<FlashCard> => {
  return axiosClient.post<unknown>('/products/flashcards', data) as unknown as FlashCard;
};

export const deleteFlashCard = async (id: number): Promise<void> => {
  return axiosClient.delete(`/products/flashcards/${id}`);
};

// --- WORDS ---

export const getWordsByFlashCard = async (
  flashCardId: number,
  keyword: string = '',
  page: number = 1,
  limit: number = 30
): Promise<Word[]> => {
  const res = await axiosClient.get<unknown>('/products/words/search', {
    params: { 
      flashcard_id: flashCardId, // snake_case đúng theo Controller
      keyword,
      page,
      limit
    }
  });

  if (Array.isArray(res)) return res as Word[];
  
  if (res && typeof res === 'object' && 'content' in res) {
    return (res as unknown as PageResponse<Word>).content;
  }

  return [];
};

/**
 * Hàm thêm từ (Dùng cho Modal)
 * Map dữ liệu từ Form sang đúng DTO của Backend
 */
export const addWordToSet = async (flashCardId: number, data: { text: string, definition: string, phonetic: string, type: string }): Promise<Word> => {
  return axiosClient.post<unknown>('/products/words', {
    text: data.text,
    definition: data.definition,
    phonetic: data.phonetic,
    type_of_text: data.type, 
    flash_card_id: flashCardId // Quan trọng: Gán ID bộ thẻ vào đây
  }) as unknown as Word;
};
/**
 * Thêm/Sửa từ vựng
 * POST /products/words
 */
export const createOrUpdateWord = async (data: WordInput): Promise<Word> => {
  return axiosClient.post<unknown>('/products/words', data) as unknown as Word;
};

/**
 * Xóa từ vựng
 * DELETE /products/words/{id}
 */
export const deleteWord = async (id: number): Promise<void> => {
  return axiosClient.delete(`/products/words/${id}`);
};