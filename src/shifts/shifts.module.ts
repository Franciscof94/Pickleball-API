import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from 'src/mail/mail.module';
import { ShiftSchema } from '../schemas/shifts.schema';
import { ShiftsController } from './shifts.controller';
import { ShiftsService } from './shifts.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Shifts', schema: ShiftSchema }])],
    controllers: [ShiftsController],
    providers: [ShiftsService],
})
export class ShiftsModule {}
