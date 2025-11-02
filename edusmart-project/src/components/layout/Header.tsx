// src/components/layout/Header.tsx
import { Link, NavLink } from 'react-router-dom';
import { AcademicCapIcon } from '@heroicons/react/24/outline'; // Icon cho logo

export const Header = () => {
    // Helper class cho NavLink để active
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
            ? 'bg-blue-600 text-white'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`;

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
                        <AcademicCapIcon className="h-8 w-8 text-blue-600" />
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">EduSmart</span>
                    </Link>

                    {/* Nav Links (Desktop) */}
                    <div className="hidden sm:flex sm:space-x-4">
                        <NavLink to="/" className={navLinkClass} end>Trang chủ</NavLink>
                        <NavLink to="/courses" className={navLinkClass}>Chương trình học</NavLink>
                        <NavLink to="/exams" className={navLinkClass}>Đề thi</NavLink>
                        <NavLink to="/flashcards" className={navLinkClass}>Flashcards</NavLink>
                        <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center space-x-2">
                        <Link
                            to="/login"
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                        >
                            Đăng nhập
                        </Link>
                        <Link
                            to="/register"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                        >
                            Đăng ký
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};