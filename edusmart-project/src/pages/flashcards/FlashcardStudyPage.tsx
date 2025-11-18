// src/pages/flashcard/FlashcardStudyPage.tsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { FlashcardDetail } from '../../types/flashcard';
// ▼▼▼ 1. IMPORT CÁC THÀNH PHẦN MỚI ▼▼▼
import { getFlashcardDetail, addWordToSet } from '../../services/flashcardService';
import { AddWordModal } from './components/AddWordModal';
import type { WordFormInputs } from './components/AddWordModal';
import { Spinner } from '../../components/ui/Spinner';
import { 
  ChevronLeftIcon,
  PlusIcon,
  TableCellsIcon,
  PencilSquareIcon,
  BookOpenIcon,
  SpeakerWaveIcon // (Thêm icon Loa)
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
export const FlashcardStudyPage = () => {
  const { flashcardId } = useParams<{ flashcardId: string }>();
  const [details, setDetails] = useState<FlashcardDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // ▼▼▼ 2. STATE ĐỂ QUẢN LÝ MODAL ▼▼▼
  const [isAddWordModalOpen, setIsAddWordModalOpen] = useState(false);

  // Hàm tải/tải lại data
  const loadData = async () => {
    if (!flashcardId) return;
    try {
      setLoading(true);
      setError(null);
      const data = await getFlashcardDetail(parseInt(flashcardId));
      setDetails(data);
    } catch (err) {
      console.error("Lỗi tải chi tiết bộ thẻ:", err);
      setError("Không thể tải bộ thẻ này.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadData();
  }, [flashcardId]);

  // ▼▼▼ 3. HÀM XỬ LÝ SUBMIT TỪ MODAL ▼▼▼
  const handleAddWordSubmit = async (data: WordFormInputs) => {
    if (!details) return;
    try {
      await addWordToSet(details.id, data);
      setIsAddWordModalOpen(false); // Đóng modal
      await loadData(); // Tải lại data (để hiển thị từ mới)
    } catch (err) {
      console.error(err);
      alert("Lỗi khi thêm từ mới.");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-[50vh]"><Spinner /></div>;
  }

  if (error || !details) {
    return <div className="text-center p-12 text-red-500">{error || 'Không tìm thấy dữ liệu.'}</div>;
  }

  // Biến kiểm tra xem có từ nào không
  const hasWords = details.words.length > 0;
  
  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* 1. Banner (Đã sửa) */}
        <div className="max-w-5xl mx-auto pt-8 px-4">
          <div className="h-32 md:h-40 bg-gray-300 relative rounded-lg overflow-hidden">
            <img 
              src={details.bannerUrl || 'https://images.unsplash.com/photo-1497633762265-9d179a990aaa?q=80&w=2070&auto=format&fit=crop'} 
              alt="Ảnh bìa bộ thẻ" 
              className="w-full h-full object-cover"
            />
            <Link 
              to="/flashcards" 
              className="absolute top-4 left-4 bg-white/70 backdrop-blur-sm rounded-full p-2 text-gray-800 hover:bg-white"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="max-w-5xl mx-auto py-8 px-4">
          {/* 2. Tiêu đề và Nút bấm */}
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{details.title}</h1>
              <p className="text-gray-600 dark:text-gray-400">{details.description}</p>
            </div>
            
            <Link 
              to={`/flashcards/${details.id}/study`}
              // Thêm logic vô hiệu hóa (disable)
              aria-disabled={!hasWords}
              onClick={(e) => {
                if (!hasWords) e.preventDefault(); // Ngăn click nếu không có từ
              }}
              className={clsx(
                'flex items-center justify-center px-6 py-3 rounded-lg font-medium shadow-md',
                !hasWords
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed' // Style khi bị vô hiệu hóa
                  : 'bg-blue-600 text-white hover:bg-blue-700' // Style khi bình thường
              )}
            >
              <BookOpenIcon className="w-5 h-5 mr-2" />
              Bắt đầu học ({details.number_of_word} thẻ)
            </Link>
          </div>

          {/* 3. Dòng chú ý (Giữ nguyên) */}
          <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 p-4 rounded-md mb-6">
            {/* ... (Nội dung chú ý) ... */}
          </div>

          {/* ▼▼▼ 4. BA NÚT QUẢN LÝ (ĐÃ KẾT NỐI NÚT "THÊM TỪ MỚI") ▼▼▼ */}
          <div className="flex items-center space-x-3 mb-6">
            <button 
              onClick={() => setIsAddWordModalOpen(true)}
              className="flex items-center bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm font-medium"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Thêm từ mới
            </button>
            <button className="flex items-center bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm font-medium">
              <TableCellsIcon className="w-4 h-4 mr-2" />
              Tạo hàng loạt
            </button>
            <button className="flex items-center bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm font-medium">
              <PencilSquareIcon className="w-4 h-4 mr-2" />
              Chỉnh sửa
            </button>
          </div>

          {/* ▼▼▼ 5. DANH SÁCH TỪ (HIỂN THỊ DANH SÁCH THẬT) ▼▼▼ */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            {details.words.length === 0 ? (
              <div className="text-center p-12">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Chưa có flashcard nào</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Hãy bắt đầu bằng cách "Thêm từ mới".</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {details.words.map((word) => (
                  <div key={word.id} className="p-4 md:p-6 flex justify-between items-center">
                    {/* Từ và Phiên âm */}
                    <div className="w-1/3">
                      <p className="font-medium text-gray-900 dark:text-white">{word.text}</p>
                      <p className="text-sm text-gray-500">{word.phonetic}</p>
                    </div>
                    {/* Định nghĩa */}
                    <div className="w-2/3 px-4">
                      <p className="text-gray-700 dark:text-gray-300">{word.definition}</p>
                    </div>
                    {/* Nút Loa (chưa có chức năng) */}
                    <button className="p-2 text-gray-500 hover:text-blue-600">
                      <SpeakerWaveIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 6. MODAL (RENDER Ở CUỐI) */}
      <AddWordModal 
        isOpen={isAddWordModalOpen}
        onClose={() => setIsAddWordModalOpen(false)}
        onSubmit={handleAddWordSubmit}
      />
    </>
  );
};