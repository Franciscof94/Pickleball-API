import { Document } from 'mongoose';
export interface IMail extends Document {
  readonly email: string;
  readonly code: string;
}
