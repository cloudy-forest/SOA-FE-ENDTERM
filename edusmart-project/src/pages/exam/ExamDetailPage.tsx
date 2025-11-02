// src/pages/exam/ExamDetailPage.tsx
import { useEffect, useState, useMemo } from 'react';
import type { ChangeEvent, FormEvent } from 'react';        
import { Link, useParams } from 'react-router-dom';
import { fetchMockExamById, mockComments } from '../../data/mockExams';
import type { Exam, MockComment } from '../../types/exam';
import { Spinner } from '../../components/ui/Spinner';
import { useAppSelector } from '../../app/hooks';

// Import các component con
import { AuthorCard } from './components/AuthorCard';
import { RelatedExamCard } from './components/RelatedExamCard';
import { PromoCard } from './components/PromoCard';

// Import Icons
import { 
  PlayIcon, ClockIcon, QuestionMarkCircleIcon, UserGroupIcon, 
  CalendarDaysIcon, ChatBubbleBottomCenterTextIcon, HandThumbUpIcon, 
  TagIcon, PencilIcon, StarIcon, DocumentTextIcon 
} from '@heroicons/react/24/outline';

// Helper (có thể chuyển ra utils sau)
const getTypeText = (type: string) => {
  const map: Record<string, string> = {
    fullTest: 'Thi thử (Full test)',
    test45: 'Kiểm tra 45 phút',
    test15: 'Kiểm tra 15 phút',
    practice: 'Luyện tập',
  };
  return map[type] || type;
};

// Component con cho phần bình luận (giữ local)
const CommentItem = ({ comment }: { comment: MockComment }) => (
  <div className="flex space-x-4 py-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
      <span className="font-semibold text-blue-600 dark:text-blue-300">{comment.avatarInitials}</span>
    </div>
    <div>
      <div className="flex items-center space-x-2">
        <span className="font-semibold text-gray-900 dark:text-white">{comment.user}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">{comment.time}</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mt-1">{comment.text}</p>
      <button className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 mt-2 hover:text-blue-600 dark:hover:text-blue-400">
        <HandThumbUpIcon className="w-4 h-4" />
        <span>{comment.likes}</span>
      </button>
    </div>
  </div>
);

