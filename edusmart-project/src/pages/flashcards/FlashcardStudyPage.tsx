// src/pages/flashcard/FlashcardStudyPage.tsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { FlashcardDetail } from '../../types/flashcard';
import { getFlashcardDetail } from '../../services/flashcardService';
import { Spinner } from '../../components/ui/Spinner';
import { FlippableCard } from '../../components/flashcard/FlippableCard';
import { 
  ArrowLeftIcon, 
  ArrowRightIcon, 
  ChevronLeftIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

export const FlashcardStudyPage = () => {
  const { flashcardId } = useParams<{ flashcardId: string }>();
  const [details, setDetails] = useState<FlashcardDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    if (!flashcardId) return;
    
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getFlashcardDetail(parseInt(flashcardId));
        setDetails(data);
      // ▼▼▼ SỬA LỖI 1: SỬ DỤNG BIẾN 'err' ▼▼▼
      } catch (err) {
        console.error("Lỗi tải chi tiết bộ thẻ:", err); // Log lỗi
        setError("Không thể tải bộ thẻ này.");
      // ▲▲▲ HẾT SỬA LỖI 1 ▲▲▲
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [flashcardId]);

  // ▼▼▼ SỬA LỖI 2: THÊM LẠI CÁC HÀM BỊ XÓA ▼▼▼
  const handleNext = () => {
    if (details && currentCardIndex < details.words.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };
  // ▲▲▲ HẾT SỬA LỖI 2 ▲▲▲

  if (loading) {
    return <div className="flex justify-center items-center h-[50vh]"><Spinner /></div>;
  }

  if (error || !details) {
    return <div className="text-center p-12 text-red-500">{error || 'Không tìm thấy dữ liệu.'}</div>;
  }
  
  // Màn hình chờ (Khi bộ thẻ rỗng)
  if (details.words.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <Link to="/flashcards" className="flex items-center text-sm text-blue-600 hover:underline mb-4">
          <ChevronLeftIcon className="w-4 h-4 mr-1" />
          Quay lại tất cả bộ thẻ
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{details.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{details.description}</p>
        
        <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Bộ thẻ này chưa có từ vựng!</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">Bạn cần thêm từ mới để bắt đầu học.</p>
          <button 
            className="flex items-center justify-center mx-auto bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Thêm từ mới
          </button>
        </div>
      </div>
    );
  }

  // Màn hình học (Khi có từ vựng)
  const currentWord = details.words[currentCardIndex];
  const progressPercent = ((currentCardIndex + 1) / details.words.length) * 100;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      {/* 1. Header (Quay lại) */}
      <Link to="/flashcards" className="flex items-center text-sm text-blue-600 hover:underline mb-4">
        <ChevronLeftIcon className="w-4 h-4 mr-1" />
        Quay lại tất cả bộ thẻ
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{details.title}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{details.description}</p>
      
      {/* 2. Thẻ lật */}
      <FlippableCard word={currentWord} />

      {/* 3. Thanh điều khiển */}
      <div className="mt-8">
        {/* Progress Bar */}
        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Tiến độ</span>
          <span>Thẻ {currentCardIndex + 1} / {details.words.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressPercent}%` }}></div>
        </div>

        {/* Nút Bấm (Giờ đã tìm thấy hàm) */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePrev}
            disabled={currentCardIndex === 0}
            className="flex items-center px-6 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium disabled:opacity-50"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Trước
          </button>
          <button
            onClick={handleNext}
            disabled={currentCardIndex === details.words.length - 1}
            className="flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 disabled:opacity-50"
          >
            Tiếp theo
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};