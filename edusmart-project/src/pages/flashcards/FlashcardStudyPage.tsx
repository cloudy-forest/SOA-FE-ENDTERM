// // src/pages/flashcard/FlashcardStudyPage.tsx
// import { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import type { FlashcardDetail } from '../../types/flashcard';
// // ▼▼▼ 1. IMPORT CÁC THÀNH PHẦN MỚI ▼▼▼
// import { getFlashcardDetail, addWordToSet } from '../../services/flashcardService';
// import { AddWordModal } from './components/AddWordModal';
// import type { WordFormInputs } from './components/AddWordModal';
// import { Spinner } from '../../components/ui/Spinner';
// import { 
//   ChevronLeftIcon,
//   PlusIcon,
//   TableCellsIcon,
//   PencilSquareIcon,
//   BookOpenIcon,
//   SpeakerWaveIcon // (Thêm icon Loa)
// } from '@heroicons/react/24/outline';
// import clsx from 'clsx';
// export const FlashcardStudyPage = () => {
//   const { flashcardId } = useParams<{ flashcardId: string }>();
//   const [details, setDetails] = useState<FlashcardDetail | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
  
//   // ▼▼▼ 2. STATE ĐỂ QUẢN LÝ MODAL ▼▼▼
//   const [isAddWordModalOpen, setIsAddWordModalOpen] = useState(false);

