# LMS Database Documentation (Tarot theme)

## Overview
This document provides links and information about the database schema and seed data for the Mystical Tarot Learning Management System (LMS).

## Prisma Schema

**Main Schema File**: 
- [schema.prisma](../../packages/database/prisma/schema.prisma)

## Database Structure

The LMS database includes the following core entities:

### Core Tables
1. **Users** - Students, TAs, Instructors, and Admins
2. **Courses** - Programming courses with tarot themes  
3. **CourseTA** - Junction table for TA assignments to courses
4. **Enrollments** - Student enrollments in courses
5. **Assignments** - Course assignments supporting three unique submission types
6. **Submissions** - Student submissions with unique submission types
7. **Feedback** - Grading and comments from instructors/TAs
8. **Notifications** - System notifications for students

### Unique Features

#### Three Submission Types (Your Cool Feature)
1. **TRADITIONAL_CODE** - "The Scribe" - Normal programming assignments
2. **SOLUTION_WALKTHROUGH** - "The Oracle" - Students explain their solution approach (validated by LLM)
3. **REVERSE_PROGRAMMING** - "The Sage" - Students analyze existing code and explain its purpose

#### User Roles
- **STUDENT** - Students who are enrolled in the courses
- **TA** - Teaching Assistants who can grade assignments
- **INSTRUCTOR** - Course instructors who can also grade assignments
- **ADMIN** - System administrators

#### Mystical Tarot Theme
- Courses have `tarotTheme` field (e.g., "The Magician - Creation and Manifestation")
- Medieval/mystical naming conventions throughout
- Tarot card aesthetic for the UI

## Seed Data

**Seed Script**: 
- [seed.ts](../../packages/database/src/seed.ts)

### Sample Data Includes:
- **Users**: 12 students, 3 instructors, 3 TAs, 1 admin (all with fruit+flower names and @udel.edu emails)
- **Courses**: 3 mystical programming courses (PROG101, ALGO201, WEB301)
- **Assignments**: 5 assignments showcasing all three submission types
- **Submissions**: Sample submissions demonstrating each submission type
- **Feedback**: Graded submissions with mystical-themed feedback
- **Notifications**: Assignment reminders and grade notifications

## CSV Data Exports

All tables have been successfully seeded and exported from Supabase:

- **Users Table**: [users_rows.csv](./csv-exports/users_rows.csv) - 19 users with fruit+flower names
- **Courses Table**: [courses_rows.csv](./csv-exports/courses_rows.csv) - 3 mystical programming courses
- **CourseTA Table**: [course_tas_rows.csv](./csv-exports/course_tas_rows.csv) - TA assignments to courses
- **Enrollments Table**: [enrollments_rows.csv](./csv-exports/enrollments_rows.csv) - Student course enrollments
- **Assignments Table**: [assignments_rows.csv](./csv-exports/assignments_rows.csv) - 5 assignments with unique submission types
- **Submissions Table**: [submissions_rows.csv](./csv-exports/submissions_rows.csv) - Example submissions showcasing all 3 types
- **Feedback Table**: [feedback_rows.csv](./csv-exports/feedback_rows.csv) - Graded submissions with mystical feedback
- **Notifications Table**: [notifications_rows.csv](./csv-exports/notifications_rows.csv) - Dashboard notifications

## Schema Highlights

### Relationships
- Users can have multiple roles (Student enrolls, TA assists, Instructor teaches)
- Courses have one instructor but can have multiple TAs
- Assignments belong to courses and support multiple submission types
- Students can submit multiple times per assignment (drafts, revisions)
- Both instructors and TAs can provide feedback

### Enums
- `UserRole`: STUDENT, TA, INSTRUCTOR, ADMIN
- `SubmissionType`: TRADITIONAL_CODE, SOLUTION_WALKTHROUGH, REVERSE_PROGRAMMING  
- `SubmissionStatus`: DRAFT, SUBMITTED, GRADED, RETURNED
- `NotificationType`: ASSIGNMENT_DUE, GRADE_POSTED, COURSE_ANNOUNCEMENT, SYSTEM_MESSAGE

### Unique Constraints
- User emails are unique
- Course codes are unique (e.g., "PROG101")
- User-Course enrollment combinations are unique
- User-Course TA assignments are unique