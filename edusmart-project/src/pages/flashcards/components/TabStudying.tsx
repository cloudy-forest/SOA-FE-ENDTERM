// // src/pages/flashcards/components/TabStudying.tsx
// import { useState, useEffect } from 'react';
// import { getFlashcardSets } from '../../../services/flashcardService';
// import type { FlashcardDetail } from '../../../types/flashcard';
// import { FlashcardSetCard } from './FlashcardSetCard';
// import { Spinner } from '../../../components/ui/Spinner';

// export const TabStudying = () => {
//   const [sets, setSets] = useState<FlashcardDetail[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadSets = async () => {
//       try {
//         setLoading(true);
//         const data = await getFlashcardSets();
//         // (Tạm thời lấy 2 set đầu tiên làm "đang học")
//         setSets(data.slice(0, 2)); 
//       } catch (error) {
//         console.error("Lỗi tải bộ thẻ:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadSets();
//   }, []);

//   if (loading) {
//     return <div className="flex justify-center p-12"><Spinner /></div>;
//   }

//   return (
//     <div>
//       <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Đang học gần đây</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {sets.map(set => (
//           <FlashcardSetCard key={set.id} set={set} type="studying" />
//         ))}
//       </div>
//     </div>
//   );
// };

// Tạm thời mock dữ liệu "Đang học" bằng cách lấy 2 bộ thẻ đầu tiên tìm thấy (do Backend chưa có API History cho Flashcard).
import { useState, useEffect } from 'react';
// ▼▼▼ 1. SỬA IMPORT SERVICE & TYPE ▼▼▼
import { searchFlashCards } from '../../../services/product/flashcardService';
import type { FlashCard } from '../../../types/flashcard';
import { FlashcardSetCard } from './FlashcardSetCard';
import { Spinner } from '../../../components/ui/Spinner';
import { BookOpenIcon } from '@heroicons/react/24/outline';

export const TabStudying = () => {
  // ▼▼▼ 2. SỬA TYPE STATE: Dùng FlashCard thay vì FlashcardDetail ▼▼▼
  const [sets, setSets] = useState<FlashCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSets = async () => {
      try {
        setLoading(true);
        // ▼▼▼ 3. LOGIC MỚI: Gọi Search và lấy 2 phần tử đầu làm giả "Đang học" ▼▼▼
        // (Vì Backend chưa có API "History", ta tạm dùng cách này để UI không bị trống)
        const data = await searchFlashCards('');
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
      <div className="flex items-center gap-2 mb-4 text-gray-900 dark:text-white">
        <BookOpenIcon className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Đang học gần đây</h2>
      </div>
      
      {sets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sets.map(set => (
            // ▼▼▼ 4. BỎ PROP 'type="studying"' VÌ COMPONENT CON KHÔNG DÙNG NỮA ▼▼▼
            <FlashcardSetCard key={set.id} set={set} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
          Bạn chưa học bộ thẻ nào gần đây.
        </div>
      )}
    </div>
  );
};