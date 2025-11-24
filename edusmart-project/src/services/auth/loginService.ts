// // import type { UserProfile } from '../../types/auth';
// // import { FAKE_DELAY, DEFAULT_BANNER } from './constants';
// // import { mockDB } from './mockData';

// // // --- CÁC HÀM "GIẢ LẬP" API ---

// // /**
// //  * Giả lập API POST /api/auth/login
// //  * (Vẫn giữ nguyên: username, password)
// //  */
// // export const loginWithUsername = (username: string, password: string): Promise<UserProfile> => {
// //   console.log(`(Giả lập API) Đang thử đăng nhập với: ${username} / ${password}`);
  
// //   return new Promise((resolve, reject) => {
// //     setTimeout(() => {
// //       if (username === 'admin' && password === 'admin') {
// //         console.log("(Giả lập API) Đăng nhập Admin thành công!");
// //         resolve(mockDB.adminUser);
// //         return;
// //       }
// //       if (username === 'user' && password === 'user') {
// //         console.log("(Giả lập API) Đăng nhập User thành công!");
// //         resolve(mockDB.normalUser);
// //         return;
// //       }
// //       console.error("(Giả lập API) Sai tên đăng nhập hoặc mật khẩu.");
// //       reject(new Error('Sai tên đăng nhập hoặc mật khẩu. Vui lòng thử lại.'));
// //     }, FAKE_DELAY);
// //   });
// // };

// // /**
// //  * Giả lập API POST /api/auth/register
// //  * (Đã sửa: chỉ cần username, password)
// //  */
// // export const registerWithUsername = (username: string, password: string): Promise<UserProfile> => {
// //   console.log(`(Giả lập API) Đang thử đăng ký với: ${username} / ${password.substring(0, 2)}...`);

// //   return new Promise((resolve, reject) => {
// //     setTimeout(() => {
// //       if (username === 'admin' || username === 'user') {
// //         console.error("(Giả lập API) Tên đăng nhập đã tồn tại.");
// //         reject(new Error('Tên đăng nhập này đã được sử dụng.'));
// //         return;
// //       }

// //       const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=0D8ABC&color=fff&bold=true`;
// //       const newUserId = `user-${Math.floor(Math.random() * 1000)}`;
// //       const newUser: UserProfile = {
// //         id: newUserId,
// //         name: username, // <<< Tên hiển thị sẽ mặc định là username
// //         email: `${username}@fake.com`, 
// //         avatarUrl: defaultAvatar,
// //         role: 'user',
// //         phone: '',
// //         address: '',
// //         bannerUrl: DEFAULT_BANNER, 
// //       };
// //       console.log("(Giả lập API) Đăng ký thành công!");
// //       resolve(newUser);
// //     }, FAKE_DELAY);
// //   });
// // };

// //API
// // src/services/auth/loginService.ts
// import { jwtDecode } from 'jwt-decode';
// import axiosClient from '../api';
// import type { UserProfile } from '../../types/auth';

// // --- DTO Interfaces ---
// interface UserLoginResponse {
//   message: string;
//   access_token: string;  
//   refresh_token: string;
// }

// interface UserDetailResponse {
//   id: number;
//   email: string;
//   avatar: string;
//   banner: string;
//   name: string;
//   address: string;
//   phone: string;
// }

// interface JwtPayload {
//   sub: string;
//   exp: number;
//   iat: number;
//   scope?: string;
//   roles?: string[];
// }

// // --- HÀM DÙNG CHUNG: LẤY INFO USER SAU KHI CÓ TOKEN ---
// export const fetchCurrentUser = async (): Promise<UserProfile> => {
//   const token = localStorage.getItem('token');
//   if (!token) throw new Error("No token found");

//   // 1. Giải mã Token lấy Role
//   let role = 'user';
//   try {
//     const decoded = jwtDecode<JwtPayload>(token);
//     const scopes = decoded.scope || decoded.roles || '';
//     if (Array.isArray(scopes)) {
//         if (scopes.includes('ROLE_ADMIN') || scopes.includes('ADMIN')) role = 'admin';
//     } else if (typeof scopes === 'string') {
//         if (scopes.includes('ADMIN')) role = 'admin';
//     }
//   } catch (e) {
//     console.warn("Token decode failed:", e);
//   }

