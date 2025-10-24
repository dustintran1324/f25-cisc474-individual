import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentCreateIn, AssignmentUpdateIn } from '@repo/api';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('assignments')
@UseGuards(JwtAuthGuard)
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Get()
  findAll(@Query('courseId') courseId?: string) {
    if (courseId) {
      return this.assignmentsService.findByCourse(courseId);
    }
    return this.assignmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignmentsService.findOne(id);
  }

  @Post()
  create(@Body() createDto: AssignmentCreateIn) {
    return this.assignmentsService.create(createDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: AssignmentUpdateIn) {
    return this.assignmentsService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignmentsService.remove(id);
  }
}