import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleDto } from './dto/role.dto';

import { RoleService } from './role.service';

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  store(@Body() dto: RoleDto) {
    return this.roleService.store(dto);
  }
}
