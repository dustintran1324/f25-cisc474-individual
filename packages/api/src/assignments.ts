import { z } from 'zod';
import { Pagination } from './queries';

export const SubmissionTypeEnum = z.enum([
  'TRADITIONAL_CODE',
  'SOLUTION_WALKTHROUGH',
  'REVERSE_PROGRAMMING',
]);

export const AssignmentRef = z.object({
  id: z.string(),
  title: z.string(),
  dueDate: z.coerce.date(),
});

export type AssignmentRef = z.infer<typeof AssignmentRef>;

export const AssignmentOut = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  instructions: z.string(),
  dueDate: z.coerce.date(),
  maxPoints: z.number(),
  isActive: z.boolean(),
  allowedTypes: z.array(SubmissionTypeEnum),
  providedCode: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  courseId: z.string(),
});

export type AssignmentOut = z.infer<typeof AssignmentOut>;

export const AssignmentCreateIn = z.object({
  title: z.string().min(1),
  description: z.string(),
  instructions: z.string(),
  dueDate: z.string(),
  maxPoints: z.number().int().positive().optional().default(100),
  allowedTypes: z.array(SubmissionTypeEnum),
  providedCode: z.string().optional().nullable(),
  courseId: z.string(),
  isActive: z.boolean().optional().default(true),
});

export type AssignmentCreateIn = z.infer<typeof AssignmentCreateIn>;

export const AssignmentUpdateIn = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  instructions: z.string().optional(),
  dueDate: z.string().optional(),
  maxPoints: z.number().int().positive().optional(),
  allowedTypes: z.array(SubmissionTypeEnum).optional(),
  providedCode: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
});

export type AssignmentUpdateIn = z.infer<typeof AssignmentUpdateIn>;

export const AssignmentsListFilter = Pagination.extend({
  courseId: z.string().optional(),
  isActive: z.boolean().optional(),
  dueBefore: z.string().optional(),
  dueAfter: z.string().optional(),
});

export type AssignmentsListFilter = z.infer<typeof AssignmentsListFilter>;
