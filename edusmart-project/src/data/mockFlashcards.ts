// src/data/mockFlashcards.ts
import type { 
    FlashcardSet, 
    FlashcardSubject, 
    FlashcardLevel, 
    FlashcardSort 
} from '../types/flashcard';

// Tạo 30 bộ flashcard mẫu (cho tab "Khám phá")
export const allFlashcardSets: FlashcardSet[] = Array.from({ length: 30 }, (_, i) => {
    const id = i + 1;
    const subject = ['english', 'math', 'physics', 'ielts', 'chemistry'][i % 5] as FlashcardSubject;
    const level = ['basic', 'grade10', 'university', 'advanced', 'grade12'][i % 5] as FlashcardLevel;
    
    return {
        id,
        title: `Bộ thẻ ${['Từ vựng', 'Công thức', 'Định lý'][i % 3]} ${subject.toUpperCase()}`,
        description: 'Tổng hợp các thuật ngữ và khái niệm quan trọng nhất bạn cần biết để thành thạo chủ đề này.',
        termCount: Math.floor(Math.random() * 100) + 20, // 20-120 thẻ
        author: 'Giáo viên EduSmart',
        authorImage: `https://i.pravatar.cc/150?img=${i + 10}`,
        subject: subject,
        level: level,
        createdAt: new Date(Date.now() - id * 1000 * 3600 * 48).toISOString(), // 48 giờ trước * id
        views: Math.floor(Math.random() * 5000) + 200,
    };
});

// (Sau này, bạn sẽ có một mảng data riêng cho "Bộ thẻ của tôi")
export const myFlashcardSets: FlashcardSet[] = allFlashcardSets.slice(0, 4).map(set => ({
    ...set,
    author: "Bạn (Người dùng)", // Giả lập đây là thẻ của bạn
}));

// (Và data riêng cho "Đang học")
export const studyingFlashcardSets: FlashcardSet[] = allFlashcardSets.slice(5, 8);


// Dùng cho UI (component lọc)
export const flashcardSubjectFilters: { id: FlashcardSubject; name: string }[] = [
  { id: 'math', name: 'Toán học' },
  { id: 'physics', name: 'Vật lý' },
  { id: 'chemistry', name: 'Hóa học' },
  { id: 'english', name: 'Tiếng Anh' },
  { id: 'biology', name: 'Sinh học' },
  { id: 'history', name: 'Lịch sử' },
  { id: 'ielts', name: 'IELTS' },
  { id: 'toeic', name: 'TOEIC' },
];

export const flashcardLevelFilters: { id: FlashcardLevel; name: string }[] = [
  { id: 'grade10', name: 'Lớp 10' },
  { id: 'grade11', name: 'Lớp 11' },
  { id: 'grade12', name: 'Lớp 12' },
  { id: 'university', name: 'Luyện thi ĐH' },
  { id: 'basic', name: 'Cơ bản' },
  { id: 'advanced', name: 'Nâng cao' },
];

export const flashcardSortOptions: { id: FlashcardSort; name: string }[] = [
  { id: 'newest', name: 'Mới nhất' },
  { id: 'popular', name: 'Xem nhiều nhất' },
  { id: 'term-count-desc', name: 'Nhiều thẻ nhất' },
];