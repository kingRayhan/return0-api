import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Lesson } from './entities/lesson.entity';

@Module({
  controllers: [LessonController],
  providers: [LessonService],
  imports: [TypegooseModule.forFeature([Lesson])],
})
export class LessonModule {}
