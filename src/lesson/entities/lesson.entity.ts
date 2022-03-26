import { prop, Ref } from '@typegoose/typegoose';
import { Chapter } from 'src/chapter/entities/chapter.entity';

export class Lesson {
  @prop()
  title: string;

  @prop()
  order: number;

  @prop({ ref: () => Lesson, required: true })
  chapter: Ref<Chapter>;
}
