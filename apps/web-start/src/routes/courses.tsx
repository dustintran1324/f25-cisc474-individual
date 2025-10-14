import { createFileRoute } from '@tanstack/react-router';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { COLORS, OPACITY } from '../constants/theme';
import { MOCK_INSTRUCTORS } from '../constants/mockData';

export const Route = createFileRoute('/courses')({
  component: CoursesPage,
});

function CoursesPage() {
  const courses = [
    {
      id: 1,
      code: "CISC474",
      name: "Advanced Web Technologies",
      instructor: MOCK_INSTRUCTORS.webDev,
      credits: 3,
      status: "active",
      progress: 75
    },
    {
      id: 2,
      code: "CISC372",
      name: "Parallel Computing",
      instructor: MOCK_INSTRUCTORS.parallelComputing,
      credits: 3,
      status: "active",
      progress: 60
    },
    {
      id: 3,
      code: "CISC675",
      name: "Machine Learning",
      instructor: MOCK_INSTRUCTORS.machineLearning,
      credits: 3,
      status: "completed",
      progress: 100
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <PageHeader title="My Courses" subtitle="Manage your enrolled courses and track progress" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white border-4 border-black rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold px-2 py-1 bg-gray-100 rounded" style={{ color: COLORS.primary }}>
                    {course.code}
                  </span>
                  <span className="text-xs px-2 py-1 rounded bg-gray-100" style={{ color: COLORS.primary }}>
                    {course.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: COLORS.primary }}>
                  {course.name}
                </h3>
                <p className="text-sm mb-1" style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
                  {course.instructor}
                </p>
                <p className="text-sm" style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
                  {course.credits} credits
                </p>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: COLORS.primary, opacity: OPACITY.medium }}>Progress</span>
                  <span className="font-semibold" style={{ color: COLORS.primary }}>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 border-2 border-black">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${course.progress}%`,
                      backgroundColor: COLORS.primary
                    }}
                  ></div>
                </div>
              </div>

              <button
                className="w-full border-2 border-black py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                style={{ color: COLORS.primary }}
              >
                View Course
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            className="border-2 border-black px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 mx-auto"
            style={{ color: COLORS.primary }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Manage Courses
          </button>
        </div>
      </div>
    </div>
  );
}
