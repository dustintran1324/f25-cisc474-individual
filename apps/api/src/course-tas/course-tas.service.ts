import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CourseTasService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.courseTA.findMany();
  }

  async findOne(id: string) {
    return this.prisma.courseTA.findUnique({
      where: { id },
    });
  }
}