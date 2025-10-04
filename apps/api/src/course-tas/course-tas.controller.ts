import { Controller, Get, Param } from '@nestjs/common';
import { CourseTasService } from './course-tas.service';

@Controller('course-tas')
export class CourseTasController {
  constructor(private readonly courseTasService: CourseTasService) {}

  @Get()
  findAll() {
    return this.courseTasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseTasService.findOne(id);
  }
}