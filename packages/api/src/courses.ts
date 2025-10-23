import { z } from 'zod';
import { Pagination } from './queries';

export const CourseRef = z.object({
  id: z.string(),
  code: z.string(),
  title: z.string(),
});

export type CourseRef = z.infer<typeof CourseRef>;

export const CourseOut = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  syllabus: z.string().nullable(),
  tarotTheme: z.string().nullable(),
  code: z.string(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  instructorId: z.string(),
});

export type CourseOut = z.infer<typeof CourseOut>;

export const CourseCreateIn = z.object({
  title: z.string().min(1),
  description: z.string().optional().nullable(),
  syllabus: z.string().optional().nullable(),
  tarotTheme: z.string().optional().nullable(),
  code: z.string().min(1),
  instructorId: z.string(),
  isActive: z.boolean().optional().default(true),
});

export type CourseCreateIn = z.infer<typeof CourseCreateIn>;

export const CourseUpdateIn = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional().nullable(),
  syllabus: z.string().optional().nullable(),
  tarotTheme: z.string().optional().nullable(),
  code: z.string().min(1).optional(),
  isActive: z.boolean().optional(),
});

export type CourseUpdateIn = z.infer<typeof CourseUpdateIn>;

export const CoursesListFilter = Pagination.extend({
  isActive: z.boolean().optional(),
  instructorId: z.string().optional(),
  titleLike: z.string().optional(),
  codeLike: z.string().optional(),
});

export type CoursesListFilter = z.infer<typeof CoursesListFilter>;
