import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChapterService } from './chapter.service';
import {
  CreateChapterDto,
  UpdateMultipleChapterDto,
} from './dto/create-chapter.dto';

@Controller('chapters')
@ApiTags('chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Post()
  create(@Body() createChapterDto: CreateChapterDto) {
    return this.chapterService.create(createChapterDto);
  }

  @Post('update-chapters')
  updateChapters(@Body() dto: UpdateMultipleChapterDto) {
    return this.chapterService.updateChapters(dto);
  }
}
