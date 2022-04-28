import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly model: ReturnModelType<typeof User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const payload = { ...createUserDto };
    const user = await this.model.create(payload);
    return user;
  }

  /**
   * Find User by email
   * @param email string
   * @returns
   */
  findByEmail(email: string) {
    return this.model.findOne({ email });
  }

  /**
   * Find User by id
   * @param id string
   * @returns
   */
  findById(id: string) {
    return this.model.findById(id);
  }

  /**
   *
   * @param username string
   */
  async uniqueCheck(username: string) {
    const user = await this.model.findOne({ username });
    return user ? true : false;
  }

  /**
   * Check is a user exits or not by any property
   * @param query object
   * @returns
   */
  async isUserExists(query: any): Promise<boolean> {
    const user = await this.model.exists(query);
    return user ? true : false;
  }

  /**
   * Remove user by any property
   * @param query object
   * @returns
   */
  removeUser(query: any) {
    return this.model.deleteOne(query);
  }
}
