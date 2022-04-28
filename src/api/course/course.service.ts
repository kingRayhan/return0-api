import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { ChapterService } from '@/api/chapter/chapter.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course) private readonly model: ReturnModelType<typeof Course>,
    private readonly chapterService: ChapterService,
  ) {}

  create(dto: CreateCourseDto) {
    return this.model.create(dto);
  }

  findAll() {
    return this.model.find().sort({ order: 1 }).populate({
      path: 'author',
      select: 'username',
    });
  }

  courseDetailsWithChapters(id: string) {
    return this.model
      .findById(id)
      .populate({
        path: 'author',
        select: 'name username email',
      })
      .populate({
        path: 'chapters',
        options: {
          sort: { order: 1 },
        },
        populate: {
          path: 'lessons',
          model: 'Lesson',
          options: {
            sort: { order: 1 },
          },
        },
      });
  }

  updateCourse(id: string, payload: UpdateCourseDto) {
    return this.model.findByIdAndUpdate(id, payload, { new: true });
  }

  async remove(id: string) {
    const exists = await this.model.exists({ _id: id });
    if (!exists) throw new NotFoundException();
    await this.model.findByIdAndRemove(id);
    return `Course deleted`;
  }
}
