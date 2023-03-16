import { Body, Controller, HttpStatus, Post, Res, Get } from '@nestjs/common';
import { CreateShiftstDto } from './dto/create-shift.dto';
import { ShiftsService } from './shifts.service';

@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftService: ShiftsService) {}

  @Post()
  async createShift(@Res() response, @Body() createShiftDto: CreateShiftstDto) {
    try {
    

      const newShift = await this.shiftService.createShift(createShiftDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Shift has been created successfully',
        newShift,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Shift not created!',
        error: 'Bad Request',
      });
    }
  }

}
