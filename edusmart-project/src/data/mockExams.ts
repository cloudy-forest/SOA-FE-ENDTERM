// src/data/mockExams.ts
import type { 
    Exam, 
    ExamQuestion,
    ExamSubject,
    ExamLevel,
    ExamType,
    ExamSort,
    RelatedExamInfo,
    ContentCoverageItem, 
    MockComment
} from '../types/exam';

// Helper tạo data nhanh
const createExam = (id: number, partial: Partial<Exam>): Exam => ({
    id,
    title: `Đề thi mẫu số ${id}`,
    subject: 'math',
    level: 'university',
    type: 'fullTest',
    source: 'teacher1',
    duration: 90,
    questions: 50,
    attempts: Math.floor(Math.random() * 2000) + 100,
    comments: Math.floor(Math.random() * 50) + 5,
    difficulty: 'Trung bình',
    createdAt: new Date(Date.now() - id * 1000 * 3600 * 24).toISOString(),
    author: 'EduSmart Team',
    authorTitle: 'Team',
    authorBio: '...',
    description: '...',
    contentCoverage: [],
    ...partial,
});

// Tạo 50 đề thi mẫu
export const allExams: Exam[] = Array.from({ length: 50 }, (_, i) => {
  const id = i + 1;
  return createExam(id, {
    title: `Đề thi ${['Toán', 'Lý', 'Hóa', 'Anh', 'IELTS'][i % 5]} - Mã đề ${100 + id}`,
    subject: ['math', 'physics', 'chemistry', 'english', 'ielts'][i % 5] as ExamSubject,
    level: ['grade10', 'grade11', 'grade12', 'university', 'basic'][i % 5] as ExamLevel,
    type: ['fullTest', 'test45', 'test15', 'practice'][i % 4] as ExamType,
  });
});

// Dùng cho UI (component lọc)
export const subjectFilters: { id: ExamSubject; name: string }[] = [
  { id: 'math', name: 'Toán học' },
  { id: 'physics', name: 'Vật lý' },
  { id: 'chemistry', name: 'Hóa học' },
  { id: 'english', name: 'Tiếng Anh' },
  { id: 'ielts', name: 'IELTS' },
  { id: 'toeic', name: 'TOEIC' },
];

export const levelFilters: { id: ExamLevel; name: string }[] = [
  { id: 'grade10', name: 'Lớp 10' },
  { id: 'grade11', name: 'Lớp 11' },
  { id: 'grade12', name: 'Lớp 12' },
  { id: 'university', name: 'Luyện thi ĐH' },
  { id: 'basic', name: 'Cơ bản' },
  { id: 'advanced', name: 'Nâng cao' },
];

export const typeFilters: { id: ExamType; name: string }[] = [
  { id: 'fullTest', name: 'Đề thi thử' },
  { id: 'test45', name: 'Kiểm tra 45 phút' },
  { id: 'test15', name: 'Kiểm tra 15 phút' },
  { id: 'practice', name: 'Luyện tập' },
];

export const examSortOptions: { id: ExamSort; name: string }[] = [
  { id: 'newest', name: 'Mới nhất' },
  { id: 'popular', name: 'Phổ biến nhất' }, // (Sẽ sort theo 'attempts')
  { id: 'attempts-low', name: 'Lượt thi (thấp-cao)' },
  { id: 'attempts-high', name: 'Lượt thi (cao-thấp)' },
];
const mockRelatedExams: RelatedExamInfo[] = [
  { id: 2, title: 'Đề thi thử THPT 2024 - Toán (Đề 2)', questions: 50, duration: 90 },
  { id: 15, title: 'Kiểm tra 45 phút - Hàm số lớp 12', questions: 25, duration: 45 },
  { id: 30, title: 'Luyện tập Toán 12 - Tích phân', questions: 20, duration: 0 },
];

const mockContentCoverage: ContentCoverageItem[] = [
  { topic: 'Hàm số và đồ thị', count: 12 },
  { topic: 'Tích phân', count: 6 },
  { topic: 'Hình học không gian', count: 10 },
  { topic: 'Số phức', count: 6 },
  { topic: 'Lượng giác', count: 8 },
  { topic: 'Xác suất thống kê', count: 8 },
];

