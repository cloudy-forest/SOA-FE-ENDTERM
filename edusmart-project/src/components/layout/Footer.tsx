// src/components/layout/Footer.tsx
import React from 'react';

export const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center text-gray-500 dark:text-gray-400">
                    <p className="text-lg font-semibold mb-2">EduSmart</p>
                    <p>Học tập mọi lúc, mọi nơi.</p>
                    <p className="mt-4 text-sm">&copy; {new Date().getFullYear()} EduSmart. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};