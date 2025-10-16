'use client';

import { useCourses } from '../../hooks/useCourses';
import { COLORS, OPACITY } from '../../constants/theme';

export function CoursesList() {
  const { data: courses, isLoading, error } = useCourses();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" style={{ color: COLORS.primary }} />
          <p className="mt-4" style={{ color: COLORS.primary }}>Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-4 border-red-500 rounded-lg p-6 text-center">
        <p className="text-red-700 font-semibold">Failed to load courses</p>
        <p className="text-red-600 text-sm mt-2">{error.message}</p>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="bg-gray-50 border-4 border-black rounded-lg p-8 text-center">
        <p style={{ color: COLORS.primary }}>No courses found</p>
      </div>
    );
  }

  return (
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
                {course.isActive ? 'active' : 'inactive'}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: COLORS.primary }}>
              {course.title}
            </h3>
            <p className="text-sm mb-2" style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
              {course.description}
            </p>
            <p className="text-xs italic" style={{ color: COLORS.primary, opacity: OPACITY.low }}>
              {course.tarotTheme}
            </p>
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
  );
}
