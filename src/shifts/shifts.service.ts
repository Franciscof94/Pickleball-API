import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShiftstDto } from './dto/create-shift.dto';
import { IShifts } from './interfaces/shifts.interface';

@Injectable()
export class ShiftsService {
    constructor(@InjectModel('Shifts') private shiftModel:Model<IShifts>) { }

    async createShift(createShiftDto: CreateShiftstDto): Promise<any> {
        const newShift = await new this.shiftModel(createShiftDto);
        return newShift
     }

}
