import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './entities/user.entity';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [TypegooseModule.forFeature([User]), SessionModule],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}
