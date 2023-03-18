import { Document } from 'mongoose';
export interface IShifts extends Document{
     readonly name: string;
     readonly lastName: string;
     readonly email: string;
     readonly dateAndTime: Date;
}