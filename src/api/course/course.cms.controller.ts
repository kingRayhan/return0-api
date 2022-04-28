import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('cms/courses')
@ApiTags('CMS/courses')
export class CourseCMSController {
  constructor(private readonly courseService: CourseService) {}

  // TODO: permission -> CMS_VIEW_COURSES
  @Get('/')
  index() {
    return this.courseService.findAll();
  }

  // TODO: permission -> CMS_VIEW_COURSES
  @Get('/:id')
  details(@Param('id') id: string) {
    return this.courseService.courseDetailsWithChapters(id);
  }

  // TODO: permission -> CMS_VIEW_COURSES
  @Patch('/:id')
  update(@Param('id') id: string, @Body() payload: UpdateCourseDto) {
    return this.courseService.updateCourse(id, payload);
  }

  // TODO: permission -> CMS_VIEW_COURSES
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
