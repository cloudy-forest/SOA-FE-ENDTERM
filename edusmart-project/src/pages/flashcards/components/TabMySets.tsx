// src/pages/flashcards/components/TabMySets.tsx
import { useState, useMemo, useEffect } from 'react';
// ▼▼▼ 1. IMPORT HÀM API VÀ TYPE ▼▼▼
import { getFlashcardSets, createFlashcardSet } from '../../../services/flashcardService';
import type { FlashcardDetail } from '../../../types/flashcard';
import { FlashcardSetCard } from './FlashcardSetCard';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Spinner } from '../../../components/ui/Spinner';
// ▼▼▼ 2. IMPORT MODAL MỚI ▼▼▼
import { CreateSetModal } from './CreateSetModal';

export const TabMySets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // ▼▼▼ 3. TẠO STATE CHO DATA VÀ MODAL ▼▼▼
  const [sets, setSets] = useState<FlashcardDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 4. HÀM TẢI DATA
  const loadSets = async () => {
    try {
      setLoading(true);
      const data = await getFlashcardSets();
      // (Trong app thật, API sẽ chỉ trả về "my sets")
      setSets(data);
    } catch (error) {
      console.error("Lỗi tải bộ thẻ:", error);
    } finally {
      setLoading(false);
    }
  };

  // 5. TẢI DATA KHI COMPONENT MOUNT
  useEffect(() => {
    loadSets();
  }, []);

  // 6. LOGIC LỌC (Giữ nguyên)
  const filteredSets = useMemo(() => {
    if (!searchTerm) return sets;
    return sets.filter(set => 
      set.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, sets]); // Thêm 'sets' vào dependency

  // 7. HÀM XỬ LÝ TẠO MỚI
  const handleCreateSet = async (data: { title: string; language: string; description: string; }) => {
    try {
      await createFlashcardSet(data);
      setIsModalOpen(false); // Đóng modal
      await loadSets(); // Tải lại danh sách
      alert('Tạo bộ thẻ thành công!');
    } catch (err ) {
      console.error("Lỗi tạo bộ thẻ:", err);
      alert('Tạo bộ thẻ thất bại.');
    }
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Spinner /></div>;
  }

  return (
    <>
      <div>
        {/* Toolbar (ĐÃ SỬA NÚT LINK THÀNH BUTTON) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative w-full md:w-1/2">
            <input
              type="search"
              placeholder="Tìm kiếm bộ thẻ của bạn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          
          {/* ▼▼▼ 8. SỬA <Link> THÀNH <button> ▼▼▼ */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <PlusIcon className="w-5 h-5" />
            Tạo bộ thẻ mới
          </button>
        </div>

        {/* Grid (Giữ nguyên) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSets.map(set => (
            <FlashcardSetCard key={set.id} set={set} type="personal" />
          ))}
        </div>
      </div>

      {/* 9. THÊM MODAL VÀO TRANG */}
      <CreateSetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateSet}
      />
    </>
  );
};