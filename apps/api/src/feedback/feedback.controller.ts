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
  FeedbackService,
  FeedbackCreateDto,
  FeedbackUpdateDto,
} from './feedback.service';

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
  create(@Body() createDto: FeedbackCreateDto) {
    return this.feedbackService.create(createDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: FeedbackUpdateDto) {
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
