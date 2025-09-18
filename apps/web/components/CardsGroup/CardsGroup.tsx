import Card, { Assignment } from '../Card/Card';

interface CardsGroupProps {
  assignments?: Assignment[];
  onAssignmentClick?: (assignment: Assignment) => void;
}

const defaultAssignments: Assignment[] = [
  {
    id: '1',
    title: 'React Component Design',
    dueDate: '2024-01-15',
    classCode: 'CISC474',
    description: 'Create a responsive React component library with TypeScript support. Include proper documentation and testing.',
    type: 'Programming Assignment',
    points: 100,
    status: 'pending'
  },
  {
    id: '2',
    title: 'Database Schema Design',
    dueDate: '2024-01-18',
    classCode: 'CISC437',
    description: 'Design a normalized database schema for an e-commerce platform. Include ER diagrams and SQL scripts.',
    type: 'Project',
    points: 75,
    status: 'submitted'
  },
  {
    id: '3',
    title: 'Algorithm Analysis Report',
    dueDate: '2024-01-20',
    classCode: 'CISC320',
    description: 'Analyze time and space complexity of sorting algorithms. Write a comprehensive report with benchmarks.',
    type: 'Research Paper',
    points: 85,
    status: 'graded'
  },
  {
    id: '4',
    title: 'System Architecture Proposal',
    dueDate: '2024-01-25',
    classCode: 'CISC474',
    description: 'Design a microservices architecture for a large-scale web application. Include deployment strategies.',
    type: 'Design Document',
    points: 90,
    status: 'pending'
  }
];

export default function CardsGroup({ 
  assignments = defaultAssignments, 
  onAssignmentClick 
}: CardsGroupProps) {
  const handleAssignmentClick = (assignment: Assignment) => {
    if (onAssignmentClick) {
      onAssignmentClick(assignment);
    } else {
      // Default behavior: navigate to assignment page (placeholder)
      console.log('Navigate to assignment:', assignment.id);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {assignments.map((assignment) => (
        <Card
          key={assignment.id}
          assignment={assignment}
          onClick={handleAssignmentClick}
        />
      ))}
    </div>
  );
}