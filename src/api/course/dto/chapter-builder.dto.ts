import { CreateChapterDto } from '@/api/chapter/dto/create-chapter.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsOptional,
  ValidateNested,
} from 'class-validator';

class CreateChapterPayload extends CreateChapterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  public course: string;
}

export class ChapterBuilderDto {
  @ApiProperty({ title: 'Chapters', type: [CreateChapterPayload] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateChapterPayload)
  data: CreateChapterPayload[];

  @ApiProperty()
  @IsArray()
  deleted_chapter_ids: string[];
}
