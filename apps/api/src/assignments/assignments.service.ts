import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AssignmentCreateIn, AssignmentUpdateIn } from '@repo/api';

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

  async create(createDto: AssignmentCreateIn) {
    return this.prisma.assignment.create({
      data: {
        ...createDto,
        dueDate: new Date(createDto.dueDate as string),
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

  async update(id: string, updateDto: AssignmentUpdateIn) {
    return this.prisma.assignment.update({
      where: { id },
      data: {
        ...updateDto,
        dueDate: updateDto.dueDate ? new Date(updateDto.dueDate as string) : undefined,
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