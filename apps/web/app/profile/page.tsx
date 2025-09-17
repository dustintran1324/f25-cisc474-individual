export const metadata = {
  title: 'User Profile - Learning Management System',
  description: "User profile and settings page",
};

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto px-[l] py-[2xl]">
      <div className="bg-white rounded-container border border-gray-200 p-[l]">
        <div className="flex items-center gap-[m] mb-[l]">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">JD</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
            <p className="text-gray-600">Student</p>
            <p className="text-sm text-gray-500">john.doe@university.edu</p>
          </div>
        </div>
        
        <div className="space-y-[m]">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-[s]">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[m]">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-[xs]">
                  First Name
                </label>
                <input 
                  type="text" 
                  defaultValue="John"
                  className="w-full px-[s] py-[xs] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-[xs]">
                  Last Name
                </label>
                <input 
                  type="text" 
                  defaultValue="Doe"
                  className="w-full px-[s] py-[xs] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-[xs]">
                  Email
                </label>
                <input 
                  type="email" 
                  defaultValue="john.doe@university.edu"
                  className="w-full px-[s] py-[xs] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-[xs]">
                  Student ID
                </label>
                <input 
                  type="text" 
                  defaultValue="STU123456"
                  className="w-full px-[s] py-[xs] border border-gray-300 rounded-lg bg-gray-50"
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="pt-[m] border-t border-gray-200">
            <button className="bg-blue-600 text-white px-[l] py-[s] rounded-lg hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}