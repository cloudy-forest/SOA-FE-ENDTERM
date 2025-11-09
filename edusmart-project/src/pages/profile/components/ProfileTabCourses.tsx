// src/pages/profile/components/ProfileTabCourses.tsx
import { allCourses } from '../../../data/mockCourses';
import { CourseCard } from '../../courses/components/CourseCard';

// Giả lập rằng user đã đăng ký 4 khóa học này
const myCourses = allCourses.slice(0, 4); 

export const ProfileTabCourses = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {myCourses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};