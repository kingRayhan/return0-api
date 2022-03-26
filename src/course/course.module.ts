import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Course } from './entities/course.entity';

@Module({
  imports: [TypegooseModule.forFeature([Course])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
