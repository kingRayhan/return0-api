import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsUrl,
    MinLength,
} from 'class-validator';


export class CreateAuthDto {
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
