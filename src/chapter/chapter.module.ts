import { Module } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Chapter } from './entities/chapter.entity';

@Module({
  imports: [TypegooseModule.forFeature([Chapter])],
  controllers: [ChapterController],
  providers: [ChapterService],
})
export class ChapterModule {}
