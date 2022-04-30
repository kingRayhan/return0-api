import { CreateLessonDto } from '@/api/lesson/dto/create-lesson.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class LessonPayload extends CreateLessonDto {}

export class LessonBuilderDto {
  @ApiProperty({ type: [LessonPayload] })
  data: LessonPayload[];

  @ApiProperty()
  @IsArray()
  public deleted_lesson_ids: string[];
}
