import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { SessionService } from '../session/session.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hashSync } from 'bcryptjs';
import { PasswordDto } from '../user/dto/update-password.dto';
import { slugify } from '@/common/helpers/slugify';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly model: ReturnModelType<typeof User>,
    private readonly sessionService: SessionService,
  ) {}

  /**
   * List of all users
   */
  public userList() {
    return this.model.find();
  }

  /**
   *
   * Create user
   * @param payload CreateUserDto
   */
  async create(payload: CreateUserDto) {
    const user = await this.model.create(payload);
    return user;
  }

  /**
   * Find User by email
   * @param email string
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
   * @param id string
   * @body updateUserProfileDto: UpdateUserProfileDto
   */

  async updateUserProfile(_id: string, updateUserProfileDto: UpdateUserDto) {
    const user = await this.model.findById(_id);
    if (!user) throw new NotFoundException();
    if (updateUserProfileDto.username) {
      const unique = await this.uniqueCheck(updateUserProfileDto.username);
      if (unique) {
        updateUserProfileDto.username = slugify(
          updateUserProfileDto.username,
          true,
        );
      }
    }
    const updateUser = await this.model.findByIdAndUpdate(
      _id,
      updateUserProfileDto,
      { new: true },
    );
    return {
      message: 'User profile updated',
      data: updateUser,
    };
  }

  /**
   *
   * @param id string
   * @body dto: PasswordDto
   */

  async updatePassword(_id: string, dto: PasswordDto) {
    const user = await this.model.findById(_id);
    if (!user) throw new NotFoundException();
    const matched = await this.sessionService.verifyPassword(
      dto.current_password,
      user.password,
    );
    if (!matched) throw new ForbiddenException('Current password is incorrect');

    user.password = hashSync(dto.new_password, 10);
    await this.model.findByIdAndUpdate(_id, user);
    return {
      message: 'Password updated',
    };
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
