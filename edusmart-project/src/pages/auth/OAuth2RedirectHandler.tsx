// src/pages/auth/OAuth2RedirectHandler.tsx
import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { loginSuccess, authFailed } from '../../app/slices/authSlice'; // Import action Redux
import { fetchCurrentUser } from '../../services/auth/loginService'; // Import hàm mới viết
import { Spinner } from '../../components/ui/Spinner';

export const OAuth2RedirectHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const hasRun = useRef(false); // Tránh chạy 2 lần (React.StrictMode)

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const handleLogin = async () => {
      // 1. Lấy token từ URL
      const token = searchParams.get('token') || searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');
      const error = searchParams.get('error');

      if (error) {
        dispatch(authFailed("Đăng nhập Google thất bại."));
        navigate('/login');
        return;
      }

      if (token) {
        try {
          // 2. Lưu token
          localStorage.setItem('token', token);
          if (refreshToken) localStorage.setItem('refresh_token', refreshToken);

          // 3. Gọi API lấy thông tin User (QUAN TRỌNG)
          const userProfile = await fetchCurrentUser();

          // 4. Cập nhật Redux
          dispatch(loginSuccess(userProfile));

          // 5. Chuyển hướng
          if (userProfile.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        } catch (err) {
          console.error("Lỗi lấy thông tin user sau khi OAuth:", err);
          dispatch(authFailed("Không thể lấy thông tin người dùng."));
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };

    handleLogin();
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-50">
      <Spinner size="lg" />
      <p className="mt-4 text-gray-600 font-medium">Đang xác thực tài khoản...</p>
    </div>
  );
};