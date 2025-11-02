// src/pages/flashcards/components/TabStudying.tsx
import { studyingFlashcardSets } from '../../../data/mockFlashcards'; // Dùng data "đang học"
import { FlashcardSetCard } from './FlashcardSetCard';

export const TabStudying = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Đang học gần đây</h2>
      {/* (Nâng cao: Thêm thanh tiến độ tổng ở đây) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {studyingFlashcardSets.map(set => (
          <FlashcardSetCard key={set.id} set={set} type="studying" />
        ))}
      </div>
    </div>
  );
};