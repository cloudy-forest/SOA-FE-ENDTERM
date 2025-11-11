// src/components/auth/AdminRoute.tsx
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { Spinner } from '../ui/Spinner';

export const AdminRoute = () => {
  const { user, status } = useAppSelector(state => state.auth);
  const location = useLocation();

  // 1. Nếu đang tải (chưa biết user là ai)
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  // 2. Nếu đã tải
  if (user) {
    // 2a. ĐÚNG là admin -> Cho phép vào
    if (user.role === 'admin') {
      return <Outlet />; // <-- Render "Buồng Lái" (AdminLayout)
    }
    
    // 2b. Là 'user' thường -> Đá về trang chủ
    return <Navigate to="/" replace />;
  }

  // 3. Không có user (chưa đăng nhập) -> Đá về trang login
  return <Navigate to="/login" state={{ from: location }} replace />;
};