export const mockComments: MockComment[] = [
 { id: 1, user: 'Hoàng Nam', avatarInitials: 'HN', time: '2 giờ trước', text: 'Đề thi rất hay và sát với cấu trúc đề thi thật. Cảm ơn team!', likes: 12 },
 { id: 2, user: 'Mai Linh', avatarInitials: 'ML', time: '5 giờ trước', text: 'Mình làm được 42/50 câu. Phần tích phân hơi khó, cần ôn lại thêm.', likes: 8 },
 { id: 3, user: 'Đức Thành', avatarInitials: 'DT', time: '1 ngày trước', text: 'Đề hay, độ khó vừa phải. Lời giải rất dễ hiểu.', likes: 15 },
];
// Data mẫu cho câu hỏi chi tiết
const mockExam1Questions: ExamQuestion[] = Array.from({ length: 50 }, (_, i) => {
    const questionId = i + 1;
    const baseQuestions = [
        { content: "Tìm tập xác định của hàm số <strong>y = √(x - 2) + 1/(x + 3)</strong>", options: ["D = [2; +∞) \\ {-3}", "D = [2; +∞)", "D = (-∞; -3) ∪ [2; +∞)", "D = (-3; +∞)"] },
        { content: "Cho hàm số <strong>y = x³ - 3x + 1</strong>. Tìm giá trị cực đại của hàm số.", options: ["y = 3", "y = -1", "y = 1", "y = 2"] },
        { content: "Tính đạo hàm của hàm số <strong>y = ln(x² + 1)</strong>", options: ["y' = 2x/(x² + 1)", "y' = 1/(x² + 1)", "y' = 2x", "y' = x/(x² + 1)"] },
        { content: "Nguyên hàm của <strong>f(x) = sin(2x)</strong> là:", options: ["-1/2 * cos(2x) + C", "1/2 * cos(2x) + C", "-cos(2x) + C", "cos(2x) + C"] },
        { content: "Thể tích khối chóp có diện tích đáy B và chiều cao h là:", options: ["V = 1/3 * B * h", "V = B * h", "V = 1/2 * B * h", "V = 3 * B * h"] },
    ];
    const baseQ = baseQuestions[i % baseQuestions.length];

    return {
        id: questionId,
        content: `Câu ${questionId}: ${baseQ.content}`,
        options: baseQ.options,
    };
});

// Hàm giả lập fetch API
export const fetchMockExamById = (examId: string): Promise<Exam> => {
    console.log(`(Mock API) Đang tải dữ liệu chi tiết cho đề thi ID: ${examId}`);
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (examId) {
                const mockExamDetail: Exam = {
                    id: parseInt(examId) || 1,
                    title: 'Đề thi thử THPT Quốc gia 2024 - Toán (Mock)',
                    subject: 'math',
                    level: 'university',
                    type: 'fullTest',
                    source: 'Trường THPT Chuyên KHTN',
                    duration: 90,
                    questions: 50,
                    attempts: 1234,
                    comments: mockComments.length, // Lấy độ dài thật
                    difficulty: 'Nâng cao',
                    createdAt: new Date('2025-10-20T10:00:00Z').toISOString(),
                    author: "Thầy Nguyễn Văn A",
                    authorTitle: "Giáo viên Chuyên Toán - ĐH Quốc Gia",
                    authorBio: "15 năm kinh nghiệm giảng dạy, chuyên luyện thi học sinh giỏi và ôn thi THPT Quốc gia. Tác giả của nhiều đầu sách tham khảo...",
                    authorImage: "https://i.pravatar.cc/150?img=68", // Ảnh mẫu
                    description: `
                      <p>Đề thi thử THPT Quốc gia môn Toán này được biên soạn bám sát cấu trúc mới nhất của Bộ Giáo dục và Đào tạo.</p>
                      <p>Nội dung đề thi bao quát toàn bộ kiến thức trọng tâm, với các câu hỏi được phân bổ hợp lý từ mức độ nhận biết, thông hiểu, vận dụng đến vận dụng cao, giúp học sinh đánh giá chính xác năng lực.</p>
                      <p>Đây là tài liệu quý giá để các em rèn luyện kỹ năng, chiến thuật làm bài trước khi bước vào kỳ thi chính thức.</p>
                    `,
                    contentCoverage: mockContentCoverage, 
                    detailedQuestions: mockExam1Questions, 
                    relatedExams: mockRelatedExams,
                    averageScore: 8.2,
                };
                resolve(mockExamDetail);
            } else {
                reject(new Error('Exam ID not provided'));
            }
        }, 500); 
    });
};