// Component con cho Ô nhập bình luận (giữ local)
const CommentInputBox = ({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent) => void;
}) => {
  // KIỂM TRA ĐĂNG NHẬP 
  const user = useAppSelector(state => state.auth.user);

  if (!user) {
    return (
      <div className="mb-6 p-4 text-center bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-700 dark:text-gray-300">
          Vui lòng <Link to="/login" className="font-semibold text-blue-600 hover:underline">đăng nhập</Link> để bình luận.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mb-6">
      <textarea
        className="comment-textarea" 
        rows={3}
        placeholder="Viết bình luận của bạn..."
        value={value}
        onChange={onChange}
      />
      <div className="flex justify-end mt-3">
        <button
          type="submit"
          className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          disabled={!value.trim()}
        >
          Gửi bình luận
        </button>
      </div>
    </form>
  );
};


export const ExamDetailPage = () => {
  const { examId } = useParams<{ examId: string }>();
  
  // State chính
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);
  
  // State cho Bình luận (để cho phép thêm mới)
  const [comments, setComments] = useState<MockComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [sortOrder, setSortOrder] = useState<'newest' | 'popular'>('newest');

  // 1. Tải dữ liệu
  useEffect(() => {
    if (!examId) return;
    const loadExam = async () => {
      try {
        setLoading(true);
        const data = await fetchMockExamById(examId);
        setExam(data);
        setComments(mockComments); // Tải mock comments vào state
      } catch (err) {
        console.error("Lỗi tải chi tiết đề thi:", err);
      } finally {
        setLoading(false);
      }
    };
    loadExam();
  }, [examId]);

  // 2. Logic sắp xếp bình luận (dùng useMemo)
  const sortedComments = useMemo(() => {
    return [...comments].sort((a, b) => {
      if (sortOrder === 'popular') {
        return b.likes - a.likes; // Phổ biến: Lượt like cao lên đầu
      }
      // Mới nhất: ID cao lên đầu (giả sử)
      return b.id - a.id; 
    });
  }, [comments, sortOrder]);

  // 3. Logic gửi bình luận
  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    // Tạo comment mới (trong dự án thật, đây là user đang đăng nhập)
    const newCommentObj: MockComment = {
      id: comments.length + 100, // ID tạm thời
      user: 'Bạn (Người dùng)', 
      avatarInitials: 'BẠN',
      time: 'Vừa xong',
      text: newComment,
      likes: 0,
    };
    
    // Thêm comment mới vào đầu danh sách
    setComments([newCommentObj, ...comments]);
    setNewComment(""); // Xóa nội dung ô input
  };

  // Render (Loading)
  if (loading) {
    return (
      <div className="flex justify-center items-center py-40">
        <Spinner />
      </div>
    );
  }

  // Render (Không tìm thấy)
  if (!exam) {
    return (
      <div className="py-40 text-center text-gray-600 dark:text-gray-400">
        Không tìm thấy đề thi.
      </div>
    );
  }

  // Render (Nội dung chính)
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li><Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">Trang chủ</Link></li>
              <li><span className="mx-1 text-gray-400 dark:text-gray-500">/</span></li>
              <li><Link to="/exams" className="text-blue-600 dark:text-blue-400 hover:underline">Đề thi</Link></li>
              <li><span className="mx-1 text-gray-400 dark:text-gray-500">/</span></li>
              <li className="text-gray-700 dark:text-gray-300 truncate w-48 sm:w-auto">{exam.title}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Cột trái (Nội dung) - 2/3 */}
          <div className="lg:w-2/3 space-y-8">
            
            {/* Card 1: Thông tin chính VÀ Nút làm bài */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              {/* Tiêu đề */}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">{exam.title}</h1>
              
              {/* Thông tin thống kê (Stats) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4 text-gray-600 dark:text-gray-400 mb-8">
                <span className="flex items-center"><QuestionMarkCircleIcon className="w-5 h-5 mr-1.5 text-blue-500" /> {exam.questions} câu hỏi</span>
                <span className="flex items-center"><ClockIcon className="w-5 h-5 mr-1.5 text-blue-500" /> {exam.duration} phút</span>
                <span className="flex items-center"><UserGroupIcon className="w-5 h-5 mr-1.5 text-blue-500" /> {exam.attempts.toLocaleString('vi-VN')} lượt thi</span>
                {exam.averageScore && (
                  <span className="flex items-center"><StarIcon className="w-5 h-5 mr-1.5 text-blue-500" /> {exam.averageScore} điểm TB</span>
                )}
                <span className="flex items-center"><DocumentTextIcon className="w-5 h-5 mr-1.5 text-blue-500" /> {getTypeText(exam.type)}</span>
                <span className="flex items-center"><TagIcon className="w-5 h-5 mr-1.5 text-blue-500" /> {exam.difficulty}</span>
                <span className="flex items-center"><PencilIcon className="w-5 h-5 mr-1.5 text-blue-500" /> Nguồn: {exam.source}</span>
                <span className="flex items-center"><CalendarDaysIcon className="w-5 h-5 mr-1.5 text-blue-500" /> {new Date(exam.createdAt).toLocaleDateString('vi-VN')}</span>
              </div>

              {/* Nút làm bài (chuyển lên đây) */}
              <a
                href={`/exam/take/${exam.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/50"
              >
                <PlayIcon className="w-6 h-6" />
                Bắt đầu làm bài
              </a>
            </div>

            {/* Card 2: Mô tả */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Mô tả đề thi</h2>
              <div 
                className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: exam.description }}
              />
            </div>
            
            {/* Card 3: Phân tích nội dung */}
            {exam.contentCoverage && exam.contentCoverage.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Phân tích nội dung</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-gray-700 dark:text-gray-300">
                  {exam.contentCoverage.map(item => (
                    <li key={item.topic} className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-700">
                      <span>{item.topic}</span>
                      <span className="font-medium">{item.count} câu</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Card 4: Tác giả (đã lưu) */}
            <AuthorCard 
              name={exam.author}
              title={exam.authorTitle}
              bio={exam.authorBio}
              imageUrl={exam.authorImage}
            />

            {/* Card 5: Bình luận (cho phép viết và sắp xếp) */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              {/* Header bình luận + Sắp xếp */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-0 flex items-center">
                  <ChatBubbleBottomCenterTextIcon className="w-6 h-6 mr-2" />
                  Bình luận ({comments.length})
                </h2>
                <div>
                  <label htmlFor="sortComments" className="text-sm font-medium text-gray-600 dark:text-gray-400 mr-2">Sắp xếp:</label>
                  <select
                    id="sortComments"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'newest' | 'popular')}
                    className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="newest">Mới nhất</option>
                    <option value="popular">Phổ biến nhất</option>
                  </select>
                </div>
              </div>
              
              {/* Ô viết bình luận */}
              <CommentInputBox 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onSubmit={handleCommentSubmit}
              />

              {/* Danh sách bình luận đã sắp xếp */}
              <div className="space-y-2">
                {sortedComments.length > 0 ? (
                  sortedComments.map(comment => (
                    <CommentItem key={comment.id} comment={comment} />
                  ))
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-4">Chưa có bình luận nào.</p>
                )}
              </div>
            </div>
          </div>

          {/* Cột phải (Sidebar) - 1/3 */}
          <div className="lg:w-1/3">
            <div className="space-y-8 sticky top-24">
              {/* (Nút bắt đầu đã bị chuyển lên trên) */}
              
              {/* PR (Quảng cáo) */}
              <PromoCard />

              {/* Đề liên quan */}
              {exam.relatedExams && exam.relatedExams.length > 0 && (
                <RelatedExamCard exams={exam.relatedExams} />
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};