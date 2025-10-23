import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

export interface CourseCreateDto {
  title: string;
  description?: string;
  tarotTheme?: string;
  code: string;
  instructorId: string;
  isActive?: boolean;
}

export interface CourseUpdateDto {
  title?: string;
  description?: string;
  tarotTheme?: string;
  code?: string;
  isActive?: boolean;
}

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.course.findMany();
  }

  async findOne(id: string) {
    return this.prisma.course.findUnique({
      where: { id },
    });
  }

  async create(createCourseDto: CourseCreateDto) {
    return this.prisma.course.create({
      data: createCourseDto,
    });
  }

  async update(id: string, updateCourseDto: CourseUpdateDto) {
    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  async remove(id: string) {
    return this.prisma.course.delete({
      where: { id },
    });
  }
}