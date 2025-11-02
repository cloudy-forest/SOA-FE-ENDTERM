// src/pages/courses/components/CourseReviews.tsx
import type { CourseReview, Testimonial, FeedbackImage } from '../../../types/course';
import { StarIcon } from '@heroicons/react/24/solid';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

// Component con cho 1 bình luận
const ReviewItem = ({ review }: { review: CourseReview }) => (
  <div className="py-4 border-b border-gray-100 dark:border-gray-700">
    <div className="flex items-center mb-2">
      <span className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center font-semibold text-blue-600 dark:text-blue-300 mr-3">
        {review.avatarInitials}
      </span>
      <div>
        <span className="font-semibold text-gray-900 dark:text-white">{review.user}</span>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
          ))}
        </div>
      </div>
      <span className="ml-auto text-sm text-gray-500">{review.timestamp}</span>
    </div>
    <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
  </div>
);

// ĐỊNH NGHĨA INTERFACE CHO PROPS 
interface CourseReviewsProps {
  reviews: CourseReview[];
  testimonials: Testimonial[];
  feedbackImages: FeedbackImage[];
  avgRating: number;
  totalStudents: number;
}

export const CourseReviews = ({ 
  reviews, 
  testimonials, 
  feedbackImages, 
  avgRating, 
  totalStudents 
}: CourseReviewsProps) => (
  <div>
    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
      Đánh giá từ học viên
    </h2>
    
    {/* Phần 1: Thống kê */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
      <div className="flex flex-col md:flex-row items-center">
        <div className="text-center md:pr-8 md:border-r md:border-gray-200 dark:md:border-gray-700">
          <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">{avgRating.toFixed(1)}</div>
          <div className="flex justify-center my-2">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className={`w-6 h-6 ${i < Math.floor(avgRating) ? 'text-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
          <div className="text-gray-600 dark:text-gray-400">({totalStudents.toLocaleString('vi-VN')} đánh giá)</div>
        </div>
        <div className="w-full md:pl-8 mt-6 md:mt-0">
          <p className="text-gray-700 dark:text-gray-300">Đánh giá trung bình từ học viên đã tham gia.</p>
          {/* (Bạn có thể thêm các thanh % xếp hạng 5 sao, 4 sao... ở đây) */}
        </div>
      </div>
    </div>

    {/* Phần 2: Câu nói tiêu biểu (Slider) */}
    {testimonials.length > 0 && (
      <Swiper
        modules={[Autoplay, Navigation]}
        navigation={true}
        loop={true}
        autoplay={{ delay: 4000 }}
        className="mb-8"
      >
        {/* (Không cần sửa 'any' ở đây vì type đã được suy ra từ 'testimonials') */}
        {testimonials.map((item) => (
          <SwiperSlide key={item.id} className="p-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
              <p className="text-lg italic text-gray-700 dark:text-gray-300">"{item.quote}"</p>
              <p className="font-semibold text-gray-900 dark:text-white mt-4">{item.user}</p>
              <p className="text-sm text-blue-600 dark:text-blue-400">{item.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    )}

    {/* Phần 3: Hình ảnh Feedback */}
    {feedbackImages.length > 0 && (
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Feedback từ học viên</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* (Không cần sửa 'any' ở đây) */}
          {feedbackImages.map((img) => (
            <img key={img.id} src={img.url} alt={img.alt} className="rounded-lg shadow-sm object-cover" />
          ))}
        </div>
      </div>
    )}
    
    {/* Phần 4: Danh sách bình luận */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 py-4">Chưa có đánh giá nào.</p>
      )}
    </div>
  </div>
);