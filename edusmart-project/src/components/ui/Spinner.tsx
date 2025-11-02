// src/components/ui/Spinner.tsx
import React from 'react';

export const Spinner = () => (
    <div 
        className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        role="status"
    >
        <span className="sr-only">Loading...</span>
    </div>
);