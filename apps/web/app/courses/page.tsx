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
      instructor: "Dr. Smith",
      credits: 3,
      status: "active",
      progress: 75
    },
    {
      id: 2,
      code: "CISC372",
      name: "Parallel Computing",
      instructor: "Prof. Johnson",
      credits: 3,
      status: "active",
      progress: 60
    },
    {
      id: 3,
      code: "CISC675",
      name: "Machine Learning",
      instructor: "Dr. Brown",
      credits: 3,
      status: "completed",
      progress: 100
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-[l] py-[2xl]">
      <div className="mb-[l]">
        <h1 className="text-3xl font-bold text-gray-900 mb-[s]">My Courses</h1>
        <p className="text-gray-600">Manage your enrolled courses and track progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[l]">
        {courses.map((course) => (
          <div 
            key={course.id}
            className="bg-white border border-gray-200 rounded-container p-[l] hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="mb-[m]">
              <div className="flex items-center justify-between mb-[s]">
                <span className="text-sm font-medium text-blue-600">{course.code}</span>
                <span className={`text-xs px-[s] py-[xs] rounded-full ${
                  course.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {course.status}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-[xs]">{course.name}</h3>
              <p className="text-sm text-gray-600">{course.instructor}</p>
              <p className="text-sm text-gray-500">{course.credits} credits</p>
            </div>

            <div className="mb-[m]">
              <div className="flex justify-between text-sm mb-[xs]">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex gap-[s]">
              <button className="flex-1 bg-blue-600 text-white py-[s] px-[m] rounded-lg text-sm hover:bg-blue-700 transition-colors">
                View Course
              </button>
              <button className="px-[m] py-[s] border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                ⋯
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-[2xl] text-center">
        <button className="bg-blue-600 text-white px-[l] py-[m] rounded-lg hover:bg-blue-700 transition-colors">
          + Enroll in New Course
        </button>
      </div>
    </div>
  );
}