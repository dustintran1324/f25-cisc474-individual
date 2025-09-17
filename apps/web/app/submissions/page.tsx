export const metadata = {
  title: 'Submissions - Learning Management System',
  description: "View and manage your assignment submissions",
};

export default function SubmissionsPage() {
  const submissions = [
    {
      id: 1,
      title: "Project Milestone 2",
      course: "CISC474",
      dueDate: "2024-03-15",
      status: "submitted",
      grade: "A-",
      submittedAt: "2024-03-14"
    },
    {
      id: 2,
      title: "Parallel Algorithm Analysis",
      course: "CISC372", 
      dueDate: "2024-03-20",
      status: "pending",
      grade: null,
      submittedAt: null
    },
    {
      id: 3,
      title: "Neural Network Implementation",
      course: "CISC675",
      dueDate: "2024-03-10",
      status: "graded",
      grade: "B+",
      submittedAt: "2024-03-09"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'graded': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-[l] py-[2xl]">
      <div className="mb-[l]">
        <h1 className="text-3xl font-bold text-gray-900 mb-[s]">My Submissions</h1>
        <p className="text-gray-600">Track your assignment submissions and grades</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-container overflow-hidden">
        <div className="px-[l] py-[m] border-b border-gray-200 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-[m] text-sm font-medium text-gray-700">
            <div className="md:col-span-2">Assignment</div>
            <div>Course</div>
            <div>Due Date</div>
            <div>Status</div>
            <div>Grade</div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {submissions.map((submission) => (
            <div 
              key={submission.id}
              className="px-[l] py-[m] hover:bg-gray-50 transition-colors"
            >
              <div className="grid grid-cols-1 md:grid-cols-6 gap-[m] items-center">
                <div className="md:col-span-2">
                  <h3 className="font-medium text-gray-900">{submission.title}</h3>
                  {submission.submittedAt && (
                    <p className="text-sm text-gray-500">
                      Submitted: {new Date(submission.submittedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="text-sm text-gray-600">{submission.course}</div>
                <div className="text-sm text-gray-600">
                  {new Date(submission.dueDate).toLocaleDateString()}
                </div>
                <div>
                  <span className={`text-xs px-[s] py-[xs] rounded-full ${getStatusColor(submission.status)}`}>
                    {submission.status}
                  </span>
                </div>
                <div className="font-medium">
                  {submission.grade || '-'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {submissions.length === 0 && (
        <div className="text-center py-[2xl]">
          <div className="text-gray-400 mb-[m]">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-[s]">No submissions yet</h3>
          <p className="text-gray-500">Your assignment submissions will appear here</p>
        </div>
      )}
    </div>
  );
}