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
import {
  CreateLessonDto,
  CreateOrUpdateMultipleLessonDTO,
} from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
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

  @Patch('bulk-update')
  createOrUpdateLessons(@Body() dto: CreateOrUpdateMultipleLessonDTO) {
    return this.lessonService.createOrUpdateLessons(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonService.remove(id);
  }
}
