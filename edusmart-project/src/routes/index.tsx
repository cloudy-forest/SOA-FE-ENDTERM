// src/routes/index.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layouts
import { MainLayout } from '../components/layout/MainLayout';
import { AdminLayout } from '../components/layout/AdminLayout';

// Gác cổng
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { AdminRoute } from '../components/auth/AdminRoute';

// Trang Public (Người dùng)
import { HomePage } from '../pages/HomePage';
import { CourseProgramPage } from '../pages/courses/CourseProgramPage';
import { CourseDetailPage } from '../pages/courses/CourseDetailPage';
import { ExamListPage } from '../pages/exam/ExamListPage';
import { ExamDetailPage } from '../pages/exam/ExamDetailPage';
import { ExamTakingPage } from '../pages/exam/ExamTakingPage';
import { FlashcardListPage } from '../pages/flashcards/FlashcardListPage';
import { BlogListPage } from '../pages/blog/BlogListPage';
import { LoginPage } from '../pages/auth/LoginPage';

// Trang Protected (Người dùng)
import { CheckoutPage } from '../pages/checkout/CheckoutPage';
import { ProfilePage } from '../pages/profile/ProfilePage';

// Trang Admin
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { UserManagementPage } from '../pages/admin/UserManagementPage';
import { CourseManagementPage } from '../pages/admin/CourseManagementPage';
import { CourseFormPage } from '../pages/admin/CourseFormPage';
import { SubjectManagementPage } from '../pages/admin/SubjectManagementPage';
import { ExamManagementPage } from '../pages/admin/ExamManagementPage';
import { ExamQuestionsPage } from '../pages/admin/ExamQuestionsPage';

// --- Trang Admin (Dùng Placeholder) ---
// const AdminDashboardPage = () => <h1 className="text-3xl font-bold">Bảng điều khiển</h1>;
// const UserManagementPage = () => <h1 className="text-3xl font-bold">Quản lý User</h1>;
// const CourseManagementPage = () => <h1 className="text-3xl font-bold">Quản lý Khóa học</h1>;
// const SubjectManagementPage = () => <h1 className="text-3xl font-bold">Quản lý Chủ đề</h1>;
//const ExamManagementPage = () => <h1 className="text-3xl font-bold">Quản lý Đề thi</h1>;
const PaymentManagementPage = () => <h1 className="text-3xl font-bold">Quản lý Giao dịch</h1>;
const NotificationPage = () => <h1 className="text-3xl font-bold">Gửi Thông báo</h1>;

// --- Cấu hình Router (ĐÃ SỬA) ---
const router = createBrowserRouter([
  // ▼▼▼ 1. NHÁNH CHÍNH (PUBLIC VÀ USER) ▼▼▼
  {
    path: '/',
    element: <MainLayout />, // Layout chung (Header/Footer)
    children: [
      // Các trang Public
      { index: true, element: <HomePage /> },
      { path: 'courses', element: <CourseProgramPage /> },
      { path: 'courses/:courseId', element: <CourseDetailPage /> },
      { path: 'exams', element: <ExamListPage /> },
      { path: 'exam/detail/:examId', element: <ExamDetailPage /> },
      { path: 'flashcards', element: <FlashcardListPage /> },
      { path: 'blog', element: <BlogListPage /> },
      { path: 'login', element: <LoginPage /> },
      
      // Các trang Protected (lồng bên trong MainLayout)
      {
        element: <ProtectedRoute />, // "Gác cổng" User
        children: [
          { path: 'profile', element: <ProfilePage /> },
          { path: 'checkout/:courseId', element: <CheckoutPage /> },
        ],
      },
    ],
  },
  
  // 2. Nhánh Thi (Layout riêng)
  { 
    path: '/exam/take/:examId', 
    element: <ExamTakingPage /> 
  },
  
  // 3. Nhánh Admin (Layout riêng)
  {
    path: '/admin',
    element: <AdminRoute />, // "Gác cổng" Admin
    children: [
      {
        element: <AdminLayout />, // Layout Admin
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: 'users', element: <UserManagementPage /> },
          { path: 'courses', element: <CourseManagementPage /> },
          { path: 'courses/new', element: <CourseFormPage /> },
          { path: 'courses/edit/:courseId', element: <CourseFormPage /> },
          { path: 'subjects', element: <SubjectManagementPage /> },
          { path: 'exams', element: <ExamManagementPage /> },
          { path: 'exams/questions/:examId', element: <ExamQuestionsPage /> },
          { path: 'payments', element: <PaymentManagementPage /> },
          { path: 'notifications', element: <NotificationPage /> },
        ],
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;