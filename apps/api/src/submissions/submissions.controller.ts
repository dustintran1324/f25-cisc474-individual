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
import { SubmissionsService } from './submissions.service';
import { SubmissionCreateIn, SubmissionUpdateIn } from '@repo/api';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('submissions')
@UseGuards(JwtAuthGuard)
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Get()
  findAll(
    @Query('userId') userId?: string,
    @Query('assignmentId') assignmentId?: string,
  ) {
    if (userId && assignmentId) {
      return this.submissionsService.findByUserAndAssignment(
        userId,
        assignmentId,
      );
    }
    if (userId) {
      return this.submissionsService.findByUser(userId);
    }
    if (assignmentId) {
      return this.submissionsService.findByAssignment(assignmentId);
    }
    return this.submissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.submissionsService.findOne(id);
  }

  @Post()
  create(@Body() createDto: SubmissionCreateIn) {
    return this.submissionsService.create(createDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: SubmissionUpdateIn) {
    return this.submissionsService.update(id, updateDto);
  }

  @Post(':id/submit')
  submit(@Param('id') id: string) {
    return this.submissionsService.submit(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.submissionsService.remove(id);
  }
}
