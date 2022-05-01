import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {

  constructor(private userService: UserService){}

  create(createAuthDto: CreateAuthDto) {
    
    return this.userService.create(createAuthDto)

  }

  loginRequest(data: LoginRequestDto){
    return data
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
