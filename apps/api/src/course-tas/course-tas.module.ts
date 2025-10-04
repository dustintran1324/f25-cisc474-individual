import { Module } from '@nestjs/common';
import { CourseTasController } from './course-tas.controller';
import { CourseTasService } from './course-tas.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [CourseTasController],
  providers: [CourseTasService, PrismaService],
})
export class CourseTasModule {}