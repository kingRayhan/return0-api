import { Module } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Chapter } from './entities/chapter.entity';
import { ChapterCMSController } from './chapters.cms';

@Module({
  imports: [TypegooseModule.forFeature([Chapter])],
  controllers: [ChapterController, ChapterCMSController],
  providers: [ChapterService],
  exports: [ChapterService],
})
export class ChapterModule {}
