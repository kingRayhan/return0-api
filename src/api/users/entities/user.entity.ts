import { Role } from '@/api/role/entities/role.entites';
import { Permission } from '@/api/role/enum/permissions.enum';
import { slugify } from '@/common/helpers/slugify';
import {
  index,
  ModelOptions,
  plugin,
  Pre,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { hashSync } from 'bcryptjs';
import * as UniqueValidator from 'mongoose-unique-validator';

@ModelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
})
@Pre<User>('save', function () {
  this.password = hashSync(this.password, 10);
  if (!this.name) this.username = slugify(this.name, true);
})
@plugin(UniqueValidator, { message: '{PATH} must need to be unique.' })
// @index({ email: 1, username: 1 }, { unique: true })
export class User {
  @prop()
  public name: string;

  @prop({
    required: true,
    lowercase: true,
    unique: true,
    index: true,
    trim: true,
  })
  public username: string;

  @prop({
    required: true,
    lowercase: true,
    unique: true,
    index: true,
    trim: true,
  })
  public email: string;

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

  @prop({ required: true })
  password: string;
}
