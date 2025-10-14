import { createFileRoute, Link } from '@tanstack/react-router';
import ProgressTracker from '../components/ProgressTracker/ProgressTracker';
import Dashboard from '../components/Dashboard/Dashboard';
import CardsGroup from '../components/CardsGroup/CardsGroup';
import Calendar from '../components/Calendar/Calendar';
import { Assignment } from '../components/Card/Card';
import { COLORS } from '../constants/theme';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const handleAssignmentClick = (assignment: Assignment) => {
    console.log('Navigate to assignment:', assignment.id);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Backend Data Pages Links */}
        <div className="mb-8 p-6 bg-gray-50 border-4 border-black rounded-lg">
          <h2 className="text-2xl font-bold mb-4" style={{ color: COLORS.primary }}>
            Backend-Connected Pages
          </h2>
          <p className="mb-4" style={{ color: COLORS.primary }}>
            Click the links below to view pages that fetch data from the backend API:
          </p>
          <div className="flex gap-4">
            <Link
              to="/courses"
              className="border-2 border-black px-6 py-3 rounded-lg font-medium hover:bg-white transition-colors"
              style={{ color: COLORS.primary }}
            >
              View Courses (Backend Data)
            </Link>
            <Link
              to="/assignments"
              className="border-2 border-black px-6 py-3 rounded-lg font-medium hover:bg-white transition-colors"
              style={{ color: COLORS.primary }}
            >
              View Assignments (Backend Data)
            </Link>
          </div>
        </div>

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
            <CardsGroup onAssignmentClick={handleAssignmentClick} />
          </div>
        </div>

        <div className="mt-8">
          <Calendar title="Academic Calendar" />
        </div>
      </div>
    </div>
  );
}
