import { Role } from '../../auth/models/role.enum';
import { Schema, Document } from 'mongoose';

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: 'string',
      enum: Role,
      default: Role.USER
    },
    rt: String,
  },
  {
    collection: 'users',
  },
);

UserSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
});

export { UserSchema };

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
  rt: String
}
