import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Gender } from '../enums/gender.enum';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class UserModel {
  @Prop({
    type: SchemaTypes.String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 20,
  })
  username: string;

  @Prop({
    type: SchemaTypes.String,
    required: false,
  })
  firstName: string;

  @Prop({
    type: SchemaTypes.String,
    required: false,
  })
  lastName: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
    enum: Gender,
  })
  gender: Gender;

  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
}
export type UserDocument = HydratedDocument<UserModel>;
export const UserSchema = SchemaFactory.createForClass(UserModel);
