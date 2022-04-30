import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Course } from './entities/course.entity';
import { ChapterModule } from '@/api/chapter/chapter.module';
import { CourseCMSController } from './course.cms.controller';
import { LessonModule } from '@/api/lesson/lesson.module';

@Module({
  imports: [TypegooseModule.forFeature([Course]), ChapterModule, LessonModule],
  controllers: [CourseController, CourseCMSController],
  providers: [CourseService],
})
export class CourseModule {}
