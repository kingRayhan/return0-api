import { Body, Controller, Delete, Get, Param, Patch, Req, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { User } from './entities/user.entity';
import { GlobalResponseInterceptor } from '@/common/utils/interceptors/gloabl-response.interceptor';

@UseInterceptors(GlobalResponseInterceptor)
@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Get()
  index(): Promise<User[]> {
    return this.userService.index()
  }

  @Get('/:email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email)
  }

  @Delete('/:id')
  destory(@Param('id') _id: string){
    return this.userService.destory(_id)
  }

}