//   // 2. Gọi API lấy chi tiết
//   // Sửa lỗi 'any': Ta định nghĩa kiểu trả về là UserDetailResponse
//   const userRes = await axiosClient.get<UserDetailResponse>('/users/me');
  
//   // axiosClient trả về data trực tiếp (do interceptor), nhưng TS có thể hiểu nhầm
//   // Ép kiểu an toàn:
//   const userData = userRes as unknown as UserDetailResponse; 

//   // 3. Map sang UserProfile
//   const userProfile: UserProfile = {
//     id: String(userData.id),
//     name: userData.name,
//     email: userData.email,
//     role: role as 'admin' | 'user',
//     avatarUrl: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`,
//     bannerUrl: userData.banner || '',
//     phone: userData.phone,
//     address: userData.address
//   };

//   // 4. Lưu User ID/Role để dùng cho Header
//   localStorage.setItem('user', JSON.stringify({
//     id: userData.id,
//     role: role 
//   }));

//   return userProfile;
// };

// // --- CÁC HÀM LOGIN/REGISTER ---

// export const loginWithUsername = async (username: string, password: string): Promise<UserProfile> => {
//   // Sửa lỗi 'any': Bỏ generic <any, ...>, chỉ định kiểu trả về ở biến res
//   const res = await axiosClient.post<UserLoginResponse>('/auth/login', {
//     username, 
//     password 
//   }) as unknown as UserLoginResponse; // Ép kiểu kết quả trả về

//   const { access_token, refresh_token } = res;

//   if (!access_token) {
//     throw new Error("Không nhận được Access Token");
//   }

//   localStorage.setItem('token', access_token);
//   if (refresh_token) localStorage.setItem('refresh_token', refresh_token);

//   // Tái sử dụng hàm lấy info
//   return fetchCurrentUser();
// };

// export const registerWithUsername = async (username: string, password: string): Promise<UserProfile> => {
//   await axiosClient.post('/auth/register', {
//     username,
//     password,
//     confirm_password: password 
//   });
//   return loginWithUsername(username, password);
// };

// src/services/auth/loginService.ts
import { jwtDecode } from 'jwt-decode';
import axiosClient from '../api';
import type { ApiResponse } from '../api';
import type { UserProfile } from '../../types/auth';

interface UserLoginResponse {
  message: string;
  access_token?: string | null;
  refresh_token?: string | null;
}

interface UserDetailResponse {
  id: number;
  email: string | null;
  avatar: string | null;
  banner: string | null;
  name: string | null;
  address: string | null;
  phone: string | null;
}

interface JwtPayloadMinimal {
  sub?: string;   // username
  exp?: number;
  iat?: number;
  typ?: string;
  id?: number;
  role?: string;  // "USER" | "ADMIN"
}

/**
 * Tạo UserProfile tối thiểu từ JWT + username (fallback khi /users/me trả null hoặc lỗi)
 */
