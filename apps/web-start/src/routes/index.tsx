import { createFileRoute } from '@tanstack/react-router';
import { useAuth0 } from '@auth0/auth0-react';
import ProgressTracker from '../components/ProgressTracker/ProgressTracker';
import Dashboard from '../components/Dashboard/Dashboard';
import CardsGroup from '../components/CardsGroup/CardsGroup';
import Calendar from '../components/Calendar/Calendar';
import { COLORS } from '../constants/theme';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
        <div className="max-w-md w-full mx-4">
          <div className="text-center space-y-8">
            <div className="animate-[fadeInDown_0.8s_ease-out]">
              <img
                src="/assets/Landing_Logo.svg"
                alt="LMS Logo"
                className="w-48 h-48 mx-auto mb-8 animate-[float_3s_ease-in-out_infinite]"
              />
            </div>

            <div className="animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
              <h1 className="text-5xl font-bold mb-4" style={{ color: COLORS.primary }}>
                Welcome to LMS
              </h1>
            </div>

            <div className="animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
              <p className="text-gray-600 text-lg mb-8 leading-relaxed italic">
                "The quest for knowledge begins with a single step into the realm of learning.
                Herein lies thy path to enlightenment and mastery."
              </p>
            </div>

            <div className="animate-[fadeInUp_0.8s_ease-out_0.6s_both]">
              <button
                onClick={() => loginWithRedirect()}
                className="px-8 py-4 bg-black text-white rounded-lg font-medium hover:scale-105 hover:shadow-xl hover:bg-gray-800 transition-all duration-300 ease-out cursor-pointer"
              >
                Begin Thy Journey
              </button>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-600 mb-6">
          Pages with real backend data: <strong>Courses</strong> and <strong>Notifications</strong>
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          <h2 className="text-xl font-semibold text-default-gray text-center">Overall Progress</h2>
          <h2 className="text-xl font-semibold text-default-gray text-center">Upcoming Assignments</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <ProgressTracker percentage={78} />
            <Dashboard />
          </div>

          <div>
            <CardsGroup />
          </div>
        </div>

        <div className="mt-8">
          <Calendar title="Academic Calendar" />
        </div>
      </div>
    </div>
  );
}
