'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const metadata = {
  title: 'Learning Management System ',
  description: "CISC474 Class project",
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); 
  return (
    <header className="fixed top-0 z-50 w-full bg-white">
      <nav className="flex items-center justify-between px-l py-m max-w-7xl mx-auto">
        {/* User profile */}
        <Link
          href="/profile"
          className="flex items-center gap-s hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">JD</span>
          </div>
          <span className="font-medium text-gray-900 text-base">Welcome, John Doe</span>
        </Link>

        {/* Mobile Hamburger Menu */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-xl">
          <Link 
            href="/" 
            className="relative text-gray-700 transition-all duration-200 before:content-[attr(data-text)] before:font-semibold before:invisible before:block before:h-0 before:overflow-hidden hover:font-semibold after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-gray-700 after:transition-all after:duration-200 hover:after:w-full"
            data-text="Home"
          >
            Home
          </Link>
          <Link 
            href="/courses" 
            className="relative text-gray-700 transition-all duration-200 before:content-[attr(data-text)] before:font-semibold before:invisible before:block before:h-0 before:overflow-hidden hover:font-semibold after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-gray-700 after:transition-all after:duration-200 hover:after:w-full"
            data-text="Courses"
          >
            Courses
          </Link>
          <Link 
            href="/notifications" 
            className="relative text-gray-700 transition-all duration-200 before:content-[attr(data-text)] before:font-semibold before:invisible before:block before:h-0 before:overflow-hidden hover:font-semibold after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-gray-700 after:transition-all after:duration-200 hover:after:w-full"
            data-text="Notifications"
          >
            Notifications
          </Link>
          <Link 
            href="/submissions" 
            className="relative text-gray-700 transition-all duration-200 before:content-[attr(data-text)] before:font-semibold before:invisible before:block before:h-0 before:overflow-hidden hover:font-semibold after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-gray-700 after:transition-all after:duration-200 hover:after:w-full"
            data-text="Submissions"
          >
            Submissions
          </Link>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`absolute top-full left-0 right-0 bg-white md:hidden ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="mx-l mt-m mb-l">
            <div className="flex flex-col py-m px-m gap-m bg-gray-50 border border-gray-200 rounded-lg">
            <Link 
              href="/" 
              className="relative text-gray-700 transition-all duration-200 before:content-[attr(data-text)] before:font-semibold before:invisible before:block before:h-0 before:overflow-hidden hover:font-semibold after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-gray-700 after:transition-all after:duration-200 hover:after:w-full"
              data-text="Home"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/courses" 
              className="relative text-gray-700 transition-all duration-200 before:content-[attr(data-text)] before:font-semibold before:invisible before:block before:h-0 before:overflow-hidden hover:font-semibold after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-gray-700 after:transition-all after:duration-200 hover:after:w-full"
              data-text="Courses"
              onClick={() => setIsOpen(false)}
            >
              Courses
            </Link>
            <Link 
              href="/notifications" 
              className="relative text-gray-700 transition-all duration-200 before:content-[attr(data-text)] before:font-semibold before:invisible before:block before:h-0 before:overflow-hidden hover:font-semibold after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-gray-700 after:transition-all after:duration-200 hover:after:w-full"
              data-text="Notifications"
              onClick={() => setIsOpen(false)}
            >
              Notifications
            </Link>
            <Link 
              href="/submissions" 
              className="relative text-gray-700 transition-all duration-200 before:content-[attr(data-text)] before:font-semibold before:invisible before:block before:h-0 before:overflow-hidden hover:font-semibold after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-gray-700 after:transition-all after:duration-200 hover:after:w-full"
              data-text="Submissions"
              onClick={() => setIsOpen(false)}
            >
              Submissions
            </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export function RootLayout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Prevent hydration mismatch by rendering basic layout on server
  if (!isClient) {
    return <main className="min-h-screen">{children}</main>;
  }

  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/register';

  if (isAuthPage) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <div>
      <Navbar />
      <main className="pt-20">{children}</main>
    </div>
  );
}