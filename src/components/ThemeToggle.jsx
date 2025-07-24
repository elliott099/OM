import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2 rounded-full transition-colors duration-300 hover:bg-black/5 [data-theme='dark']:hover:bg-white/5 group"
            data-magnetic
            data-strength="0.15"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        >
            <div className="w-3 h-3 relative flex items-center justify-center">
                {/* Sun */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="var(--text-color)"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="var(--text-color)"
                    className={`w-6 h-6 absolute transition-all duration-300 group-hover:rotate-180 theme-icon
                        ${isDark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}
                        hover:animate-spin`}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    />
                </svg>

                {/* Moon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="var(--text-color)"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="var(--text-color)"
                    className={`w-6 h-6 absolute transition-all duration-300 group-hover:-rotate-180 theme-icon
                        ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}
                        hover:animate-bounce`}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    />
                </svg>
            </div>
        </button>
    );
} 