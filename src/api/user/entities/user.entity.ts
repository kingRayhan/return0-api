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

export enum gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

@ModelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
@Pre<User>('save', function () {
  this.password = hashSync(this.password, 10);
  this.username = slugify(this.name, true);
})
@plugin(UniqueValidator, { message: '{PATH} must need to be unique.' })
// @index({ email: 1, username: 1 }, { unique: true })
export class User {
  @prop()
  avatar?: string;

  @prop({ required: true })
  name: string;

  @prop({ required: true, unique: true })
  email: string;

  @prop({ unique: true })
  username: string;

  @prop({ required: true })
  password: string;

  @prop()
  address: string;

  @prop({ required: true })
  country: string;

  @prop({ required: true, enum: gender })
  gender: string;

  @prop()
  settings?: {
    privacy: object;
    notification: object;
  };

  @prop({ default: null })
  reset_password_hash: string;

  @prop()
  otp: string;

  @prop({ default: false })
  is_verified: boolean;

  @prop({ ref: () => Role, required: false })
  role: Ref<Role>;

  @prop({ required: false })
  permissions: Permission[];
}
