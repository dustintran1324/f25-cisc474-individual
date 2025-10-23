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
import { FeedbackService } from './feedback.service';
import { FeedbackCreateIn, FeedbackUpdateIn } from '@repo/api';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get()
  findAll(@Query('submissionId') submissionId?: string) {
    if (submissionId) {
      return this.feedbackService.findBySubmission(submissionId);
    }
    return this.feedbackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackService.findOne(id);
  }

  @Post()
  create(@Body() createDto: FeedbackCreateIn) {
    return this.feedbackService.create(createDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: FeedbackUpdateIn) {
    return this.feedbackService.update(id, updateDto);
  }

  @Post(':id/publish')
  publish(@Param('id') id: string) {
    return this.feedbackService.publish(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackService.remove(id);
  }
}
