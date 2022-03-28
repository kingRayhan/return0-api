import { Injectable, Logger } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import {
  CreateChapterDto,
  updateMultipleChapterDto,
} from './dto/create-chapter.dto';
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

  async updateChapters(dto: updateMultipleChapterDto) {
    if (dto.deleted_chapter_ids)
      await this.deleteMultipleChaptersByIds(dto.deleted_chapter_ids);

    dto.data.map((chapter) => {
      return chapter?._id
        ? this.update(chapter._id, chapter)
        : this.model.create({ ...chapter, course: dto.courseId });
    });
    return 'Chapters updated successfully';
  }

  findAll() {
    return `This action returns all chapter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chapter`;
  }

  update(_id: string, dto: UpdateChapterDto) {
    this.model.updateOne({ _id }, { $set: dto });
    return `This action updates a #${_id} chapter`;
  }

  async remove(id: string) {
    await this.model.findByIdAndDelete(id);
    return `This action removes a #${id} chapter`;
  }

  async deleteMultipleChaptersByIds(ids: string[]) {
    console.log(ids);
    const removed = await this.model.deleteMany({ _id: { $in: ids } });
    const msg = `This action removes ${removed.deletedCount} chapters`;
    Logger.log(msg, 'ChapterService/deleteMultipleChaptersByIds');
    return msg;
  }
}
