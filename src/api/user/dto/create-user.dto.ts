import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  MinLength,
} from 'class-validator';


export class CreateUserDto {
  @ApiProperty()
  @IsOptional()
  name: string;
    
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @ApiProperty()
  @IsOptional()
  @IsUrl()
  avatar?: string;
}
