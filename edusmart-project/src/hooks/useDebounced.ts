// src/hooks/useDebounced.ts
import { useState, useEffect } from 'react';

export const useDebounced = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Đặt timeout để cập nhật giá trị
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Hủy timeout nếu giá trị thay đổi (người dùng gõ tiếp)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Chỉ chạy lại effect nếu giá trị hoặc delay thay đổi

  return debouncedValue;
};