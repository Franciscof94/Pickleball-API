import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendEmail(@Body() data: { email: string }) {
    try {
      return await this.mailService.sendMail(data.email as string);
    } catch (error) {
      throw Error('The email address is already in use.');
    }
  }

  @Post('your-code')
  async yourCode(
    @Body()
    data: {
      email: string;
      code: string;
      name: string;
      lastName: string;
      dateAndTime: Date;
    },
  ) {
    const { email, code, name, lastName, dateAndTime } = data;
    
    return await this.mailService.yourCode(
      email,
      code,
      name,
      lastName,
      dateAndTime,
    );
  }
}
