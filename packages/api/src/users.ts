import { z } from 'zod';
import { Pagination } from './queries';

export const UserRef = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

export type UserRef = z.infer<typeof UserRef>;

export const UserOut = z.object({
  id: z.string(),
  auth0Id: z.string().nullable(),
  name: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  email: z.string().email(),
  emailVerified: z.coerce.date().nullable(),
  picture: z.string().nullable(),
  bio: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  role: z.enum(['STUDENT', 'TA', 'INSTRUCTOR', 'ADMIN']),
  isActive: z.boolean(),
  lastLoginAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type UserOut = z.infer<typeof UserOut>;

export const UserCreateIn = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  picture: z.string().optional(),
  bio: z.string().optional(),
  phoneNumber: z.string().optional(),
  role: z.enum(['STUDENT', 'TA', 'INSTRUCTOR', 'ADMIN']).optional().default('STUDENT'),
});

export type UserCreateIn = z.infer<typeof UserCreateIn>;

export const UserUpdateIn = z.object({
  name: z.string().min(1).optional(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  picture: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  role: z.enum(['STUDENT', 'TA', 'INSTRUCTOR', 'ADMIN']).optional(),
  isActive: z.boolean().optional(),
});

export type UserUpdateIn = z.infer<typeof UserUpdateIn>;

export const UsersListFilter = Pagination.extend({
  email: z.string().email().optional(),
  role: z.enum(['STUDENT', 'TA', 'INSTRUCTOR', 'ADMIN']).optional(),
  isActive: z.boolean().optional(),
});

export type UsersListFilter = z.infer<typeof UsersListFilter>;
