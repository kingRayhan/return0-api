import { ModelOptions, prop } from '@typegoose/typegoose';

@ModelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
})
export class User {
  @prop({
    required: true,
    lowercase: true,
    unique: true,
    index: true,
    trim: true,
  })
  public username: string;
}
