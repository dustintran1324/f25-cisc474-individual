import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

export interface FeedbackCreateDto {
  points?: number;
  comments?: string;
  submissionId: string;
  graderId: string;
  studentId: string;
}

export interface FeedbackUpdateDto {
  points?: number;
  comments?: string;
  isPublished?: boolean;
}

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.feedback.findMany({
      include: {
        submission: {
          select: {
            id: true,
            type: true,
            status: true,
          },
        },
        grader: {
          select: {
            id: true,
            name: true,
          },
        },
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.feedback.findUnique({
      where: { id },
      include: {
        submission: true,
        grader: {
          select: {
            id: true,
            name: true,
          },
        },
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findBySubmission(submissionId: string) {
    return this.prisma.feedback.findMany({
      where: { submissionId },
      include: {
        grader: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(createDto: FeedbackCreateDto) {
    return this.prisma.feedback.create({
      data: createDto,
      include: {
        submission: true,
        grader: {
          select: {
            id: true,
            name: true,
          },
        },
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async update(id: string, updateDto: FeedbackUpdateDto) {
    return this.prisma.feedback.update({
      where: { id },
      data: updateDto,
      include: {
        submission: true,
        grader: {
          select: {
            id: true,
            name: true,
          },
        },
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async publish(id: string) {
    return this.prisma.feedback.update({
      where: { id },
      data: {
        isPublished: true,
      },
      include: {
        submission: true,
        grader: {
          select: {
            id: true,
            name: true,
          },
        },
        student: {
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
    return this.prisma.feedback.delete({
      where: { id },
    });
  }
}
