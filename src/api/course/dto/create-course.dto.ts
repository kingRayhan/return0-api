import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsMongoId,
  IsUrl,
  IsString,
} from 'class-validator';

enum COURSE_TYPE {
  FREE = 'FREE',
  PAID = 'PAID',
}

export class CreateCourseDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: false, default: 0 })
  @IsInt()
  @IsOptional()
  public order: number;

  @ApiProperty({ description: 'Course author object id' })
  @IsMongoId()
  @IsNotEmpty()
  public author: string;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  public price: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  public offer_price: number;

  @IsEnum(COURSE_TYPE)
  @IsOptional()
  @ApiProperty({
    enum: COURSE_TYPE,
    default: COURSE_TYPE.FREE,
    required: false,
  })
  public type: COURSE_TYPE;

  @ApiProperty({ default: false, required: false })
  @IsBoolean()
  @IsOptional()
  public isPublished: boolean;

  @ApiProperty({ required: false })
  @IsUrl()
  @IsOptional()
  public thumbnail: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  public excerpt: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  public description: string;
}
