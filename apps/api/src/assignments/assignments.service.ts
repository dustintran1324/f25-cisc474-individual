import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SubmissionType } from '@repo/database';

export interface AssignmentCreateDto {
  title: string;
  description: string;
  instructions: string;
  dueDate: string; // ISO date string
  maxPoints?: number;
  allowedTypes: SubmissionType[];
  providedCode?: string;
  courseId: string;
  isActive?: boolean;
}

export interface AssignmentUpdateDto {
  title?: string;
  description?: string;
  instructions?: string;
  dueDate?: string; // ISO date string
  maxPoints?: number;
  allowedTypes?: SubmissionType[];
  providedCode?: string;
  isActive?: boolean;
}

@Injectable()
export class AssignmentsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.assignment.findMany({
      include: {
        course: {
          select: {
            id: true,
            code: true,
            title: true,
          },
        },
      },
      orderBy: {
        dueDate: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.assignment.findUnique({
      where: { id },
      include: {
        course: {
          select: {
            id: true,
            code: true,
            title: true,
          },
        },
      },
    });
  }

  async findByCourse(courseId: string) {
    return this.prisma.assignment.findMany({
      where: { courseId },
      orderBy: {
        dueDate: 'asc',
      },
    });
  }

  async create(createDto: AssignmentCreateDto) {
    return this.prisma.assignment.create({
      data: {
        ...createDto,
        dueDate: new Date(createDto.dueDate),
      },
      include: {
        course: {
          select: {
            id: true,
            code: true,
            title: true,
          },
        },
      },
    });
  }

  async update(id: string, updateDto: AssignmentUpdateDto) {
    return this.prisma.assignment.update({
      where: { id },
      data: {
        ...updateDto,
        dueDate: updateDto.dueDate ? new Date(updateDto.dueDate) : undefined,
      },
      include: {
        course: {
          select: {
            id: true,
            code: true,
            title: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    return this.prisma.assignment.delete({
      where: { id },
    });
  }
}