import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson) private readonly model: ReturnModelType<typeof Lesson>,
  ) {}

  async create(dto: CreateLessonDto, chapterId: string) {
    const lession = await this.model.create({ ...dto, chapter: chapterId });
    // console.log(lession);
    return lession;
  }

  findAll() {
    return `This action returns all lesson`;
  }

  async findOne(id: string) {
    const exists = await this.model.exists({ _id: id });
    if (!exists) throw new NotFoundException();
    return this.model.findById(id);
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    const exists = await this.model.exists({ _id: id });
    if (!exists) throw new NotFoundException();
    const updatedLesson = await this.model.findByIdAndUpdate(
      id,
      updateLessonDto,
      {
        new: true,
      },
    );
    // console.log(updatedLesson);
    return updatedLesson;
  }

  async deleteMultipleChaptersByIds(ids: string[]) {
    const removed = await this.model.deleteMany({ _id: { $in: ids } });
    const msg = `This action removes ${removed.deletedCount} lessons`;
    // Logger.log(msg, 'LessonService/deleteMultipleChaptersByIds');
    return msg;
  }

  async remove(id: string) {
    const exists = await this.model.exists({ _id: id });
    if (!exists) throw new NotFoundException();
    return this.model.findByIdAndDelete(id);
  }
}
