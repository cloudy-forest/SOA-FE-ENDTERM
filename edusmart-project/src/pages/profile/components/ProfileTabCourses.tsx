// src/pages/profile/components/ProfileTabCourses.tsx
import { useEffect, useState } from 'react';
import { CourseCard } from '../../courses/components/CourseCard';
import { Spinner } from '../../../components/ui/Spinner';

import { getUnlockedCourses } from '../../../services/product/courseService';
import type { Course, UICourseListItem } from '../../../types/course';

// Map Course(API) -> UICourseListItem(UI)
const mapCourseToUI = (c: Course): UICourseListItem => ({
  id: c.id,
  title: c.course_name,
  description: c.course_desc,
  price: c.final_price,
  originalPrice: c.initial_price,
  thumbnail: c.thumbnail,
  rating: 4.8, // Backend chưa có rating -> mock
  students: c.registered_student,
  author: c.teacher_desc || 'Giảng viên',
  level: 'Tất cả trình độ',
  category: c.subject_name,
});

export const ProfileTabCourses = () => {
  const [courses, setCourses] = useState<UICourseListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMyCourses = async () => {
      try {
        setLoading(true);
        // Endpoint /products/courses/unlock
        const unlocked: Course[] = await getUnlockedCourses();
        const uiCourses = unlocked.map(mapCourseToUI);
        setCourses(uiCourses);
      } catch (error) {
        console.error('Lỗi tải khóa học của tôi:', error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    loadMyCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-8">
        Bạn chưa đăng ký khóa học nào.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};
