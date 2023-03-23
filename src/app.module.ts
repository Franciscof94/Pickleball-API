import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ShiftsModule } from './shifts/shifts.module';
import { MailModule } from './mail/mail.module';
import { MailController } from './mail/mail.controller';



export const mongooseConfigFactory = (): MongooseModuleOptions => ({
  uri: `mongodb+srv://PickleBall:${process.env.DB_PASS}@cluster0.kubnkuc.mongodb.net/?retryWrites=true&w=majority`,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  dbName: 'Pickleball',
});

@Module({
  imports: [
    ShiftsModule,
    MailModule,
    MongooseModule.forRootAsync({
      useFactory: mongooseConfigFactory, 
      inject: [],
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ShiftsModule,
  ],
  controllers: [AppController, MailController],
  providers: [AppService],
})
export class AppModule {}







