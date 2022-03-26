import { Injectable, NotFoundException } from '@nestjs/common';
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

  create(dto: CreateLessonDto) {
    return this.model.create(dto);
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

    return this.model.findByIdAndUpdate(id, updateLessonDto, { new: true });
  }

  async remove(id: string) {
    const exists = await this.model.exists({ _id: id });
    if (!exists) throw new NotFoundException();

    return this.model.findByIdAndDelete(id);
  }
}
