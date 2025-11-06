// src/pages/auth/LoginPage.tsx
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { loginSuccess } from '../../app/slices/authSlice';
import type { UserProfile } from '../../types/auth';

// 1. IMPORT CÁC THƯ VIỆN MỚI
import { GoogleLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // Thư viện giải mã

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // Dùng để chuyển hướng
  
  // Lấy URL để quay lại, nếu không có thì về trang chủ
  const redirectUrl = searchParams.get('redirect') || '/';

  // 2. HÀM XỬ LÝ KHI GOOGLE ĐĂNG NHẬP THÀNH CÔNG
  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
    
    // credentialResponse.credential là một chuỗi JWT (JSON Web Token)
    // Chúng ta cần giải mã nó để lấy thông tin người dùng
    try {
      // 3. Giải mã JWT
      const decodedProfile: {
        name: string;
        email: string;
        picture: string; // URL ảnh
        sub: string;     // Google User ID (mã định danh duy nhất)
      } = jwtDecode(credentialResponse.credential as string);
      
      // 4. Chuyển đổi (map) data từ Google sang UserProfile của chúng ta
      const userProfile: UserProfile = {
        id: decodedProfile.sub,
        name: decodedProfile.name,
        email: decodedProfile.email,
        avatarUrl: decodedProfile.picture,
      };

      // 5. Dispatch (gửi) thông tin user lên Redux store
      dispatch(loginSuccess(userProfile));

      // 6. Thông báo và chuyển hướng người dùng
      alert(`Chào mừng, ${userProfile.name}!`);
      // Chuyển hướng về trang họ muốn (ví dụ: trang làm bài thi)
      navigate(redirectUrl, { replace: true }); 

    } catch (error) {
      console.error("Lỗi giải mã JWT:", error);
      handleGoogleError(); // Gọi hàm lỗi nếu giải mã thất bại
    }
  };

  // 3. HÀM XỬ LÝ KHI GOOGLE ĐĂNG NHẬP THẤT BẠI 
  const handleGoogleError = () => {
    alert('Đăng nhập Google thất bại. Vui lòng thử lại.');
  };

  return (
    <div className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
            Chào mừng!
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Đăng nhập để bắt đầu học ngay.
          </p>

          {/* 4. ĐÂY LÀ NÚT GOOGLE THẬT  */}
          {/* Component này sẽ tự động hiển thị Pop-up */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              shape="rectangular"
              theme="outline"
              size="large"
              width="320px"
              logo_alignment="left"
            />
          </div>
          
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-6">
            Bằng việc đăng nhập, bạn đồng ý với 
            <Link to="/terms" className="text-blue-600 hover:underline"> Điều khoản dịch vụ </Link> 
            của chúng tôi.
          </p>
        </div>
      </div>
    </div>
  );
};