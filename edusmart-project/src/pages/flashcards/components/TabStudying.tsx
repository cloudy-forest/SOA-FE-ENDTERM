// src/pages/flashcards/components/TabStudying.tsx
// ▼▼▼ 1. SỬA LỖI IMPORT ▼▼▼
import { mockFlashcardDetails } from '../../../data/mockFlashcardData'; // Dùng data "giả"
import { FlashcardSetCard } from './FlashcardSetCard';

// (Tạm thời, chúng ta dùng chung data cho tất cả các tab)
const studyingFlashcardSets = mockFlashcardDetails;

export const TabStudying = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Đang học gần đây</h2>
      {/* (Nâng cao: Thêm thanh tiến độ tổng ở đây) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* ▼▼▼ 2. SỬA TÊN BIẾN (Giờ đã đúng) ▼▼▼ */}
        {studyingFlashcardSets.map(set => (
          <FlashcardSetCard key={set.id} set={set} type="studying" />
        ))}
      </div>
    </div>
  );
};