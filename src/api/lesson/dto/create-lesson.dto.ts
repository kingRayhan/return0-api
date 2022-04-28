import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { LessonMediaSoruceType, LessonType } from '../entities/lesson.entity';

class MediaSourcesDTO {
  @ApiProperty({
    description: 'Vimeo video id',
  })
  @IsOptional()
  public vimeo: string;

  @ApiProperty({
    description: 'Youtube video id',
    example: '23456789',
  })
  @IsOptional()
  public youtube: string;

  @ApiProperty({
    description: 'JW Player media id',
    example: '8TyOJ5ev',
  })
  public jwPlayer: string;

  @ApiProperty({
    description: 'External url',
  })
  @IsOptional()
  @IsUrl()
  public externalUrl: string;
}

export class CreateLessonDto {
  public _id?: string;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ default: false })
  @IsOptional()
  @IsBoolean()
  public isPublished: boolean;

  @ApiProperty()
  @IsOptional()
  public excerpt: string;

  @ApiProperty()
  @IsOptional()
  public body: string;

  @IsOptional()
  @IsUrl()
  public thumbnail: string;

  @ApiProperty({ enum: LessonType, default: LessonType.VIDEO })
  @IsOptional()
  public type: string;

  @ApiProperty({
    enum: LessonMediaSoruceType,
    default: LessonMediaSoruceType.JW_PLAYER,
  })
  @IsOptional()
  public media_source_type: string;

  @ApiProperty()
  @IsOptional()
  @ValidateNested({ each: true })
  public media_sources: MediaSourcesDTO;
}

export class CreateOrUpdateMultipleLessonDTO {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  chapterId: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLessonDto)
  data: CreateLessonDto[];

  @ApiProperty()
  deleted_ids: string[];
}
