import Card, { Assignment } from '../Card/Card';
import { useUpcomingAssignments } from '../../hooks/useAssignments';
import type { AssignmentOut } from '@repo/api';

interface CardsGroupProps {
  onAssignmentClick?: (assignment: Assignment) => void;
}

const transformAssignment = (assignment: AssignmentOut): Assignment => {
  return {
    id: assignment.id,
    title: assignment.title,
    dueDate: new Date(assignment.dueDate).toISOString(),
    classCode: assignment.course?.code || 'N/A',
    courseId: assignment.courseId,
    description: assignment.description || 'No description available',
    type: assignment.allowedTypes?.[0] || 'Assignment',
    points: assignment.maxPoints,
    status: 'pending',
  };
};

export default function CardsGroup({ onAssignmentClick }: CardsGroupProps) {
  const { data: upcomingAssignments, isLoading, error } = useUpcomingAssignments(4);

  const handleAssignmentClick = (assignment: Assignment) => {
    if (onAssignmentClick) {
      onAssignmentClick(assignment);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-72">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading upcoming assignments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-72">
        <div className="text-center text-red-600">
          <p className="font-semibold mb-2">Failed to load assignments</p>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!upcomingAssignments || upcomingAssignments.length === 0) {
    return (
      <div className="flex items-center justify-center h-72">
        <div className="text-center text-gray-600">
          <p className="text-lg font-semibold mb-2">No upcoming assignments</p>
          <p className="text-sm">You're all caught up!</p>
        </div>
      </div>
    );
  }

  const transformedAssignments = upcomingAssignments.map(transformAssignment);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {transformedAssignments.map((assignment) => (
        <Card
          key={assignment.id}
          assignment={assignment}
          onClick={handleAssignmentClick}
        />
      ))}
    </div>
  );
}