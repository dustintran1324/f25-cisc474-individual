const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export interface Course {
  id: string;
  title: string;
  description: string;
  tarotTheme: string;
  code: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  instructorId: string;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  userId: string;
  courseId: string;
}

export const api = {
  courses: {
    getAll: async (): Promise<Course[]> => {
      const response = await fetch(`${BACKEND_URL}/courses`);
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      return response.json();
    },
    getById: async (id: string): Promise<Course> => {
      const response = await fetch(`${BACKEND_URL}/courses/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch course');
      }
      return response.json();
    },
  },
  notifications: {
    getAll: async (): Promise<Notification[]> => {
      const response = await fetch(`${BACKEND_URL}/notifications`);
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      return response.json();
    },
    getById: async (id: string): Promise<Notification> => {
      const response = await fetch(`${BACKEND_URL}/notifications/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch notification');
      }
      return response.json();
    },
  },
};
