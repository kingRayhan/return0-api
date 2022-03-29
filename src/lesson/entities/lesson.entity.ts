import { prop, Ref } from '@typegoose/typegoose';
import { Chapter } from 'src/chapter/entities/chapter.entity';

export enum LessonType {
  VIDEO = 'VIDEO',
  ARTICLE = 'ARTICLE',
}

export enum LessonMediaSoruceType {
  VIMEO = 'VIMEO',
  YOUTUBE = 'YOUTUBE',
  JW_PLAYER = 'JW_PLAYER',
  EXTERNAL_URL = 'EXTERNAL_URL',
}

export class Lesson {
  @prop()
  title: string;

  @prop({ default: false })
  public isPublished: boolean;

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

  @prop({ ref: () => Lesson, required: true })
  chapter: Ref<Chapter>;
}
