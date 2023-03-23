import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MailDocument = Mail & Document;

@Schema()
export class Mail {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  code: string;
}

export const MailSchema = SchemaFactory.createForClass(Mail);
