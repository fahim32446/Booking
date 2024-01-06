import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controllers';
import AuthService from './auth.service';
import AuthValidator from './auth.validator';

class AuthController extends AbstractController {
  private services = new AuthService();
  private validator = new AuthValidator();

  constructor() {
    super();
  }

  public login = this.assyncWrapper.wrap(
    this.validator.login,
    async (req: Request, res: Response) => {
      const data = await this.services.login(req, res);

      if (data.success) {
        res.status(200).json(data);
      } else {
        this.error('login error');
      }
    }
  );

  public signGoogle = this.assyncWrapper.wrap(
    this.validator.loginGoogle,
    async (req: Request, res: Response) => {
      const data = await this.services.signGoogle(req, res);

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
      const data = await this.services.signUp(req, res);

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
      const data = await this.services.signUp(req, res);

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
      const data = await this.services.forgotPassword(req, res);

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
      const data = await this.services.verifyOTP(req, res);

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
      const data = await this.services.resetPassword(req, res);

      if (data.success) {
        res.status(200).json(data);
      } else {
        this.error('Sign Out error');
      }
    }
  );
}

export default AuthController;
