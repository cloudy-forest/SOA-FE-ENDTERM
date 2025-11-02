// src/routes/index.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from '../pages/HomePage'; // Sẽ tạo file này
// import { Header } from '../components/layout/Header'; // Sẽ tạo sau
// import { Footer } from '../components/layout/Footer'; // Sẽ tạo sau
import { ExamTakingPage } from '../pages/exam/ExamTakingPage';
import { MainLayout } from '../components/layout/MainLayout';
import { CourseProgramPage } from '../pages/courses/CourseProgramPage';
import { ExamListPage } from '../pages/exam/ExamListPage';
import { ExamDetailPage } from '../pages/exam/ExamDetailPage';
import { FlashcardListPage } from '../pages/flashcards/FlashcardListPage';
import { BlogListPage } from '../pages/blog/BlogListPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { CourseDetailPage } from '../pages/courses/CourseDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // Sử dụng layout chung
    children: [
      {
        index: true, // Trang chủ sẽ nằm ở path '/'
        element: <HomePage />,
      },
      // Thêm các trang khác vào đây sau
      { path: 'courses', element: <CourseProgramPage /> },
      { path: 'courses/:courseId', element: <CourseDetailPage />},
      { path: 'exams', element: <ExamListPage /> },
      { path: 'exam/detail/:examId', element: <ExamDetailPage /> },
      { path: 'flashcards', element: <FlashcardListPage /> },
      { path: 'blog', element: <BlogListPage /> },
      { path: 'login', element: <LoginPage /> },
    ],
  },
  // Các trang không dùng layout chung (như Login, ExamTaking) sẽ ở đây
  // { path: '/login', element: <LoginPage /> },
  { path: '/exam/take/:examId',
    element: <ExamTakingPage /> },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};