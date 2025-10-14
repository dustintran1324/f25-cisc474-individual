import { createFileRoute } from '@tanstack/react-router';
import { Avatar } from '../components/Avatar/Avatar';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { COLORS, OPACITY } from '../constants/theme';
import { MOCK_USER } from '../constants/mockData';

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <PageHeader title="My Profile" subtitle="Manage your account settings" />

        <div className="bg-white border-4 border-black rounded-lg shadow-sm p-8">
          <div className="flex items-center gap-6 mb-8 pb-8 border-b-2 border-black">
            <Avatar size="large" />
            <div>
              <h2 className="text-2xl font-bold mb-1" style={{ color: COLORS.primary }}>
                {MOCK_USER.name}
              </h2>
              <p className="text-base" style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
                {MOCK_USER.email}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6" style={{ color: COLORS.primary }}>
              Account Information
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                  Name
                </label>
                <input
                  type="text"
                  defaultValue={MOCK_USER.name}
                  className="w-full px-4 py-3 border-2 border-black rounded-lg"
                  style={{ color: COLORS.primary }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={MOCK_USER.email}
                  className="w-full px-4 py-3 border-2 border-black rounded-lg"
                  style={{ color: COLORS.primary }}
                />
              </div>
            </div>
            <button
              className="mt-8 border-2 border-black px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              style={{ color: COLORS.primary }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
