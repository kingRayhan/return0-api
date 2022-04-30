import { Role } from '@/api/role/entities/role.entites';
import { Permission } from '@/api/role/enum/permissions.enum';
import { slugify } from '@/common/helpers/slugify';
import {
  index,
  ModelOptions,
  Pre,
  prop,
  plugin,
  Ref,
} from '@typegoose/typegoose';
import { hashSync } from 'bcryptjs';
import * as UniqueValidator from 'mongoose-unique-validator';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})

@plugin(UniqueValidator, { message: '{PATH} must need to be unique.' })
@index({ email: 1, username: 1 }, { unique: true })
export class User {
  
  @prop()
  name: string;

  @prop()
  avatar?: string;

  @prop({ required: true, unique: true })
  email: string;

  @prop()
  otp: string;

  @prop({ default: false })
  is_verified: boolean;

  @prop({ ref: () => Role, required: false })
  role: Ref<Role>;

  @prop({ required: false })
  permissions: Permission[];
}
