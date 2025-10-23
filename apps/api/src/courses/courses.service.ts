import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CourseCreateIn, CourseUpdateIn } from '@repo/api';

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

  async create(createCourseDto: CourseCreateIn) {
    return this.prisma.course.create({
      data: createCourseDto,
    });
  }

  async update(id: string, updateCourseDto: CourseUpdateIn) {
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