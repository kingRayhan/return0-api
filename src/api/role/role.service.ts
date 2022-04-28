import { union } from 'underscore';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { UserService } from '@/api/user/user.service';
import { RoleDto } from './dto/role.dto';
import { Role } from './entities/role.entites';
import { Permission } from './enum/permissions.enum';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role)
    private readonly model: ReturnModelType<typeof Role>,
    private readonly userService: UserService,
  ) {}

  async store(payload: RoleDto) {
    try {
      console.log(payload);
      return await this.model.create(payload);
    } catch (error) {
      console.log('error', error);
    }
  }

  /**
   * Check permissions by userid
   * @param userId user uuid
   * @param permissions Permission[]
   * @returns boolean
   */
  async userHasPermissions(userId: string, expectedPermissions: Permission[]) {
    const user = await this.userService
      .findById(userId)
      .select('permissions -_id')
      .populate({ path: 'role', select: 'permissions -_id' });

    const role = user.role as Role;
    const userPermissions = union(user.permissions, role.permissions);

    // Logger.log(user, 'role.service/userHasPermissions/user');
    // Logger.log(
    //   userPermissions,
    //   'role.service/userHasPermissions/userPermissions',
    // );

    if (userPermissions.includes(Permission.ADMINISTRATOR)) {
      return true;
    }

    return expectedPermissions.every((permission) =>
      userPermissions.includes(permission),
    );
  }
}
