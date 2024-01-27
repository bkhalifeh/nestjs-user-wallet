import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

@Schema({
  versionKey: false,
})
export class WalletModel {
  @Prop({
    type: SchemaTypes.Number,
    default: 0,
  })
  amount: number;

  @Prop({
    type: SchemaTypes.String,
    required: true,
    unique: true,
  })
  userId: string;
}

export type WalletDocument = HydratedDocument<WalletModel>;
export const WalletSchema = SchemaFactory.createForClass(WalletModel);
