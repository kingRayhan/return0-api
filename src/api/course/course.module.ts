import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Course } from './entities/course.entity';
import { ChapterModule } from '@/api/chapter/chapter.module';

@Module({
  imports: [TypegooseModule.forFeature([Course]), ChapterModule],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
