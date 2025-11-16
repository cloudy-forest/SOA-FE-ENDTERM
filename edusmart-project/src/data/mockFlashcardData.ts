// // src/data/mockFlashcards.ts
// import type { 
//     FlashcardSet, 
//     FlashcardSubject, 
//     FlashcardLevel, 
//     FlashcardSort 
// } from '../types/flashcard';

// // Tạo 30 bộ flashcard mẫu (cho tab "Khám phá")
// export const allFlashcardSets: FlashcardSet[] = Array.from({ length: 30 }, (_, i) => {
//     const id = i + 1;
//     const subject = ['english', 'math', 'physics', 'ielts', 'chemistry'][i % 5] as FlashcardSubject;
//     const level = ['basic', 'grade10', 'university', 'advanced', 'grade12'][i % 5] as FlashcardLevel;
    
//     return {
//         id,
//         title: `Bộ thẻ ${['Từ vựng', 'Công thức', 'Định lý'][i % 3]} ${subject.toUpperCase()}`,
//         description: 'Tổng hợp các thuật ngữ và khái niệm quan trọng nhất bạn cần biết để thành thạo chủ đề này.',
//         termCount: Math.floor(Math.random() * 100) + 20, // 20-120 thẻ
//         author: 'Giáo viên EduSmart',
//         authorImage: `https://i.pravatar.cc/150?img=${i + 10}`,
//         subject: subject,
//         level: level,
//         createdAt: new Date(Date.now() - id * 1000 * 3600 * 48).toISOString(), // 48 giờ trước * id
//         views: Math.floor(Math.random() * 5000) + 200,
//     };
// });

// // (Sau này, bạn sẽ có một mảng data riêng cho "Bộ thẻ của tôi")
// export const myFlashcardSets: FlashcardSet[] = allFlashcardSets.slice(0, 4).map(set => ({
//     ...set,
//     author: "Bạn (Người dùng)", // Giả lập đây là thẻ của bạn
// }));

// // (Và data riêng cho "Đang học")
// export const studyingFlashcardSets: FlashcardSet[] = allFlashcardSets.slice(5, 8);


// // Dùng cho UI (component lọc)
// export const flashcardSubjectFilters: { id: FlashcardSubject; name: string }[] = [
//   { id: 'math', name: 'Toán học' },
//   { id: 'physics', name: 'Vật lý' },
//   { id: 'chemistry', name: 'Hóa học' },
//   { id: 'english', name: 'Tiếng Anh' },
//   { id: 'biology', name: 'Sinh học' },
//   { id: 'history', name: 'Lịch sử' },
//   { id: 'ielts', name: 'IELTS' },
//   { id: 'toeic', name: 'TOEIC' },
// ];

// export const flashcardLevelFilters: { id: FlashcardLevel; name: string }[] = [
//   { id: 'grade10', name: 'Lớp 10' },
//   { id: 'grade11', name: 'Lớp 11' },
//   { id: 'grade12', name: 'Lớp 12' },
//   { id: 'university', name: 'Luyện thi ĐH' },
//   { id: 'basic', name: 'Cơ bản' },
//   { id: 'advanced', name: 'Nâng cao' },
// ];

// export const flashcardSortOptions: { id: FlashcardSort; name: string }[] = [
//   { id: 'newest', name: 'Mới nhất' },
//   { id: 'popular', name: 'Xem nhiều nhất' },
//   { id: 'term-count-desc', name: 'Nhiều thẻ nhất' },
// ];

// src/data/mockFlashcardData.ts
import type { FilterOption, FlashcardDetail } from '../types/flashcard';

// export const DEFAULT_BANNER_URL = 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=2070&auto-format&fit=crop';
export const DEFAULT_BANNER_URL = 'https://plus.unsplash.com/premium_photo-1661382389422-42c09c4daeed?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
// Đây là data chi tiết mà API /products/flash-card/{id} sẽ trả về
export const mockFlashcardDetails: FlashcardDetail[] = [
  // Bộ thẻ 1 (Khớp với ID 1 ở FlashcardListPage)
  {
    id: 1,
    title: '50 Từ vựng TOEIC Cơ bản',
    language: 'en',
    description: 'Các từ vựng thiết yếu cho người mới bắt đầu luyện thi TOEIC.',
    number_of_word: 3, // Giả lập
    words: [
      { id: 101, text: 'Contract', phonetic: '/ˈkɒntrækt/', type_of_text: 'noun', definition: 'Một thỏa thuận pháp lý chính thức giữa hai hoặc nhiều người/tổ chức.' },
      { id: 102, text: 'Evaluate', phonetic: '/ɪˈvæljueɪt/', type_of_text: 'verb', definition: 'Đánh giá hoặc phán đoán giá trị, chất lượng của một cái gì đó.' },
      { id: 103, text: 'Negotiate', phonetic: '/nɪˈɡəʊʃieɪt/', type_of_text: 'verb', definition: 'Thảo luận điều gì đó một cách chính thức để đi đến thỏa thuận.' },
    ],
    views: 1250,
    author: 'EduSmart Team',
    authorImage: 'https://i.pravatar.cc/150?img=1',
    subject: 'toeic',
    level: 'easy',
    createdAt: '2025-11-10T10:00:00Z',
    bannerUrl: DEFAULT_BANNER_URL,
  },
  // Bộ thẻ 2 (Khớp với ID 2)
  {
    id: 2,
    title: 'Từ vựng chủ đề Văn phòng',
    language: 'en',
    description: 'Các từ vựng phổ biến trong môi trường công sở hàng ngày.',
    number_of_word: 2,
    words: [
      { id: 201, text: 'Stapler', phonetic: '/ˈsteɪplər/', type_of_text: 'noun', definition: 'Một thiết bị dùng để ghim các tờ giấy lại với nhau bằng ghim bấm.' },
      { id: 202, text: 'Agenda', phonetic: '/əˈdʒendə/', type_of_text: 'noun', definition: 'Một danh sách các mục cần thảo luận tại một cuộc họp.' },
    ],
    views: 890,
    author: 'Văn An',
    authorImage: 'https://i.pravatar.cc/150?img=5',
    subject: 'vocab',
    level: 'medium',
    createdAt: '2025-11-05T10:00:00Z',
    bannerUrl: DEFAULT_BANNER_URL,
  },
  // Thêm các bộ thẻ khác nếu bạn muốn...
];

// ▼▼▼ THÊM DATA MỚI CHO BỘ LỌC ▼▼▼

export const flashcardSubjectFilters: FilterOption[] = [
  { id: 'toeic', name: 'TOEIC' },
  { id: 'ielts', name: 'IELTS' },
  { id: 'vocab', name: 'Từ vựng chung' },
  { id: 'grammar', name: 'Ngữ pháp' },
];

export const flashcardLevelFilters: FilterOption[] = [
  { id: 'easy', name: 'Dễ' },
  { id: 'medium', name: 'Trung bình' },
  { id: 'hard', name: 'Khó' },
];

export const flashcardSortOptions: FilterOption[] = [
  { id: 'newest', name: 'Mới nhất' },
  { id: 'popular', name: 'Phổ biến nhất' },
  { id: 'words-asc', name: 'Số từ (Tăng dần)' },
  { id: 'words-desc', name: 'Số từ (Giảm dần)' },
];