interface ProgressTrackerProps {
  percentage?: number;
  title?: string;
}

export default function ProgressTracker({ 
  percentage = 75, 
  title = "Overall Progress" 
}: ProgressTrackerProps) {
  const radius = 60;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-default-gray mb-4">{title}</h3>
      <div className="flex items-center justify-center">
        <div className="relative">
          <svg
            height={radius * 2}
            width={radius * 2}
            className="transform -rotate-90"
          >
            {/* Background circle */}
            <circle
              stroke="#f3f4f6"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            {/* Progress circle */}
            <circle
              stroke="#2e2e2e"
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              className="transition-all duration-500 ease-in-out"
            />
          </svg>
          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-default-gray">
              {percentage}%
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-default-gray/60">
          {percentage}% of assignments completed
        </p>
      </div>
    </div>
  );
}