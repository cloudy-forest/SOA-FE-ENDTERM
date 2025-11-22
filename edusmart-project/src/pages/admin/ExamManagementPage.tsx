// src/pages/admin/ExamManagementPage.tsx
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { AdminExam, Subject } from '../../types/admin';
import { fetchAllAdminExams, deleteExam, fetchAllSubjects } from '../../services/adminService';
import { Spinner } from '../../components/ui/Spinner';
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

export const ExamManagementPage = () => {
  // State cho data
  const [exams, setExams] = useState<AdminExam[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State cho bộ lọc
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  // Tải data (cả Đề thi và Chủ đề)
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [examsData, subjectsData] = await Promise.all([
          fetchAllAdminExams(),
          fetchAllSubjects(),
        ]);
        setExams(examsData);
        setSubjects(subjectsData);
        
      // ▼▼▼ ĐÂY LÀ CHỖ SỬA LỖI QUAN TRỌNG NHẤT ▼▼▼
      } catch (err: unknown) { // <-- Thêm {
        if (err instanceof Error) setError(err.message);
        else setError('Lỗi không xác định khi tải dữ liệu.');
      } finally { // <-- Thêm }
        setLoading(false);
      }
      // ▲▲▲ HẾT SỬA LỖI ▲▲▲
    };
    loadData();
  }, []); // <-- Dấu ngoặc vuông này là đúng

  // Logic lọc
  const filteredExams = useMemo(() => {
    let tempExams = exams;
    if (selectedSubject) {
      tempExams = tempExams.filter(exam => exam.subject === selectedSubject);
    }
    if (searchTerm) {
      tempExams = tempExams.filter(exam => 
        exam.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return tempExams;
  }, [exams, searchTerm, selectedSubject]);

  // Hàm Xóa
  const handleDelete = async (examId: number) => {
    const exam = exams.find(e => e.id === examId);
    if (!exam) return;
    
    if (window.confirm(`Bạn có chắc muốn xóa đề thi "${exam.title}"?`)) {
      try {
        await deleteExam(examId);
        const data = await fetchAllAdminExams();
        setExams(data);
      } catch (err: unknown) {
        if (err instanceof Error) alert(`Lỗi: ${err.message}`);
        else alert('Lỗi không xác định khi xóa.');
      }
    }
  };

  // --- Render (Phần này sẽ hết lỗi sau khi sửa useEffect) ---
  if (loading) {
    return <div className="flex justify-center p-12"><Spinner /></div>;
  }
  
  if (error) {
    return <div className="text-red-500 p-6">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* 1. Header của trang */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Quản lý Đề thi ({filteredExams.length})
        </h1>
        <Link 
          to="/admin/exams/create"
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Tạo đề thi mới
        </Link>
      </div>

      {/* 2. UI Bộ lọc và Tìm kiếm */}
      <div className="p-4 bg-white rounded-xl border border-gray-200 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <input 
            type="text" 
            placeholder="Tìm theo tên đề thi..." 
            className="form-input pl-10"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <div className="relative flex-shrink-0 md:w-64">
          <select 
            className="form-input pl-10"
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
          >
            <option value="">Tất cả Chủ đề</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>
          <FunnelIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>
      
      {/* 3. GIAO DIỆN BẢNG (TABLE) */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề Đề thi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chủ đề</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thông số</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExams.length > 0 ? (
                filteredExams.map(exam => (
                  <tr key={exam.id} className="table-row">
                    
                    {/* Cột Tiêu đề */}
                    <td className="px-6 py-4 max-w-sm">
                      <div className="text-sm font-semibold text-gray-900 truncate">{exam.title}</div>
                      <div className="text-xs text-gray-500 font-mono mt-1">ID: {exam.id}</div>
                    </td>
                    
                    {/* Cột Chủ đề (Badge) */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={clsx("badge", 
                        "badge-info", // Mặc định
                        exam.subject === 'math' && 'badge-success',
                        exam.subject === 'ielts' && 'badge-warning'
                      )}>
                        {exam.subject}
                      </span>
                    </td>
                    
                    {/* Cột Thông số (Icons) */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-700">
                        <QuestionMarkCircleIcon className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" />
                        {exam.questionCount} câu hỏi
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <ClockIcon className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" />
                        {exam.duration} phút
                      </div>
                    </td>
                    
                    {/* Cột Hành động (Icons) */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/admin/exams/questions/${exam.id}`}
                        className="p-2 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors"
                        title="Quản lý câu hỏi"
                      >
                        <PencilSquareIcon className="w-5 h-5" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(exam.id)}
                        className="p-2 ml-2 rounded-lg text-red-500 hover:bg-red-100 transition-colors"
                        title="Xóa Đề thi"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                    
                  </tr>
                ))
              ) : (
                /* Khi không có kết quả lọc */
                <tr>
                  <td colSpan={4} className="text-center p-12">
                    <h3 className="text-lg font-medium text-gray-900">Không tìm thấy kết quả</h3>
                    <p className="text-gray-500 mt-2">Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};