import { ModelOptions, prop, Ref } from '@typegoose/typegoose';
import { Chapter } from '@/api/chapter/entities/chapter.entity';
import { User } from '@/api/users/entities/user.entity';

enum COURSE_TYPE {
  FREE = 'FREE',
  PAID = 'PAID',
}

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

  @prop({ default: 0 })
  public order: number;

  @prop({ default: 0 })
  price: number;

  @prop({ default: 0 })
  offer_price: number;

  @prop({ enum: COURSE_TYPE, default: COURSE_TYPE.FREE })
  type: COURSE_TYPE;

  @prop({ default: false })
  public isPublished: boolean;

  @prop()
  public thumbnail: string;

  @prop()
  public excerpt: string;

  @prop()
  public description: string;

  @prop({ ref: () => User })
  public author: Ref<User>;

  @prop({ ref: () => Chapter, localField: '_id', foreignField: 'course' })
  public chapters: Chapter[];
}
