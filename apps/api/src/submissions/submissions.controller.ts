import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import {
  SubmissionsService,
  SubmissionCreateDto,
  SubmissionUpdateDto,
} from './submissions.service';

@Controller('submissions')
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
  create(@Body() createDto: SubmissionCreateDto) {
    return this.submissionsService.create(createDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: SubmissionUpdateDto) {
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
