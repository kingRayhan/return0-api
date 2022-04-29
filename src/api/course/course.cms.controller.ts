import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CourseBuilderDTO } from './dto/coruse-builder.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('cms/courses')
@ApiTags('CMS/courses')
export class CourseCMSController {
  constructor(private readonly courseService: CourseService) {}

  // 🔒
  // TODO: permission -> VIEW_COURSES
  @Get('/')
  index() {
    return this.courseService.findAll();
  }

  // TODO: 🔒
  // TODO: permission -> VIEW_COURSES
  @Get('/:id')
  details(@Param('id') _id: string) {
    return this.courseService.courseDetailsWithChaptersAnsLessons(_id);
  }

  // TODO: 🔒
  // TODO: permission -> UPDATE_COURSES
  @Patch('/:id')
  update(@Param('id') id: string, @Body() payload: UpdateCourseDto) {
    return this.courseService.updateCourse(id, payload);
  }

  // TODO: 🔒
  // TODO: permission -> CREATE_COURSES
  @Post()
  create(@Body() payload: CreateCourseDto) {
    return this.courseService.createCourse(payload);
  }

  // TODO: 🔒
  // TODO: permission -> BUILD_COURSES
  @Post('builder/:courseId')
  courseBuilder(
    @Param('courseId') courseId: string,
    @Body() payload: CourseBuilderDTO,
  ) {
    return this.courseService.buildCourseWithChaptersAndLessons(
      courseId,
      payload,
    );
  }

  // TODO: 🔒
  // TODO: permission -> DELETE_COURSES
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
