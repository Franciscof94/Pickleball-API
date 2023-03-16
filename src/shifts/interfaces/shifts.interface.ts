import { Document } from 'mongoose';
export interface IShifts extends Document{
     name: string;
     lastName: string;
     email: string;
     dateAndTime: Date;
}