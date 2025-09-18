export const metadata = {
  title: 'Courses - Learning Management System',
  description: "View and manage your enrolled courses",
};

export default function CoursesPage() {
  const courses = [
    {
      id: 1,
      code: "CISC474",
      name: "Advanced Web Technologies",
      instructor: "Dr. Sarah Smith",
      instructorEmail: "s.smith@udel.edu",
      ta: "John Doe",
      taEmail: "jdoe@udel.edu",
      lectureTime: "Mon, Wed 12:30 - 2:15",
      location: "SHL112",
      officeHours: "Tue, Thu 2:00 - 4:00",
      grade: "A-",
      icon: "sword"
    },
    {
      id: 2,
      code: "CISC437",
      name: "Database Systems",
      instructor: "Prof. Michael Johnson",
      instructorEmail: "mjohnson@udel.edu",
      ta: "Jane Wilson",
      taEmail: "jwilson@udel.edu",
      lectureTime: "Tue, Thu 11:00 - 12:15",
      location: "MEM204",
      officeHours: "Wed, Fri 1:00 - 3:00",
      grade: "B+",
      icon: "castle"
    },
    {
      id: 3,
      code: "CISC320",
      name: "Data Structures & Algorithms",
      instructor: "Dr. Emily Brown",
      instructorEmail: "ebrown@udel.edu",
      ta: "Alex Chen",
      taEmail: "achen@udel.edu",
      lectureTime: "Mon, Wed, Fri 10:00 - 10:50",
      location: "KRB100",
      officeHours: "Mon, Wed 11:00 - 1:00",
      grade: "A",
      icon: "heart"
    }
  ];

  // Medieval SVG icons
  const getIcon = (iconType: string) => {
    const iconProps = "w-16 h-16";
    const fillColor = "#2e2e2e";
    
    switch (iconType) {
      case "sword":
        return (
          <svg className={iconProps} viewBox="0 0 24 24" fill={fillColor}>
            <path d="M6.92 5l1.41-1.41L12 7.17l3.67-3.58L17.08 5L13 9.07V20h-2V9.07L6.92 5zM12 1l-1 1h2l-1-1z"/>
          </svg>
        );
      case "castle":
        return (
          <svg className={iconProps} viewBox="0 0 24 24" fill={fillColor}>
            <path d="M2 20h20v2H2v-2zm0-4h2v-4h2v4h2v-4h2v4h2v-4h2v4h2v-4h2v4h2v-4h2v4h2V8h-2V6h-2v2h-2V6h-2v2h-2V6h-2v2H8V6H6v2H4V6H2v2H0v8h2v4z"/>
          </svg>
        );
      case "heart":
        return (
          <svg className={iconProps} viewBox="0 0 24 24" fill={fillColor}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        );
      default:
        return (
          <svg className={iconProps} viewBox="0 0 24 24" fill={fillColor}>
            <circle cx="12" cy="12" r="10"/>
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-center" style={{ color: '#2e2e2e' }}>
            Fall 2025 Semester
          </h1>
        </div>

        {/* Course Cards */}
        <div className="space-y-6">
          {courses.map((course) => (
            <div 
              key={course.id}
              className="mx-auto bg-white border border-gray-200 rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
              style={{ width: '70%', aspectRatio: '3/1' }}
            >
              <div className="flex h-full">
                {/* Left side - Icon */}
                <div className="flex-shrink-0 flex items-center justify-center pr-6">
                  {getIcon(course.icon)}
                </div>
                
                {/* Right side - Course Info */}
                <div className="flex-1 flex flex-col justify-between">
                  {/* Top section */}
                  <div>
                    <h2 className="text-xl font-bold mb-1" style={{ color: '#2e2e2e' }}>
                      {course.name}
                    </h2>
                    <p className="text-lg mb-3" style={{ color: '#2e2e2e' }}>
                      {course.code}
                    </p>
                  </div>
                  
                  {/* Middle section - Details */}
                  <div className="space-y-2 text-sm" style={{ color: '#2e2e2e' }}>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
                      </svg>
                      <span>{course.lectureTime}</span>
                      <span className="mx-3">|</span>
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span>{course.location}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                      </svg>
                      <span>Office hours: {course.officeHours}</span>
                    </div>
                    
                    <div className="space-y-1">
                      <div>
                        <span className="font-medium">Instructor:</span> {course.instructor} - {course.instructorEmail}
                      </div>
                      <div>
                        <span className="font-medium">TA:</span> {course.ta} - {course.taEmail}
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <span className="font-medium">Current Grade: </span>
                      <span className="font-bold text-lg">{course.grade}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}