// src/components/layout/MainLayout.tsx
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-gray-50 dark:bg-gray-900">
                <Outlet /> {/* Đây là nơi nội dung các trang (HomePage, v.v.) sẽ hiển thị */}
            </main>
            <Footer />
        </div>
    );
};