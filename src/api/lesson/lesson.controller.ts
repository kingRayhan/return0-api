import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('lessons')
@ApiTags('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post(':chapterId')
  create(
    @Body() createLessonDto: CreateLessonDto,
    @Param('chapterId') chapterId: string,
  ) {
    return this.lessonService.create(createLessonDto, chapterId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonService.remove(id);
  }
}
