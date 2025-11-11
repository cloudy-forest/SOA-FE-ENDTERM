// src/pages/admin/ExamQuestionsPage.tsx
import { useState, useEffect, Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { AdminExamDetails } from '../../types/admin';
import type { ExamQuestion } from '../../types/exam';
import { 
  getExamDetailsWithQuestions, 
  deleteQuestion, 
  createQuestion, 
  updateQuestion 
} from '../../services/adminService';
import { Spinner } from '../../components/ui/Spinner';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  ArrowLeftIcon, 
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useForm, useFieldArray } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import clsx from 'clsx';

// --- Form Inputs ---
type QuestionFormInputs = {
  content: string;
  options: { value: string }[];
  correctAnswer: number;
  explanation: string;
};

// --- Component Modal Form ---
const QuestionFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: QuestionFormInputs) => Promise<void>;
  defaultValues?: QuestionFormInputs;
}) => {
  
  const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = 
    useForm<QuestionFormInputs>({
      defaultValues: defaultValues || {
        content: '',
        options: [{ value: '' }, { value: '' }, { value: '' }, { value: '' }],
        correctAnswer: 0,
        explanation: '',
      }
    });

  const { fields, remove } = useFieldArray({
    control,
    name: "options"
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
    else reset({
      content: '',
      options: [{ value: '' }, { value: '' }, { value: '' }, { value: '' }],
      correctAnswer: 0,
      explanation: '',
    });
  }, [defaultValues, reset]);

  const handleFormSubmit: SubmitHandler<QuestionFormInputs> = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* (Toàn bộ JSX của Modal giữ nguyên, không có lỗi) */}
        <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/30" />
        </TransitionChild>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {defaultValues ? 'Cập nhật Câu hỏi' : 'Tạo Câu hỏi mới'}
                </DialogTitle>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                  <XMarkIcon className="w-6 h-6" />
                </button>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-4 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung câu hỏi</label>
                    <textarea 
                      {...register('content', { required: 'Nội dung là bắt buộc' })}
                      className="form-input" 
                      rows={3}
                    />
                    {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Các lựa chọn (Đánh dấu ô đúng)</label>
                    <div className="space-y-2">
                      {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center space-x-2">
                          <input 
                            type="radio"
                            {...register('correctAnswer', { valueAsNumber: true })}
                            value={index}
                            className="form-radio h-5 w-5 text-blue-600"
                          />
                          <input 
                            {...register(`options.${index}.value`, { required: 'Lựa chọn không được trống' })}
                            className="form-input" 
                            placeholder={`Lựa chọn ${index + 1}`}
                          />
                          {fields.length > 2 && (
                            <button type="button" onClick={() => remove(index)} className="text-red-500 hover:text-red-700">
                              <XMarkIcon className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giải thích đáp án</label>
                    <textarea 
                      {...register('explanation')}
                      className="form-input" 
                      rows={3}
                    />
                  </div>
                  <div className="pt-4">
                    <button type="submit" disabled={isSubmitting} className="flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400">
                      {isSubmitting ? <Spinner size="sm" /> : 'Lưu lại'}
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

// --- Component Trang Chính ---
export const ExamQuestionsPage = () => {
  const { examId } = useParams<{ examId: string }>();
  const [examDetails, setExamDetails] = useState<AdminExamDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<ExamQuestion | null>(null);

  // Tải data
  const loadExamDetails = async () => {
    if (!examId) return;
    try {
      setLoading(true);
      setError(null);
      const data = await getExamDetailsWithQuestions(parseInt(examId));
      setExamDetails(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Lỗi không xác định khi tải đề thi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExamDetails();
  }, [examId]);

  // Các hàm Modal
  const handleAddNew = () => {
    setEditingQuestion(null);
    setIsModalOpen(true);
  };
  const handleEdit = (question: ExamQuestion) => {
    setEditingQuestion(question);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingQuestion(null);
  };

  // Xử lý Submit
  const handleSubmit = async (data: QuestionFormInputs) => {
    if (!examId) return;
    
    const apiData: Omit<ExamQuestion, 'id'> = {
      content: data.content,
      // ▼▼▼ SỬA LỖI 1: Thêm kiểu 'any' (hoặc { value: string }) ▼▼▼
      options: data.options.map((opt: { value: string }) => opt.value),
      correctAnswer: data.correctAnswer,
      explanation: data.explanation,
    };
    
    try {
      if (editingQuestion) {
        await updateQuestion(editingQuestion.id, apiData);
      } else {
        await createQuestion(parseInt(examId), apiData);
      }
      handleCloseModal();
      await loadExamDetails();
    } catch (err: unknown) {
      if (err instanceof Error) alert(`Lỗi: ${err.message}`);
      else alert('Lỗi không xác định.');
    }
  };

  // Hàm Xóa
  const handleDelete = async (question: ExamQuestion) => {
    if (window.confirm(`Bạn có chắc muốn xóa câu hỏi "${question.content.substring(0, 20)}..."?`)) {
      try {
        await deleteQuestion(question.id);
        await loadExamDetails();
      } catch (err: unknown) {
        if (err instanceof Error) alert(`Lỗi: ${err.message}`);
        else alert('Lỗi không xác định khi xóa.');
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Spinner /></div>;
  }
  
  if (error) {
    return <div className="text-red-500 p-6">{error}</div>;
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Link to="/admin/exams" className="text-sm text-blue-600 flex items-center mb-1 hover:underline">
              <ArrowLeftIcon className="w-4 h-4 mr-1" />
              Quay lại danh sách Đề thi
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              {examDetails?.title}
            </h1>
          </div>
          <button 
            onClick={handleAddNew}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Thêm câu hỏi mới
          </button>
        </div>

        {/* Danh sách câu hỏi */}
        <div className="space-y-4">
          {examDetails?.questions.map((question, index) => (
            <div key={question.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <p className="text-base font-semibold text-gray-900">
                    <span className="text-blue-600 font-bold mr-2">Câu {index + 1}:</span>
                    {question.content}
                  </p>
                  <div className="flex-shrink-0 flex space-x-2 ml-4">
                    <button 
                      onClick={() => handleEdit(question)}
                      className="p-2 rounded-lg text-indigo-600 hover:bg-indigo-50" title="Sửa">
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(question)}
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50" title="Xóa">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex} className={clsx(
                      "flex items-center p-3 rounded-md border",
                      optIndex === question.correctAnswer
                        ? "bg-green-50 border-green-200 text-green-800"
                        : "bg-gray-50 border-gray-200 text-gray-700"
                    )}>
                      {optIndex === question.correctAnswer && (
                        <CheckCircleIcon className="w-5 h-5 mr-3 text-green-600" />
                      )}
                      <span className="font-medium">{option}</span>
                    </div>
                  ))}
                </div>
                {question.explanation && (
                  <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-blue-800">
                    <h4 className="font-semibold">Giải thích:</h4>
                    <p>{question.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Form */}
      <QuestionFormModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        defaultValues={editingQuestion ? {
          content: editingQuestion.content,
          // ▼▼▼ SỬA LỖI 2: Thêm kiểu 'string' ▼▼▼
          options: editingQuestion.options.map((opt: string) => ({ value: opt })),
          correctAnswer: editingQuestion.correctAnswer,
          explanation: editingQuestion.explanation || '',
        } : undefined}
      />
    </>
  );
};