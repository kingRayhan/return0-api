import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateChapterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  public _id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public title: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsInt()
  public order: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  public course: string;
}
