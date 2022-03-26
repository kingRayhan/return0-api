import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { NotFoundError } from 'rxjs';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course) private readonly model: ReturnModelType<typeof Course>,
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

  findOne(id: string) {
    return this.model
      .findById(id)
      .populate({
        path: 'author',
        select: 'username',
      })
      .populate({
        path: 'chapters',
        // options: {
        //   sort: { order: -1 },
        // },
      });
  }

  update(id: string, dto: UpdateCourseDto) {
    return this.model.findByIdAndUpdate(id, dto, { new: true });
  }

  async remove(id: string) {
    const exists = await this.model.exists({ _id: id });
    if (!exists) throw new NotFoundException();
    return this.model.findByIdAndRemove(id);
  }
}
