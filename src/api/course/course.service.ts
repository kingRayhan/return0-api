import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { ChapterService } from '@/api/chapter/chapter.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { ChapterBuilderDto } from './dto/chapter-builder.dto';
import { LessonBuilderDto } from './dto/lesson-builder.dto';
import { LessonService } from '../lesson/lesson.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course) private readonly model: ReturnModelType<typeof Course>,
    private readonly chapterService: ChapterService,
    private readonly lessonService: LessonService,
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

  /**
   * Course details with chapters and lessons
   * @param id course id
   * @returns
   */
  courseDetailsWithChaptersAnsLessons(id: string) {
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

  /**
   * Create Course
   * @param payload CreateCourseDto
   */
  createCourse(payload: CreateCourseDto) {
    return this.model.create(payload);
  }

  /**
   * Update course
   * @param id course id
   * @param payload UpdateCourseDto
   */
  updateCourse(id: string, payload: UpdateCourseDto) {
    return this.model.findByIdAndUpdate(id, payload, { new: true });
  }

  /**
   * Remove course
   * @param id course id
   */
  async remove(id: string) {
    const exists = await this.model.exists({ _id: id });
    if (!exists) throw new NotFoundException();
    await this.model.findByIdAndRemove(id);
    return 'Course deleted';
  }

  /**
   * Course chapters and lessons builder
   * @param data CourseBuilderDTO
   */
  async courseChaptersBuilder(courseId: string, data: ChapterBuilderDto) {
    if (data.deleted_chapter_ids)
      await this.chapterService.deleteMultipleChaptersByIds(
        data.deleted_chapter_ids,
      );

    data.data.map((chapter) => {
      return chapter?._id
        ? this.chapterService.update(chapter._id, chapter)
        : this.chapterService.create({ ...chapter, course: courseId });
    });
    return 'Chapters updated successfully';
  }

  /**
   *  Chapter's lessions builder
   * @param chapterId course id
   * @param data LessonBuilderDto
   */
  async chapterLessonBuilder(chapterId: string, data: LessonBuilderDto) {
    if (data.deleted_lesson_ids) {
      await this.lessonService.deleteMultipleChaptersByIds(
        data.deleted_lesson_ids,
      );
    }

    data.data.forEach((lesson) => {
      lesson?._id
        ? this.lessonService.update(lesson._id, lesson)
        : this.lessonService.create(lesson, chapterId);
    });

    return 'Lession updated';
  }

  // async createOrUpdateLessons(dto: CreateOrUpdateMultipleLessonDTO) {
  //   await this.deleteMultipleChaptersByIds(dto.deleted_ids);

  //   dto.data.map((lesson) => {
  //     return lesson?._id
  //       ? this.update(lesson._id, lesson)
  //       : this.model.create({ ...lesson, chapter: dto.chapterId });
  //   });

  //   return this.model.create(dto);
  // }
}
