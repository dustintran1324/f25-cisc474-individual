import { createFileRoute } from '@tanstack/react-router';
import ProgressTracker from '../components/ProgressTracker/ProgressTracker';
import Dashboard from '../components/Dashboard/Dashboard';
import CardsGroup from '../components/CardsGroup/CardsGroup';
import Calendar from '../components/Calendar/Calendar';
import { Assignment } from '../components/Card/Card';

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