//   // Hàm tải/tải lại data
//   const loadData = async () => {
//     if (!flashcardId) return;
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await getFlashcardDetail(parseInt(flashcardId));
//       setDetails(data);
//     } catch (err) {
//       console.error("Lỗi tải chi tiết bộ thẻ:", err);
//       setError("Không thể tải bộ thẻ này.");
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   useEffect(() => {
//     loadData();
//   }, [flashcardId]);

//   // ▼▼▼ 3. HÀM XỬ LÝ SUBMIT TỪ MODAL ▼▼▼
//   const handleAddWordSubmit = async (data: WordFormInputs) => {
//     if (!details) return;
//     try {
//       await addWordToSet(details.id, data);
//       setIsAddWordModalOpen(false); // Đóng modal
//       await loadData(); // Tải lại data (để hiển thị từ mới)
//     } catch (err) {
//       console.error(err);
//       alert("Lỗi khi thêm từ mới.");
//     }
//   };

//   if (loading) {
//     return <div className="flex justify-center items-center h-[50vh]"><Spinner /></div>;
//   }

//   if (error || !details) {
//     return <div className="text-center p-12 text-red-500">{error || 'Không tìm thấy dữ liệu.'}</div>;
//   }

//   // Biến kiểm tra xem có từ nào không
//   const hasWords = details.words.length > 0;
  
//   return (
//     <>
//       <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
//         {/* 1. Banner (Đã sửa) */}
//         <div className="max-w-5xl mx-auto pt-8 px-4">
//           <div className="h-32 md:h-40 bg-gray-300 relative rounded-lg overflow-hidden">
//             <img 
//               src={details.bannerUrl || 'https://images.unsplash.com/photo-1497633762265-9d179a990aaa?q=80&w=2070&auto=format&fit=crop'} 
//               alt="Ảnh bìa bộ thẻ" 
//               className="w-full h-full object-cover"
//             />
//             <Link 
//               to="/flashcards" 
//               className="absolute top-4 left-4 bg-white/70 backdrop-blur-sm rounded-full p-2 text-gray-800 hover:bg-white"
//             >
//               <ChevronLeftIcon className="w-5 h-5" />
//             </Link>
//           </div>
//         </div>

//         <div className="max-w-5xl mx-auto py-8 px-4">
//           {/* 2. Tiêu đề và Nút bấm */}
//           <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{details.title}</h1>
//               <p className="text-gray-600 dark:text-gray-400">{details.description}</p>
//             </div>
            
//             <Link 
//               to={`/flashcards/${details.id}/study`}
//               // Thêm logic vô hiệu hóa (disable)
//               aria-disabled={!hasWords}
//               onClick={(e) => {
//                 if (!hasWords) e.preventDefault(); // Ngăn click nếu không có từ
//               }}
//               className={clsx(
//                 'flex items-center justify-center px-6 py-3 rounded-lg font-medium shadow-md',
//                 !hasWords
//                   ? 'bg-gray-400 text-gray-600 cursor-not-allowed' // Style khi bị vô hiệu hóa
//                   : 'bg-blue-600 text-white hover:bg-blue-700' // Style khi bình thường
//               )}
//             >
//               <BookOpenIcon className="w-5 h-5 mr-2" />
//               Bắt đầu học ({details.number_of_word} thẻ)
//             </Link>
//           </div>

//           {/* 3. Dòng chú ý (Giữ nguyên) */}
//           <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 p-4 rounded-md mb-6">
//             {/* ... (Nội dung chú ý) ... */}
//           </div>

//           {/* ▼▼▼ 4. BA NÚT QUẢN LÝ (ĐÃ KẾT NỐI NÚT "THÊM TỪ MỚI") ▼▼▼ */}
//           <div className="flex items-center space-x-3 mb-6">
//             <button 
//               onClick={() => setIsAddWordModalOpen(true)}
//               className="flex items-center bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm font-medium"
//             >
//               <PlusIcon className="w-4 h-4 mr-2" />
//               Thêm từ mới
//             </button>
//             <button className="flex items-center bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm font-medium">
//               <TableCellsIcon className="w-4 h-4 mr-2" />
//               Tạo hàng loạt
//             </button>
//             <button className="flex items-center bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm font-medium">
//               <PencilSquareIcon className="w-4 h-4 mr-2" />
//               Chỉnh sửa
//             </button>
//           </div>

//           {/* ▼▼▼ 5. DANH SÁCH TỪ (HIỂN THỊ DANH SÁCH THẬT) ▼▼▼ */}
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//             {details.words.length === 0 ? (
//               <div className="text-center p-12">
//                 <h3 className="text-lg font-medium text-gray-900 dark:text-white">Chưa có flashcard nào</h3>
//                 <p className="text-gray-500 dark:text-gray-400 mt-1">Hãy bắt đầu bằng cách "Thêm từ mới".</p>
//               </div>
//             ) : (
//               <div className="divide-y divide-gray-200 dark:divide-gray-700">
//                 {details.words.map((word) => (
//                   <div key={word.id} className="p-4 md:p-6 flex justify-between items-center">
//                     {/* Từ và Phiên âm */}
//                     <div className="w-1/3">
//                       <p className="font-medium text-gray-900 dark:text-white">{word.text}</p>
//                       <p className="text-sm text-gray-500">{word.phonetic}</p>
//                     </div>
//                     {/* Định nghĩa */}
//                     <div className="w-2/3 px-4">
//                       <p className="text-gray-700 dark:text-gray-300">{word.definition}</p>
//                     </div>
//                     {/* Nút Loa (chưa có chức năng) */}
//                     <button className="p-2 text-gray-500 hover:text-blue-600">
//                       <SpeakerWaveIcon className="w-5 h-5" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* 6. MODAL (RENDER Ở CUỐI) */}
//       <AddWordModal 
//         isOpen={isAddWordModalOpen}
//         onClose={() => setIsAddWordModalOpen(false)}
//         onSubmit={handleAddWordSubmit}
//       />
//     </>
//   );
// };

// src/pages/flashcard/FlashcardStudyPage.tsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { FlashcardDetail } from '../../types/flashcard';
import { getFlashcardDetail, addWordToSet } from '../../services/product/flashcardService';
import { Spinner } from '../../components/ui/Spinner';

// ▼▼▼ FIX LỖI 1: Import type riêng biệt ▼▼▼
import { AddWordModal } from './components/AddWordModal';
import type { WordFormInputs } from './components/AddWordModal'; 

import { 
  ChevronLeftIcon, PlusIcon, TableCellsIcon, 
  BookOpenIcon, SpeakerWaveIcon 
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

export const FlashcardStudyPage = () => {
  const { flashcardId } = useParams<{ flashcardId: string }>();
  const [details, setDetails] = useState<FlashcardDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddWordModalOpen, setIsAddWordModalOpen] = useState(false);

  const loadData = async () => {
    if (!flashcardId) return;
    try {
      setLoading(true);
      setError(null);
      const data = await getFlashcardDetail(parseInt(flashcardId));
      setDetails(data);
    } catch (err) {
      // ▼▼▼ FIX LỖI 3: Log biến err để không bị báo unused ▼▼▼
      console.error("Lỗi tải trang:", err);
      setError("Không thể tải thông tin bộ thẻ này.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => { loadData(); }, [flashcardId]);

  const handleAddWordSubmit = async (data: WordFormInputs) => {
    if (!details) return;
    try {
      // ▼▼▼ FIX LỖI 2: Map dữ liệu từ Form sang Service thủ công ▼▼▼
      // Service cần: { text, definition, phonetic, type }
      // Form Input (WordFormInputs) có thể là: { term, definition, phonetic, type }
      await addWordToSet(details.id, {
        text: data.term, // Map 'term' từ form sang 'text' của backend
        definition: data.definition,
        phonetic: data.phonetic || '',
        type: data.type || 'noun'
      });
      
      setIsAddWordModalOpen(false);
      loadData(); 
    } catch (err) {
      console.error(err);
      alert("Lỗi khi thêm từ mới. Vui lòng thử lại.");
    }
  };

  if (loading) return <div className="flex justify-center h-[50vh] items-center"><Spinner /></div>;
  if (error || !details) return <div className="text-center p-12 text-red-500">{error}</div>;

  const hasWords = details.words.length > 0;
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-12">
      <div className="max-w-5xl mx-auto pt-8 px-4">
        <div className="h-32 md:h-40 bg-gray-200 relative rounded-lg overflow-hidden shadow-sm">
          <img 
            src={details.thumbnail_url || 'https://via.placeholder.com/1200x400/e5e7eb/9ca3af?text=Study5+Flashcard'} 
            alt={details.title} 
            className="w-full h-full object-cover"
          />
          <Link 
            to="/flashcards" 
            className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white text-gray-700 transition-all shadow-sm"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{details.title}</h1>
            <p className="text-gray-600 dark:text-gray-400">{details.description}</p>
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
               <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">
                 {details.language || 'English'}
               </span>
               <span>•</span>
               <span>{details.words.length} từ vựng</span>
            </div>
          </div>
          
          <Link 
            to={`/flashcards/${details.id}/learn`}
            onClick={(e) => !hasWords && e.preventDefault()}
            className={clsx(
              'flex-shrink-0 flex items-center justify-center px-6 py-3 rounded-lg font-bold shadow-md transition-all',
              hasWords 
                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:scale-95' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            )}
          >
            <BookOpenIcon className="w-5 h-5 mr-2" />
            Bắt đầu học
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button 
            onClick={() => setIsAddWordModalOpen(true)} 
            className="flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 font-medium shadow-sm transition-colors"
          >
            <PlusIcon className="w-5 h-5 mr-2 text-blue-600" /> Thêm từ mới
          </button>
           {/* Các nút dummy khác */}
           <button className="flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 font-medium shadow-sm transition-colors">
            <TableCellsIcon className="w-5 h-5 mr-2" /> Tạo hàng loạt
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {details.words.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <BookOpenIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Bộ thẻ trống</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
                Hãy thêm những từ vựng đầu tiên để bắt đầu học tập hiệu quả hơn.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {details.words.map((word) => (
                <div key={word.id} className="p-4 md:p-5 flex flex-col md:flex-row md:items-center hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors group">
                  <div className="md:w-1/3 mb-2 md:mb-0 border-l-4 border-blue-500 pl-4">
                    <p className="font-bold text-lg text-gray-900 dark:text-white">{word.text}</p>
                    <p className="text-sm text-gray-500 font-mono mt-0.5">{word.phonetic}</p>
                  </div>
                  <div className="md:w-2/3 flex justify-between items-start pl-4 md:pl-0">
                    <div>
                      <span className="inline-block px-2 py-0.5 mb-1 text-xs font-semibold bg-gray-100 text-gray-600 rounded">
                        {word.type_of_text}
                      </span>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{word.definition}</p>
                    </div>
                    {word.audio_link && (
                      <button className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                         <SpeakerWaveIcon className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AddWordModal 
        isOpen={isAddWordModalOpen}
        onClose={() => setIsAddWordModalOpen(false)}
        onSubmit={handleAddWordSubmit}
      />
    </div>
  );
};