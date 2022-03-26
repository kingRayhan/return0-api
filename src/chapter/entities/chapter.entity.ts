import { prop, Ref } from '@typegoose/typegoose';
import { Lesson } from 'src/lesson/entities/lesson.entity';

export class Chapter {
  @prop({ required: true })
  title: string;

  @prop({ required: false })
  order: number;

  @prop({ ref: () => Chapter, required: true })
  course: Ref<Chapter>;

  @prop({ ref: () => Lesson, localField: '_id', foreignField: 'chapter' })
  lessons: Lesson[];
}
