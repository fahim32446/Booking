import { Request, Response } from 'express';
import AbstractController from '../../../abstract/abstract.controllers';
import { userService } from './user.service';
import { userValidator } from './user.validator';

export class userController extends AbstractController {
  private validator = new userValidator();
  private userService = new userService();
  constructor() {
    super();
  }

  public checkUser = this.assyncWrapper.wrap(
    [],
    async (req: Request, res: Response) => {
      const data = await this.userService.checkUser(req);

      if (data.success) {
        res.status(200).json(data);
      } else {
        this.error('Creating new hotels error');
      }
    }
  );

  public bookingPayment = this.assyncWrapper.wrap(
    [],
    async (req: Request, res: Response) => {
      const data = await this.userService.bookingPayment(req);

      if (data.success) {
        res.status(200).json(data);
      } else {
        this.error('Creating new hotels error');
      }
    }
  );

  public bookingConfirm = this.assyncWrapper.wrap(
    this.validator.bookingConfirm,
    async (req: Request, res: Response) => {
      const data = await this.userService.bookingConfirm(req);

      if (data.success) {
        res.status(200).json(data);
      } else {
        this.error('Creating new hotels error');
      }
    }
  );
}
