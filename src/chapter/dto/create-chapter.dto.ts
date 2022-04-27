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
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsNonPrimitiveArray(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsNonPrimitiveArray',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return (
            Array.isArray(value) &&
            value.reduce(
              (a, b) => a && typeof b === 'object' && !Array.isArray(b),
              true,
            )
          );
        },
      },
    });
  };
}

export class CreateChapterDto {
  public _id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public title: string;

  @ApiProperty()
  @IsInt()
  public order: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  public course: string;
}

export class updateMultipleChapterDto {
  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateChapterDto)
  data: CreateChapterDto[];

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  courseId: string;

  @ApiProperty()
  @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => IsMongoId)
  // TODO: nested array of mongo ids validation failed
  deleted_chapter_ids: string[];
}
