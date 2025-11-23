// src/pages/auth/OAuth2RedirectHandler.tsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
// import { setCredentials } from '../../app/slices/authSlice';
import { Spinner } from '../../components/ui/Spinner';

export const OAuth2RedirectHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Backend thường trả về token qua URL query params
    // Ví dụ: http://localhost:3000/oauth2/success?token=eyJhbGciOi...
    // Hãy hỏi Dev Backend xem họ đặt tên param là 'token' hay 'accessToken'
    const token = searchParams.get('token') || searchParams.get('accessToken');
    const error = searchParams.get('error');

    if (token) {
      // 1. Lưu token vào Redux (giả sử bạn có hàm decode token để lấy user info, hoặc gọi API lấy profile sau)
      // Tạm thời lưu token, bạn có thể cần gọi API /users/me ngay sau đây để lấy thông tin user đầy đủ
      
      // Lưu vào LocalStorage (nếu authSlice không tự làm)
      localStorage.setItem('token', token);

      // Cập nhật Redux (Cần dispatch action loginSuccess)
      // Lưu ý: Nếu authSlice của bạn cần User object ngay, bạn có thể phải fetch user info trước
      // Đây là ví dụ đơn giản:
      // dispatch(setCredentials({ user: decodedUser, token: token })); 
      
      // Cách tốt nhất: Redirect về trang chủ, App.tsx sẽ tự check token và load user
      window.location.href = '/'; 
    } else {
      console.error('Social login failed', error);
      navigate('/login?error=social_login_failed');
    }
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4 text-gray-600">Đang xử lý đăng nhập...</p>
      </div>
    </div>
  );
};