import { z } from 'zod';
import { Pagination } from './queries';

export const NotificationTypeEnum = z.enum([
  'ASSIGNMENT_DUE',
  'GRADE_POSTED',
  'COURSE_ANNOUNCEMENT',
  'SYSTEM_MESSAGE',
]);

export const NotificationRef = z.object({
  id: z.string(),
  type: NotificationTypeEnum,
  title: z.string(),
  isRead: z.boolean(),
});

export type NotificationRef = z.infer<typeof NotificationRef>;

export const NotificationOut = z.object({
  id: z.string(),
  type: NotificationTypeEnum,
  title: z.string(),
  message: z.string(),
  isRead: z.boolean(),
  createdAt: z.coerce.date(),
  userId: z.string(),
  courseId: z.string().nullable(),
  assignmentId: z.string().nullable(),
  submissionId: z.string().nullable(),
});

export type NotificationOut = z.infer<typeof NotificationOut>;

export const NotificationCreateIn = z.object({
  type: NotificationTypeEnum,
  title: z.string().min(1),
  message: z.string(),
  userId: z.string(),
  courseId: z.string().optional().nullable(),
  assignmentId: z.string().optional().nullable(),
  submissionId: z.string().optional().nullable(),
});

export type NotificationCreateIn = z.infer<typeof NotificationCreateIn>;

export const NotificationUpdateIn = z.object({
  isRead: z.boolean().optional(),
});

export type NotificationUpdateIn = z.infer<typeof NotificationUpdateIn>;

export const NotificationsListFilter = Pagination.extend({
  userId: z.string().optional(),
  isRead: z.boolean().optional(),
  type: NotificationTypeEnum.optional(),
});

export type NotificationsListFilter = z.infer<typeof NotificationsListFilter>;
