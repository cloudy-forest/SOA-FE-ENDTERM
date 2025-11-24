// // src/pages/flashcard/FlashcardLearnPage.tsx
// import { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import type { FlashcardDetail } from '../../types/flashcard';
// import { getFlashcardDetail } from '../../services/flashcardService';
// import { Spinner } from '../../components/ui/Spinner';
// import { FlippableCard } from '../../components/flashcard/FlippableCard';
// import { 
//   ArrowLeftIcon, 
//   ArrowRightIcon, 
//   ChevronLeftIcon,
// } from '@heroicons/react/24/outline';

// export const FlashcardLearnPage = () => {
//   const { flashcardId } = useParams<{ flashcardId: string }>();
//   const [details, setDetails] = useState<FlashcardDetail | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentCardIndex, setCurrentCardIndex] = useState(0);

//   useEffect(() => {
//     if (!flashcardId) return;
    
//     const loadData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const data = await getFlashcardDetail(parseInt(flashcardId));
//         setDetails(data);
//       } catch (err) {
//         console.error("Lỗi tải chi tiết bộ thẻ:", err);
//         setError("Không thể tải bộ thẻ này.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadData();
//   }, [flashcardId]);

//   const handleNext = () => {
//     if (details && currentCardIndex < details.words.length - 1) {
//       setCurrentCardIndex(currentCardIndex + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentCardIndex > 0) {
//       setCurrentCardIndex(currentCardIndex - 1);
//     }
//   };

//   if (loading) {
//     return <div className="flex justify-center items-center h-[50vh]"><Spinner /></div>;
//   }

//   if (error || !details) {
//     return <div className="text-center p-12 text-red-500">{error || 'Không tìm thấy dữ liệu.'}</div>;
//   }
  
//   // (Chúng ta đã có logic này: nếu rỗng, nút "Bắt đầu học" sẽ bị vô hiệu hóa
//   //  nhưng chúng ta vẫn nên kiểm tra ở đây cho an toàn)
//   if (details.words.length === 0) {
//     return (
//       <div className="max-w-3xl mx-auto py-12 px-4 text-center">
//         <h1 className="text-xl font-semibold">Bộ thẻ này chưa có từ vựng.</h1>
//         <Link 
//           to={`/flashcards/${flashcardId}`} // Quay lại trang chi tiết
//           className="mt-4 inline-flex items-center text-blue-600 hover:underline"
//         >
//           <ChevronLeftIcon className="w-4 h-4 mr-1" />
//           Quay lại trang chi tiết
//         </Link>
//       </div>
//     );
//   }

//   // Màn hình học (Khi có từ vựng)
//   const currentWord = details.words[currentCardIndex];
//   const progressPercent = ((currentCardIndex + 1) / details.words.length) * 100;

//   return (
//     <div className="max-w-3xl mx-auto py-12 px-4">
//       {/* 1. Header (Quay lại trang CHI TIẾT) */}
//       <Link 
//         to={`/flashcards/${flashcardId}`} // Quay lại trang chi tiết
//         className="flex items-center text-sm text-blue-600 hover:underline mb-4"
//       >
//         <ChevronLeftIcon className="w-4 h-4 mr-1" />
//         Quay lại trang chi tiết bộ thẻ
//       </Link>
//       <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{details.title}</h1>
      
//       {/* 2. Thẻ lật */}
//       <FlippableCard word={currentWord} />

//       {/* 3. Thanh điều khiển */}
//       <div className="mt-8">
//         {/* Progress Bar */}
//         <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
//           <span>Tiến độ</span>
//           <span>Thẻ {currentCardIndex + 1} / {details.words.length}</span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
//           <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressPercent}%` }}></div>
//         </div>

//         {/* Nút Bấm */}
//         <div className="flex justify-between items-center mt-6">
//           <button
//             onClick={handlePrev}
//             disabled={currentCardIndex === 0}
//             className="flex items-center px-6 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium disabled:opacity-50"
//           >
//             <ArrowLeftIcon className="w-5 h-5 mr-2" />
//             Trước
//           </button>
//           <button
//             onClick={handleNext}
//             disabled={currentCardIndex === details.words.length - 1}
//             className="flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 disabled:opacity-50"
//           >
//             Tiếp theo
//             <ArrowRightIcon className="w-5 h-5 ml-2" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// src/pages/flashcard/FlashcardLearnPage.tsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { FlashcardDetail } from '../../types/flashcard';
import { getFlashcardDetail } from '../../services/product/flashcardService'; // Import đúng service mới
import { Spinner } from '../../components/ui/Spinner';
import { FlippableCard } from '../../components/flashcard/FlippableCard';
import { ArrowLeftIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

export const FlashcardLearnPage = () => {
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
      } catch (err) {
        console.error(err);
        setError("Không thể tải dữ liệu bài học.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [flashcardId]);

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

  if (loading) return <div className="flex justify-center h-[60vh] items-center"><Spinner /></div>;
  if (error || !details) return <div className="text-center p-12 text-red-500 font-medium">{error}</div>;

  // Nếu bộ thẻ không có từ nào
  if (details.words.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Bộ thẻ này trống</h1>
        <p className="text-gray-500 mb-8">Vui lòng thêm từ vựng trước khi bắt đầu học.</p>
        <Link 
          to={`/flashcards/${flashcardId}`} 
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <ChevronLeftIcon className="w-4 h-4 mr-2" />
          Quay lại trang chi tiết
        </Link>
      </div>
    );
  }

  const currentWord = details.words[currentCardIndex];
  const progressPercent = ((currentCardIndex + 1) / details.words.length) * 100;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 min-h-screen flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <Link 
          to={`/flashcards/${flashcardId}`} 
          className="flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5 mr-1" />
          Dừng học
        </Link>
        <span className="text-sm font-bold text-gray-400">
          {currentCardIndex + 1} / {details.words.length}
        </span>
      </div>
      
      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        {details.title}
      </h1>
      
      {/* Thẻ lật: Truyền đúng object Word theo cấu trúc mới */}
      <div className="flex-1 flex flex-col justify-center">
         <FlippableCard word={currentWord} />
      </div>

      <div className="mt-10">
        <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 mb-8">
          <div 
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300 ease-out" 
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center gap-4">
          <button
            onClick={handlePrev}
            disabled={currentCardIndex === 0}
            className="flex-1 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mx-auto" />
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentCardIndex === details.words.length - 1}
            className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:bg-blue-600 disabled:hover:translate-y-0 disabled:shadow-none transition-all duration-200"
          >
            {currentCardIndex === details.words.length - 1 ? 'Hoàn thành' : 'Tiếp theo'}
          </button>
        </div>
      </div>
    </div>
  );
};