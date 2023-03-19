import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ShiftsModule } from './shifts/shifts.module';

@Module({
  imports: [
    ShiftsModule,
    MongooseModule.forRoot(`mongodb+srv://PickleBall:skizeroMm94@cluster0.kubnkuc.mongodb.net/?retryWrites=true&w=majority`, { useUnifiedTopology: true, dbName: "Pickleball" ,useNewUrlParser: true }, ),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ShiftsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
