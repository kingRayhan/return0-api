import { ModelOptions, prop, Ref } from '@typegoose/typegoose';
import { Chapter } from '@/api/chapter/entities/chapter.entity';

export enum LessonType {
  VIDEO = 'VIDEO',
  ARTICLE = 'ARTICLE',
}

export enum LessonMediaSoruceType {
  YOUTUBE = 'YOUTUBE',
  VIMEO = 'VIMEO',
  JW_PLAYER = 'JW_PLAYER',
  EXTERNAL_URL = 'EXTERNAL_URL',
}

@ModelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
})
export class Lesson {
  @prop()
  title: string;

  @prop({ default: false })
  public isPublished: boolean;

  @prop({ default: false })
  public isFreePreview: boolean;

  @prop({ trim: true })
  public excerpt: string;

  @prop({ trim: true })
  public body: string;

  @prop({ trim: true })
  public thumbnail: string;

  @prop({ enum: LessonType, default: LessonType.VIDEO, trim: true })
  public type: string;

  @prop({ enum: LessonMediaSoruceType })
  public media_source_type: string;

  @prop()
  public media_sources: {
    vimeo: string;
    youtube: string;
    jwPlayer: string;
    externalUrl: string;
  };

  @prop()
  order: number;

  @prop({ ref: () => Chapter, required: true })
  chapter: Ref<Chapter>;
}
