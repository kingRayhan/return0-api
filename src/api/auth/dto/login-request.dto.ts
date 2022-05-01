import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsUrl,
    MinLength,
} from 'class-validator';


export class LoginRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

}
