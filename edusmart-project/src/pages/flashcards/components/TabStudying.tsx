// src/pages/flashcards/components/TabStudying.tsx
import { useState, useEffect } from 'react';
import { getFlashcardSets } from '../../../services/flashcardService';
import type { FlashcardDetail } from '../../../types/flashcard';
import { FlashcardSetCard } from './FlashcardSetCard';
import { Spinner } from '../../../components/ui/Spinner';

export const TabStudying = () => {
  const [sets, setSets] = useState<FlashcardDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSets = async () => {
      try {
        setLoading(true);
        const data = await getFlashcardSets();
        // (Tạm thời lấy 2 set đầu tiên làm "đang học")
        setSets(data.slice(0, 2)); 
      } catch (error) {
        console.error("Lỗi tải bộ thẻ:", error);
      } finally {
        setLoading(false);
      }
    };
    loadSets();
  }, []);

  if (loading) {
    return <div className="flex justify-center p-12"><Spinner /></div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Đang học gần đây</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sets.map(set => (
          <FlashcardSetCard key={set.id} set={set} type="studying" />
        ))}
      </div>
    </div>
  );
};