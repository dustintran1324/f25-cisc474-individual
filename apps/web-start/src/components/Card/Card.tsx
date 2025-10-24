import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

export interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  classCode: string;
  courseId?: string;
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
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(assignment);
    }
  };

  const handleReadMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsFlipped(false);
    setTimeout(() => {
      navigate({
        to: '/assignments/$assignmentId',
        params: {
          assignmentId: assignment.id,
        },
      });
    }, 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  // Simple poker suit icons as SVGs
  const pokerIcons = [
    // Hearts
    <svg key="hearts" className="w-12 h-12" viewBox="0 0 24 24" fill="#2e2e2e">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>,
    // Diamonds  
    <svg key="diamonds" className="w-12 h-12" viewBox="0 0 24 24" fill="#2e2e2e">
      <path d="M12 2l5.5 7.5L12 17 6.5 9.5L12 2z"/>
    </svg>,
    // Clubs
    <svg key="clubs" className="w-12 h-12" viewBox="0 0 24 24" fill="#2e2e2e">
      <path d="M12 2C10.9 2 10 2.9 10 4c0 .74.4 1.38 1 1.72v.78c-.83.17-1.5.83-1.5 1.75 0 .69.39 1.28.96 1.58L9.5 11H8c-1.1 0-2 .9-2 2s.9 2 2 2h1.5l.96 1.17c-.57.3-.96.89-.96 1.58 0 .92.67 1.58 1.5 1.75v.78c-.6.34-1 .98-1 1.72 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.38-1-1.72v-.78c.83-.17 1.5-.83 1.5-1.75 0-.69-.39-1.28-.96-1.58L14.5 15H16c1.1 0 2-.9 2-2s-.9-2-2-2h-1.5l-.96-1.17c.57-.3.96-.89.96-1.58 0-.92-.67-1.58-1.5-1.75v-.78c.6-.34 1-.98 1-1.72 0-1.1-.9-2-2-2z"/>
    </svg>,
    // Spades
    <svg key="spades" className="w-12 h-12" viewBox="0 0 24 24" fill="#2e2e2e">
      <path d="M12 2l6 9c0 3.31-2.69 6-6 6s-6-2.69-6-6l6-9z M10 17h4v3h-4z"/>
    </svg>
  ];

  const getRandomIcon = () => {
    return pokerIcons[Math.floor(Math.random() * pokerIcons.length)];
  };

  return (
    <div 
      className="relative h-72 w-48 mx-auto cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={handleClick}
    >
      <div className={`absolute inset-0 w-full h-full transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white border-4 border-black rounded-lg shadow-sm p-4 flex flex-col justify-between">
          {/* Top section with title and due date */}
          <div>
            <h3 className="text-lg font-semibold mb-2 line-clamp-2" style={{ color: '#2e2e2e' }}>
              {assignment.title}
            </h3>
            <p className="text-sm mb-4" style={{ color: '#2e2e2e' }}>
              Due: {formatDate(assignment.dueDate)}
            </p>
          </div>
          
          {/* Center poker icon */}
          <div className="flex-1 flex items-center justify-center">
            {getRandomIcon()}
          </div>
          
          {/* Bottom class code */}
          <div className="mt-auto">
            <span className="inline-block bg-gray-100 text-xs font-medium px-2 py-1 rounded" style={{ color: '#2e2e2e' }}>
              {assignment.classCode}
            </span>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-white border-4 border-black rounded-lg shadow-sm p-4 flex flex-col">
          <div className="flex-1 relative overflow-hidden">
            <h3 className="text-lg font-bold mb-3" style={{ color: '#2e2e2e' }}>{assignment.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#2e2e2e' }}>
              {assignment.description}
            </p>
            
            {/* White fade overlay at bottom with read more */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent">
              <div className="absolute bottom-2 right-2">
                <button
                  className="text-xs underline hover:opacity-70 transition-opacity"
                  style={{ color: '#2e2e2e' }}
                  onClick={handleReadMore}
                >
                  View More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
C        .transform-style-preserve-3d {
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