import { z } from 'zod';
import { Pagination } from './queries';

export const SubmissionTypeEnum = z.enum([
  'TRADITIONAL_CODE',
  'SOLUTION_WALKTHROUGH',
  'REVERSE_PROGRAMMING',
]);

export const SubmissionStatusEnum = z.enum([
  'DRAFT',
  'SUBMITTED',
  'GRADED',
  'RETURNED',
]);

export const SubmissionRef = z.object({
  id: z.string(),
  type: SubmissionTypeEnum,
  status: SubmissionStatusEnum,
  submittedAt: z.coerce.date().nullable(),
});

export type SubmissionRef = z.infer<typeof SubmissionRef>;

export const SubmissionOut = z.object({
  id: z.string(),
  type: SubmissionTypeEnum,
  status: SubmissionStatusEnum,
  codeContent: z.string().nullable(),
  walkthroughText: z.string().nullable(),
  codeExplanation: z.string().nullable(),
  submittedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
  assignmentId: z.string(),
  // Nested objects returned by backend
  assignment: z.object({
    id: z.string(),
    title: z.string(),
    maxPoints: z.number(),
    dueDate: z.coerce.date(),
    courseId: z.string().optional(),
    course: z.object({
      id: z.string(),
      code: z.string(),
      title: z.string(),
    }).optional(),
  }).optional(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
  }).optional(),
  feedback: z.array(z.object({
    id: z.string(),
    points: z.number().nullable(),
    comments: z.string().nullable(),
    isPublished: z.boolean(),
    createdAt: z.coerce.date(),
    grader: z.object({
      id: z.string(),
      name: z.string(),
    }).optional(),
  })).optional(),
});

export type SubmissionOut = z.infer<typeof SubmissionOut>;

export const SubmissionCreateIn = z.object({
  type: SubmissionTypeEnum,
  codeContent: z.string().optional().nullable(),
  walkthroughText: z.string().optional().nullable(),
  codeExplanation: z.string().optional().nullable(),
  userId: z.string(),
  assignmentId: z.string(),
});

export type SubmissionCreateIn = z.infer<typeof SubmissionCreateIn>;

export const SubmissionUpdateIn = z.object({
  type: SubmissionTypeEnum.optional(),
  codeContent: z.string().optional().nullable(),
  walkthroughText: z.string().optional().nullable(),
  codeExplanation: z.string().optional().nullable(),
  status: SubmissionStatusEnum.optional(),
});

export type SubmissionUpdateIn = z.infer<typeof SubmissionUpdateIn>;

export const SubmissionsListFilter = Pagination.extend({
  userId: z.string().optional(),
  assignmentId: z.string().optional(),
  status: SubmissionStatusEnum.optional(),
  type: SubmissionTypeEnum.optional(),
});

export type SubmissionsListFilter = z.infer<typeof SubmissionsListFilter>;
