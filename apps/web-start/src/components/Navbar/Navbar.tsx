import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { Avatar } from '../Avatar/Avatar';
import { COLORS } from '../../constants/theme';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout } = useAuth0();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="fixed top-0 z-50 w-full bg-white">
      <nav className="flex items-center justify-between px-l py-m max-w-7xl mx-auto">
        <Link
          to="/profile"
          className="flex items-center gap-s hover:opacity-80 transition-opacity"
        >
          <Avatar size="small" imageUrl={user?.picture} />
          <span className="font-medium text-base" style={{ color: COLORS.primary }}>
            Welcome, {user?.name || 'User'}
          </span>
        </Link>

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

        <div className="hidden md:flex items-center gap-xl">
          {isAuthenticated ? (
            <>
              <Link
                to="/"
                className="relative text-gray-700 transition-all duration-200 before:content-[attr(data-text)] before:font-semibold before:invisible before:block before:h-0 before:overflow-hidden hover:font-semibold after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-gray-700 after:transition-all after:duration-200 hover:after:w-full"
                activeProps={{
                  className:
                    'font-semibold after:w-full',
                }}
              >
                Home
              </Link>
              <Link
                to="/courses"
                className="relative text-gray-700 transition-all duration-200 before:content-[attr(data-text)] before:font-semibold before:invisible before:block before:h-0 before:overflow-hidden hover:font-semibold after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-gray-700 after:transition-all after:duration-200 hover:after:w-full"
                activeProps={{
                  className:
                    'font-semibold after:w-full',
                }}
              >
                Courses
              </Link>
              <Link
                to="/notifications"
                className="relative text-gray-700 transition-all duration-200 before:content-[attr(data-text)] before:font-semibold before:invisible before:block before:h-0 before:overflow-hidden hover:font-semibold after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-gray-700 after:transition-all after:duration-200 hover:after:w-full"
                activeProps={{
                  className:
                    'font-semibold after:w-full',
                }}
              >
                Notifications
              </Link>
              <Link
                to="/submissions"
                className="relative text-gray-700 transition-all duration-200 before:content-[attr(data-text)] before:font-semibold before:invisible before:block before:h-0 before:overflow-hidden hover:font-semibold after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-gray-700 after:transition-all after:duration-200 hover:after:w-full"
                activeProps={{
                  className:
                    'font-semibold after:w-full',
                }}
              >
                Submissions
              </Link>
              <button
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border-2 border-gray-700 rounded hover:bg-gray-50 transition-colors"
              >
                Log Out
              </button>
            </>
          ) : (
            <button
              onClick={() => loginWithRedirect()}
              className="px-4 py-2 bg-black text-white rounded font-medium hover:opacity-80 transition-opacity"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Log In'}
            </button>
          )}
        </div>

        {isAuthenticated && (
          <div
            className={`absolute top-full left-0 right-0 bg-white md:hidden ${
              isOpen ? 'block' : 'hidden'
            }`}
          >
            <div className="mx-l mt-m mb-l">
              <div className="flex flex-col py-m px-m gap-m bg-gray-50 border border-gray-200 rounded-lg">
                <Link
                  to="/"
                  className="relative text-gray-700 transition-all duration-200 hover:font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/courses"
                  className="relative text-gray-700 transition-all duration-200 hover:font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Courses
                </Link>
                <Link
                  to="/notifications"
                  className="relative text-gray-700 transition-all duration-200 hover:font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Notifications
                </Link>
                <Link
                  to="/submissions"
                  className="relative text-gray-700 transition-all duration-200 hover:font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Submissions
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout({ logoutParams: { returnTo: window.location.origin } });
                  }}
                  className="text-left text-gray-700 hover:font-semibold transition-all duration-200"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
