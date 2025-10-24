import type {
  CourseOut,
  CourseCreateIn,
  CourseUpdateIn,
  AssignmentOut,
  AssignmentCreateIn,
  AssignmentUpdateIn,
  SubmissionOut,
  SubmissionCreateIn,
  SubmissionUpdateIn,
  NotificationOut,
  NotificationUpdateIn,
  UserOut,
  UserUpdateIn,
} from '@repo/api';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

const createAuthHeaders = (token?: string): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const createApiClient = (token?: string) => ({
  courses: {
    getAll: async (): Promise<CourseOut[]> => {
      const response = await fetch(`${BACKEND_URL}/courses`, {
        headers: token ? createAuthHeaders(token) : undefined,
      });
      if (!response.ok) throw new Error('Failed to fetch courses');
      return response.json();
    },
    getById: async (id: string): Promise<CourseOut> => {
      const response = await fetch(`${BACKEND_URL}/courses/${id}`, {
        headers: token ? createAuthHeaders(token) : undefined,
      });
      if (!response.ok) throw new Error('Failed to fetch course');
      return response.json();
    },
    create: async (data: CourseCreateIn): Promise<CourseOut> => {
      const response = await fetch(`${BACKEND_URL}/courses`, {
        method: 'POST',
        headers: createAuthHeaders(token),
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create course');
      return response.json();
    },
    update: async (id: string, data: CourseUpdateIn): Promise<CourseOut> => {
      const response = await fetch(`${BACKEND_URL}/courses/${id}`, {
        method: 'PATCH',
        headers: createAuthHeaders(token),
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update course');
      return response.json();
    },
    delete: async (id: string): Promise<void> => {
      const response = await fetch(`${BACKEND_URL}/courses/${id}`, {
        method: 'DELETE',
        headers: token ? createAuthHeaders(token) : undefined,
      });
      if (!response.ok) throw new Error('Failed to delete course');
    },
  },

  assignments: {
    getAll: async (courseId?: string): Promise<AssignmentOut[]> => {
      const url = courseId
        ? `${BACKEND_URL}/assignments?courseId=${courseId}`
        : `${BACKEND_URL}/assignments`;
      const response = await fetch(url, {
        headers: token ? createAuthHeaders(token) : undefined,
      });
      if (!response.ok) throw new Error('Failed to fetch assignments');
      return response.json();
    },
    getById: async (id: string): Promise<AssignmentOut> => {
      const response = await fetch(`${BACKEND_URL}/assignments/${id}`, {
        headers: token ? createAuthHeaders(token) : undefined,
      });
      if (!response.ok) throw new Error('Failed to fetch assignment');
      return response.json();
    },
    create: async (data: AssignmentCreateIn): Promise<AssignmentOut> => {
      const response = await fetch(`${BACKEND_URL}/assignments`, {
        method: 'POST',
        headers: createAuthHeaders(token),
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create assignment');
      return response.json();
    },
    update: async (id: string, data: AssignmentUpdateIn): Promise<AssignmentOut> => {
      const response = await fetch(`${BACKEND_URL}/assignments/${id}`, {
        method: 'PATCH',
        headers: createAuthHeaders(token),
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update assignment');
      return response.json();
    },
    delete: async (id: string): Promise<void> => {
      const response = await fetch(`${BACKEND_URL}/assignments/${id}`, {
        method: 'DELETE',
        headers: token ? createAuthHeaders(token) : undefined,
      });
      if (!response.ok) throw new Error('Failed to delete assignment');
    },
  },

  submissions: {
    getAll: async (userId?: string, assignmentId?: string): Promise<SubmissionOut[]> => {
      const params = new URLSearchParams();
      if (userId) params.append('userId', userId);
      if (assignmentId) params.append('assignmentId', assignmentId);
      const url = `${BACKEND_URL}/submissions${params.toString() ? `?${params.toString()}` : ''}`;
      const response = await fetch(url, {
        headers: token ? createAuthHeaders(token) : undefined,
      });
      if (!response.ok) throw new Error('Failed to fetch submissions');
      return response.json();
    },
    getById: async (id: string): Promise<SubmissionOut> => {
      const response = await fetch(`${BACKEND_URL}/submissions/${id}`, {
        headers: token ? createAuthHeaders(token) : undefined,
      });
      if (!response.ok) throw new Error('Failed to fetch submission');
      return response.json();
    },
    create: async (data: SubmissionCreateIn): Promise<SubmissionOut> => {
      const response = await fetch(`${BACKEND_URL}/submissions`, {
        method: 'POST',
        headers: createAuthHeaders(token),
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create submission');
      return response.json();
    },
    update: async (id: string, data: SubmissionUpdateIn): Promise<SubmissionOut> => {
      const response = await fetch(`${BACKEND_URL}/submissions/${id}`, {
        method: 'PATCH',
        headers: createAuthHeaders(token),
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update submission');
      return response.json();
    },
    submit: async (id: string): Promise<SubmissionOut> => {
      const response = await fetch(`${BACKEND_URL}/submissions/${id}/submit`, {
        method: 'POST',
        headers: token ? createAuthHeaders(token) : undefined,
      });
      if (!response.ok) throw new Error('Failed to submit submission');
      return response.json();
    },
    delete: async (id: string): Promise<void> => {
      const response = await fetch(`${BACKEND_URL}/submissions/${id}`, {
        method: 'DELETE',
        headers: token ? createAuthHeaders(token) : undefined,
      });
      if (!response.ok) throw new Error('Failed to delete submission');
    },
  },

  notifications: {
    getAll: async (userId?: string): Promise<NotificationOut[]> => {
      const url = userId
        ? `${BACKEND_URL}/notifications?userId=${userId}`
        : `${BACKEND_URL}/notifications`;
      const response = await fetch(url, {
        headers: token ? createAuthHeaders(token) : undefined,
      });
      if (!response.ok) throw new Error('Failed to fetch notifications');
      return response.json();
    },
    getById: async (id: string): Promise<NotificationOut> => {
      const response = await fetch(`${BACKEND_URL}/notifications/${id}`, {
        headers: token ? createAuthHeaders(token) : undefined,
      });
      if (!response.ok) throw new Error('Failed to fetch notification');
      return response.json();
    },
    markAsRead: async (id: string): Promise<NotificationOut> => {
      const response = await fetch(`${BACKEND_URL}/notifications/${id}`, {
        method: 'PATCH',
        headers: createAuthHeaders(token),
        body: JSON.stringify({ isRead: true } as NotificationUpdateIn),
      });
      if (!response.ok) throw new Error('Failed to mark notification as read');
      return response.json();
    },
  },

  users: {
    getMe: async (): Promise<UserOut> => {
      const response = await fetch(`${BACKEND_URL}/users/me`, {
        headers: createAuthHeaders(token),
      });
      if (!response.ok) throw new Error('Failed to fetch current user');
      return response.json();
    },
    update: async (id: string, data: UserUpdateIn): Promise<UserOut> => {
      const response = await fetch(`${BACKEND_URL}/users/${id}`, {
        method: 'PATCH',
        headers: createAuthHeaders(token),
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update user');
      return response.json();
    },
  },
});

export const api = createApiClient();
