import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controllers';
import HotelService from './hotel.service';
import HotelValidator from './hotel.validator';

class HotelController extends AbstractController {
  private hotelService = new HotelService();
  private validator = new HotelValidator();

  constructor() {
    super();
  }

  public addHotel = this.assyncWrapper.wrap(
    this.validator.addHotel,
    async (req: Request, res: Response) => {
      const data = await this.hotelService.addHotel(req, res);

      if (data.success) {
        res.status(200).json(data);
      } else {
        this.error('Creating new hotels error');
      }
    }
  );

  public signGoogle = this.assyncWrapper.wrap(
    this.validator.loginGoogle,
    async (req: Request, res: Response) => {
      const data = await this.hotelService.signGoogle(req, res);

      if (data.success) {
        res.status(200).json(data);
      } else {
        this.error('login error');
      }
    }
  );

  public signUp = this.assyncWrapper.wrap(
    this.validator.signUp,
    async (req: Request, res: Response) => {
      const data = await this.hotelService.signUp(req, res);

      if (data.success) {
        res.status(200).json(data);
      } else {
        this.error('Signup error');
      }
    }
  );

  public signOut = this.assyncWrapper.wrap(
    [],
    async (req: Request, res: Response) => {
      const data = await this.hotelService.signOut(req, res);

      if (data.success) {
        res.status(200).json(data);
      } else {
        this.error('Sign Out error');
      }
    }
  );

  public forgotPassword = this.assyncWrapper.wrap(
    this.validator.forgotPassword,
    async (req: Request, res: Response) => {
      const data = await this.hotelService.forgotPassword(req, res);

      if (data.success) {
        res.status(200).json(data);
      } else {
        this.error('Sign Out error');
      }
    }
  );

  public verifyOTP = this.assyncWrapper.wrap(
    this.validator.forgotPassword,
    async (req: Request, res: Response) => {
      const data = await this.hotelService.verifyOTP(req, res);

      if (data.success) {
        res.status(200).json(data);
      } else {
        this.error('Sign Out error');
      }
    }
  );

  public resetPassword = this.assyncWrapper.wrap(
    this.validator.resetPassword,
    async (req: Request, res: Response) => {
      const data = await this.hotelService.resetPassword(req, res);

      if (data.success) {
        res.status(200).json(data);
      } else {
        this.error('Sign Out error');
      }
    }
  );
}

export default HotelController;
