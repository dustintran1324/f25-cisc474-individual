import { z } from 'zod';
import { Pagination } from './queries';

export const FeedbackRef = z.object({
  id: z.string(),
  points: z.number().nullable(),
  isPublished: z.boolean(),
});

export type FeedbackRef = z.infer<typeof FeedbackRef>;

export const FeedbackOut = z.object({
  id: z.string(),
  points: z.number().nullable(),
  comments: z.string().nullable(),
  isPublished: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  submissionId: z.string(),
  graderId: z.string(),
  studentId: z.string(),
});

export type FeedbackOut = z.infer<typeof FeedbackOut>;

export const FeedbackCreateIn = z.object({
  points: z.number().int().optional().nullable(),
  comments: z.string().optional().nullable(),
  submissionId: z.string(),
  graderId: z.string(),
  studentId: z.string(),
});

export type FeedbackCreateIn = z.infer<typeof FeedbackCreateIn>;

export const FeedbackUpdateIn = z.object({
  points: z.number().int().optional().nullable(),
  comments: z.string().optional().nullable(),
  isPublished: z.boolean().optional(),
});

export type FeedbackUpdateIn = z.infer<typeof FeedbackUpdateIn>;

export const FeedbackListFilter = Pagination.extend({
  submissionId: z.string().optional(),
  studentId: z.string().optional(),
  isPublished: z.boolean().optional(),
});

export type FeedbackListFilter = z.infer<typeof FeedbackListFilter>;
