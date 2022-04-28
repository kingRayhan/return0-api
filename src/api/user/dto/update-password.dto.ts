import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class PasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  current_password: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(5)
  new_password: string;
}
