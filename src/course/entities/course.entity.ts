import { ModelOptions, prop, Ref } from '@typegoose/typegoose';
import { Chapter } from 'src/chapter/entities/chapter.entity';
import { User } from 'src/users/entities/user.entity';

@ModelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
})
export class Course {
  @prop()
  public title: string;

  @prop()
  public order: number;

  @prop({ ref: () => User })
  public author: Ref<User>;

  @prop({ ref: () => Chapter, localField: '_id', foreignField: 'course' })
  public chapters: Chapter[];
}
