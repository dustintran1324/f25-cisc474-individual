import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SubmissionCreateIn, SubmissionUpdateIn } from '@repo/api';

@Injectable()
export class SubmissionsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.submission.findMany({
      include: {
        assignment: {
          select: {
            id: true,
            title: true,
            maxPoints: true,
            dueDate: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        feedback: {
          where: {
            isPublished: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.submission.findUnique({
      where: { id },
      include: {
        assignment: {
          include: {
            course: {
              select: {
                id: true,
                code: true,
                title: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        feedback: {
          where: {
            isPublished: true,
          },
          include: {
            grader: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.submission.findMany({
      where: { userId },
      include: {
        assignment: {
          select: {
            id: true,
            title: true,
            maxPoints: true,
            dueDate: true,
            courseId: true,
          },
        },
        feedback: {
          where: {
            isPublished: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByAssignment(assignmentId: string) {
    return this.prisma.submission.findMany({
      where: { assignmentId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        feedback: true,
      },
      orderBy: {
        submittedAt: 'desc',
      },
    });
  }

  async findByUserAndAssignment(userId: string, assignmentId: string) {
    return this.prisma.submission.findUnique({
      where: {
        userId_assignmentId: {
          userId,
          assignmentId,
        },
      },
      include: {
        assignment: true,
        feedback: {
          where: {
            isPublished: true,
          },
          include: {
            grader: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async create(createDto: SubmissionCreateIn) {
    return this.prisma.submission.create({
      data: createDto,
      include: {
        assignment: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async update(id: string, updateDto: SubmissionUpdateIn) {
    return this.prisma.submission.update({
      where: { id },
      data: updateDto,
      include: {
        assignment: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async submit(id: string) {
    return this.prisma.submission.update({
      where: { id },
      data: {
        status: 'SUBMITTED',
        submittedAt: new Date(),
      },
      include: {
        assignment: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    return this.prisma.submission.delete({
      where: { id },
    });
  }
}
