import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShiftDocument = Shift & Document;

@Schema()
export class Shift {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  dateAndTime: Date;
}

export const ShiftSchema = SchemaFactory.createForClass(Shift);
