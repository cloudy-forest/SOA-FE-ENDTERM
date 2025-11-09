// src/components/auth/ProtectedRoute.tsx
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

export const ProtectedRoute = () => {
  const user = useAppSelector(state => state.auth.user);
  const location = useLocation();

  if (!user) {
    // Nếu chưa đăng nhập:
    // 1. Chuyển hướng về trang /login
    // 2. Lưu lại trang họ đang muốn vào (location.pathname) để chuyển hướng ngược lại sau khi đăng nhập
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  // Nếu đã đăng nhập, cho phép hiển thị "con" (ví dụ: ProfilePage)
  return <Outlet />;
};