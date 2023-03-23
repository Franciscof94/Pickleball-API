import { MailerService } from '@nestjs-modules/mailer';
import {
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IMail } from 'src/interfaces/mail.interface';
import { IShifts } from 'src/interfaces/shifts.interface';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    @InjectModel('Mail') private mailModel: Model<IMail>,
    @InjectModel('Shifts') private shiftModel: Model<IShifts>,
  ) {}

  async sendMail(email: string) {
    const code = uuidv4().substring(0, 6);
    const newCode = new this.mailModel({ email, code });
    newCode.save();

    await this.mailerService.sendMail({
      to: email,
      subject: 'Thanks for using the pickleball app',
      /* template: 'email', */
      html: `<p style="font-weight: bold; font-size: 1.5rem">Your code is: <span>${code}</span></p>`,
      /* context: {
                name: email
            } */
    });
  }

  async yourCode(
    email: string,
    code: string,
    name: string,
    lastName: string,
    dateAndTime: Date,
  ) {
    const findCode = await this.mailModel
      .find({ $and: [{ email }, { code }] })
      .exec();

    if (!findCode.length) {
      throw Error('The email or the code do not match');
    }
    const newShift = new this.shiftModel({
      email,
      name,
      lastName,
      dateAndTime,
    });
    newShift.save();
    await this.mailModel.findOneAndDelete({email}).exec();
  }
}
