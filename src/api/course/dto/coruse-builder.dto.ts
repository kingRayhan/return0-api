import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateChapterDto {
  public _id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public title: string;

  @ApiProperty()
  @IsInt()
  public order: number;
}

export class CourseBuilderDTO {
  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateChapterDto)
  data: CreateChapterDto[];

  @ApiProperty()
  @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => IsMongoId)
  // TODO: nested array of mongo ids validation failed
  deleted_chapter_ids: string[];
}
