import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateShiftstDto } from '../dto/create-shift.dto';
import { ShiftsService } from './shifts.service';

@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftService: ShiftsService) {}

  @Post()
  async createShift(@Body() createShiftDto: CreateShiftstDto) {
    try {
      return this.shiftService.createShift(createShiftDto);
    } catch (error) {
      throw Error('An error occurred');
    }
  }

  @Get()
  findAllShifts() {
    try {
      return this.shiftService.getAllShifts();
    } catch (error) {
      throw Error('An error occurred while getting the turns');
    }
  }

  @Get(':email')
  findShiftsByUser(@Param() email: { email: string }) {
    try {
      return this.shiftService.findShiftsByUser(email);
    } catch (error) {
      throw Error('An error occurred while getting the turns');
    }
  }

  @Delete('')
  deleteShift(@Body() userShift: { email: string; dateAndTime: string }) {
    const { email, dateAndTime } = userShift;
    try {
      return this.shiftService.deleteShift(email, dateAndTime);
    } catch (error) {
      throw Error('An error occurred while getting the turns');
    }
  }
}
