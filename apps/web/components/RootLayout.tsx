'use client';

import { useState } from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Learning Management System ',
  description: "CISC474 Class project",
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); 
  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="flex justify-center px-4">
        <nav className="bg-transparent md:mt-4 md:bg-white text-black px-4 lg:px-8 py-4 rounded-full md:shadow-md w-full max-w-4xl flex md:justify-between justify-center items-center">
          {/* Mobile Hamburger Menu Button */}
          <button
            className="text-black focus:outline-none flex items-center justify-center w-10 h-10 rounded-full bg-red-900 shadow-lg md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
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

          {/* Desktop Navigation */}
          <Link
            href="/"
            className="hidden md:block font-bold text-lg hover:text-neutral-300"
          >
            Welcome, John Doe!
          </Link>

          {/* Mobile & Desktop Links */}
          <div
            className={`absolute md:relative top-16 md:top-auto md:left-auto w-xl md:w-auto rounded-lg bg-white md:bg-transparent z-50 md:z-auto flex flex-col md:flex-row items-center gap-y-4 md:gap-x-6 p-4 md:p-0 transition-all duration-300 ${
              isOpen ? 'block' : 'hidden md:flex'
            }`}
          >
            {/* Mobile Home Link */}
            <Link
              href="/"
              className="md:hidden font-bold text-lg hover:text-neutral-300"
            >
              Home
            </Link>
            <Link href="/schedule" className="hover:text-neutral-300">
              Courses
            </Link>
            <Link href="/resources" className="hover:text-neutral-300">
              Notifications
            </Link>
            <Link href="/categories" className="hover:text-neutral-300">
              Submissions
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}