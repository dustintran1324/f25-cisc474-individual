interface CalendarProps {
  title?: string;
}

export default function Calendar({ title = "Calendar" }: CalendarProps) {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleDateString('en-US', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  // Generate days for current month (simplified placeholder)
  const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1).getDay();
  
  const days = [];
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const today = currentDate.getDate();

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-default-gray mb-4">{title}</h3>
      
      {/* Month/Year header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-md font-medium text-default-gray">
          {currentMonth} {currentYear}
        </h4>
        <div className="flex space-x-2">
          <button className="p-1 hover:bg-gray-100 rounded">
            <svg className="w-4 h-4 text-default-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <svg className="w-4 h-4 text-default-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-xs font-medium text-default-gray/60 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            className={`
              text-center py-2 text-sm cursor-pointer hover:bg-gray-50 rounded
              ${day === today ? 'bg-default-gray text-white hover:bg-default-gray/80' : ''}
              ${day ? 'text-default-gray' : ''}
            `}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Placeholder upcoming events */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h5 className="text-sm font-medium text-default-gray mb-2">Upcoming</h5>
        <div className="space-y-2">
          <div className="text-xs text-default-gray/60">
            • Assignment due Jan 15
          </div>
          <div className="text-xs text-default-gray/60">
            • Quiz on Jan 18
          </div>
          <div className="text-xs text-default-gray/60">
            • Project presentation Jan 25
          </div>
        </div>
      </div>
    </div>
  );
}