import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShiftstDto } from './dto/create-shift.dto';
import { IShifts } from './interfaces/shifts.interface';

@Injectable()
export class ShiftsService {
  constructor(@InjectModel('Shifts') private shiftModel: Model<IShifts>) {}

  async createShift(createShiftDto: CreateShiftstDto): Promise<IShifts> {
    const newShift = new this.shiftModel(createShiftDto);
    return newShift.save();
  }

  async getAllShifts(): Promise<{ dateAndTime: Date }[]> {
    const allShifts = await this.shiftModel.find().exec();

    return allShifts.map((shift) => {
      return {
        dateAndTime: shift.dateAndTime,
      };
    });
  }

  async findShiftsByUser(email: { email: string }): Promise<IShifts[]> {
    if (!email) {
      throw Error('Email is required');
    }
    return this.shiftModel.find({ email: email.email }).exec();
  }

  async deleteShift(email: string, dateAndTime: string): Promise<any> {
    if (!email && dateAndTime) {
      throw Error('Email and date are required');
    }
    return this.shiftModel
      .findOneAndDelete({ $and: [{ email }, { dateAndTime }] })
      .exec();
  }
}
