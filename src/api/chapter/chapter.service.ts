import { Injectable, Logger } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { Chapter } from './entities/chapter.entity';

@Injectable()
export class ChapterService {
  constructor(
    @InjectModel(Chapter)
    private readonly model: ReturnModelType<typeof Chapter>,
  ) {}

  create(dto: CreateChapterDto) {
    return this.model.create(dto);
  }

  async update(_id: string, dto: UpdateChapterDto) {
    // console.log(dto);
    const chapter = await this.model.updateOne({ _id }, { $set: dto });
    console.log({ chapter });
    return `This action updates a #${_id} chapter`;
  }

  async remove(id: string) {
    await this.model.findByIdAndDelete(id);
    return `This action removes a #${id} chapter`;
  }

  async deleteMultipleChaptersByIds(ids: string[]) {
    const removed = await this.model.deleteMany({ _id: { $in: ids } });
    const msg = `This action removes ${removed.deletedCount} chapters`;
    // Logger.log(msg, 'ChapterService/deleteMultipleChaptersByIds');
    return msg;
  }

  async deleteMultipleChaptersByCourseIds(course_ids: string[]) {
    const removed = await this.model.deleteMany({
      course: { $in: course_ids },
    });
    const msg = `This action removes ${removed.deletedCount} chapters`;
    Logger.log(msg, 'ChapterService/deleteMultipleChaptersByCourseIds');
    return msg;
  }

  async lessonsOfChapter(chapterId: string) {
    return this.model.findById(chapterId).populate({
      path: 'lessons',
    });
  }
}
