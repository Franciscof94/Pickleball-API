import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';
import { MailService } from './mail.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MailSchema } from 'src/schemas/mail.schema';
import { MailController } from './mail.controller';
import { ShiftsModule } from 'src/shifts/shifts.module';
import { ShiftSchema } from 'src/schemas/shifts.schema';

@Module({
  imports: [
	MongooseModule.forFeature([{ name: 'Mail', schema: MailSchema }]),
	MongooseModule.forFeature([{ name: 'Shifts', schema: ShiftSchema }]),
    MailerModule.forRootAsync({
			useFactory: () => {

				return{
					transport: {
						service: process.env.MAIL_HOST,
						secure: process.env.MAIL_SECURE === 'true',
						port: 465,
						auth: {
							user: process.env.MAIL_USER,
							pass: process.env.MAIL_PASS,
						},
					},
					defaults: {
						from: `"Pickleball"`,
					},
					template: {
						dir: path.join(__dirname, '../mail/templates'),
						adapter: new HandlebarsAdapter(),
						options: {
							strict: true,
						},
					},
				}
			}
		}),
		ShiftsModule
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
