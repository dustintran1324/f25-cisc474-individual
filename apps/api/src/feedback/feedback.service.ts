import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.feedback.findMany();
  }

  async findOne(id: string) {
    return this.prisma.feedback.findUnique({
      where: { id },
    });
  }
}