import { ModelOptions, prop, Ref } from '@typegoose/typegoose';
import { Course } from '@/api/course/entities/course.entity';
import { Lesson } from '@/api/lesson/entities/lesson.entity';

@ModelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
})
export class Chapter {
  @prop({ required: true })
  title: string;

  @prop()
  description: string;

  @prop()
  order: number;

  @prop({ ref: () => Course, required: true })
  course: Ref<Course>;

  @prop({ ref: () => Lesson, localField: '_id', foreignField: 'chapter' })
  lessons: Lesson[];
}
