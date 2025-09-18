import { useState } from 'react';

export interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  classCode: string;
  description: string;
  type: string;
  points: number;
  status: 'pending' | 'submitted' | 'graded';
}

interface CardProps {
  assignment: Assignment;
  onClick?: (assignment: Assignment) => void;
}

export default function Card({ assignment, onClick }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick(assignment);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: Assignment['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600';
      case 'submitted':
        return 'text-blue-600';
      case 'graded':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div 
      className="relative h-48 w-full cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={handleClick}
    >
      <div className={`absolute inset-0 w-full h-full transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-default-gray mb-2 line-clamp-2">
              {assignment.title}
            </h3>
            <p className="text-sm text-default-gray/60 mb-3">
              Due: {formatDate(assignment.dueDate)}
            </p>
          </div>
          <div className="mt-auto">
            <span className="inline-block bg-gray-100 text-default-gray text-xs font-medium px-2 py-1 rounded">
              {assignment.classCode}
            </span>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-default-gray text-white rounded-lg shadow-sm p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-2">{assignment.title}</h3>
            <p className="text-sm text-white/80 mb-3 line-clamp-3">
              {assignment.description}
            </p>
            <div className="space-y-1 text-xs">
              <p><span className="font-medium">Type:</span> {assignment.type}</p>
              <p><span className="font-medium">Points:</span> {assignment.points}</p>
              <p><span className="font-medium">Status:</span> 
                <span className={`ml-1 ${getStatusColor(assignment.status)}`}>
                  {assignment.status}
                </span>
              </p>
            </div>
          </div>
          <div className="mt-auto">
            <p className="text-xs text-white/60">Click to view assignment</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}