const buildProfileFromJwt = (
  decoded: JwtPayloadMinimal,
  role: 'user' | 'admin',
  fallbackUsername?: string
): UserProfile => {
  const id = decoded.id != null ? String(decoded.id) : '0';
  const name = fallbackUsername ?? decoded.sub ?? 'Người dùng';

  const profile: UserProfile = {
    id,
    name,
    email: '',
    role,
    avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=random`,
    bannerUrl: '',
    phone: '',
    address: '',
  };

  // Lưu để Header X-User-Id / X-User-Role dùng
  localStorage.setItem('user', JSON.stringify({ id, role }));
  return profile;
};

/**
 * Lấy thông tin user sau khi đã có token.
 * Có fallback nếu /users/me trả null hoặc lỗi.
 */
export const fetchCurrentUser = async (
  fallbackUsername?: string
): Promise<UserProfile> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  let decoded: JwtPayloadMinimal = {};
  try {
    decoded = jwtDecode<JwtPayloadMinimal>(token);
  } catch {
    // bỏ qua lỗi decode
  }

  let role: 'user' | 'admin' = 'user';
  if (decoded.role && decoded.role.toUpperCase().includes('ADMIN')) {
    role = 'admin';
  }

  try {
    const res = await axiosClient.get<ApiResponse<UserDetailResponse>>('/users/me');
    const apiData = res.data;
    const userData = apiData.data;

    // /users/me không tìm thấy user → data = null
    if (!userData) {
      return buildProfileFromJwt(decoded, role, fallbackUsername);
    }

    const name = userData.name ?? fallbackUsername ?? decoded.sub ?? 'Người dùng';

    const userProfile: UserProfile = {
      id: String(userData.id),
      name,
      email: userData.email ?? '',
      role,
      avatarUrl:
        userData.avatar ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      bannerUrl: userData.banner ?? '',
      phone: userData.phone ?? '',
      address: userData.address ?? '',
    };

    // Lưu user cho Header X-User-Id / X-User-Role
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: userData.id,
        role,
      })
    );

    return userProfile;
  } catch {
    // Lỗi 403/500 hoặc lỗi mạng → fallback dùng JWT
    return buildProfileFromJwt(decoded, role, fallbackUsername);
  }
};

/**
 * Đăng nhập bằng username / password.
 * Không sửa backend, chỉ map message & xử lý lỗi FE.
 */
export const loginWithUsername = async (
  username: string,
  password: string
): Promise<UserProfile> => {
  try {
    const res = await axiosClient.post<ApiResponse<UserLoginResponse>>('/auth/login', {
      username,
      password,
    });

    const apiData = res.data;
    const loginData = apiData.data;

    if (!loginData) {
      throw new Error(apiData.message || 'Đăng nhập thất bại');
    }

    const accessToken = loginData.access_token ?? null;
    const refreshToken = loginData.refresh_token ?? null;
    const backendMsg = loginData.message;

    // Không có token → login thất bại (sai mật khẩu / dữ liệu sai)
    if (!accessToken) {
      let msg: string;

      switch (backendMsg) {
        case 'WRONG_PASSWORD':
          msg = 'Tên đăng nhập hoặc mật khẩu không đúng';
          break;
        case 'INVALID_REQUEST_DATA':
        case 'DATA_NOT_FOUND':
          msg = 'Tài khoản không tồn tại';
          break;
        default:
          msg = apiData.message || 'Đăng nhập thất bại';
      }

      throw new Error(msg);
    }

    // Có token → lưu và lấy thông tin user
    localStorage.setItem('token', accessToken);
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }

    // fallbackUsername = username người dùng gõ vào
    return fetchCurrentUser(username);
  } catch (err) {
    // axiosClient interceptor có thể đã wrap thành Error(message)
    if (err instanceof Error) {
      // Nếu backend ném ra các message key, map lại
      if (err.message === 'WRONG_PASSWORD') {
        throw new Error('Tên đăng nhập hoặc mật khẩu không đúng');
      }
      if (err.message === 'INVALID_REQUEST_DATA' || err.message === 'DATA_NOT_FOUND') {
        throw new Error('Tài khoản không tồn tại');
      }
      throw err;
    }
    throw new Error('Đăng nhập thất bại');
  }
};

/**
 * Đăng ký rồi thử đăng nhập luôn.
 * Do backend hiện đang lưu mật khẩu raw, nên login user mới có thể thất bại → báo rõ.
 */
export const registerWithUsername = async (
  username: string,
  password: string
): Promise<UserProfile> => {
  const res = await axiosClient.post<ApiResponse<string>>('/auth/register', {
    username,
    password,
    confirm_password: password,
  });

  const apiData = res.data;
  const status = apiData.data; // "SUCCESS" | "USER_ALREADY_EXISTS" | "WRONG_PASSWORD" | ...

  if (status !== 'SUCCESS') {
    let msg = apiData.message || 'Đăng ký thất bại';

    if (status === 'USER_ALREADY_EXISTS') {
      msg = 'Tên đăng nhập đã tồn tại';
    } else if (status === 'WRONG_PASSWORD') {
      msg = 'Mật khẩu xác nhận không khớp';
    }

    throw new Error(msg);
  }

  // Thử login lại. Nếu backend fail (do bug mật khẩu không được mã hoá),
  // thì báo rõ cho người dùng.
  try {
    return await loginWithUsername(username, password);
  } catch {
    throw new Error(
      'Đăng ký thành công, nhưng hệ thống hiện tại chưa hỗ trợ đăng nhập tài khoản mới. ' +
        'Hãy dùng tài khoản có sẵn (ví dụ admin) để đăng nhập và demo.'
    );
  }
};
