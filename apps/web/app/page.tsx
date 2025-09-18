'use client';

import ProgressTracker from '../components/ProgressTracker/ProgressTracker';
import Dashboard from '../components/Dashboard/Dashboard';
import CardsGroup from '../components/CardsGroup/CardsGroup';
import Calendar from '../components/Calendar/Calendar';
import { Assignment } from '../components/Card/Card';

// This is the new home page layout with 2-column design
function HomePage() {
  const handleAssignmentClick = (assignment: Assignment) => {
    console.log('Navigate to assignment:', assignment.id);
    // This will later navigate to the actual assignment page
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Section Headers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          <h2 className="text-xl font-semibold text-default-gray text-center">Overall Progress</h2>
          <h2 className="text-xl font-semibold text-default-gray text-center">Upcoming Assignments</h2>
        </div>

        {/* Main 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Left Column */}
          <div className="space-y-6">
            {/* Progress Tracker without container */}
            <ProgressTracker percentage={78} />
            
            {/* Dashboard with Notifications */}
            <Dashboard />
          </div>

          {/* Right Column */}
          <div>
            <CardsGroup onAssignmentClick={handleAssignmentClick} />
          </div>
        </div>

        {/* Calendar - Full width below both columns */}
        <div className="mt-8">
          <Calendar title="Academic Calendar" />
        </div>
      </div>
    </div>
  );
}

// Main component - no redirect for now, just show the home page
export default function Home() {
  return <HomePage />;
}
