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
      const data = await this.services.login(req);

      if (data.success) {
        res.status(200).json(data);
      } else {
        this.error('login error');
      }
    }
  );
}

export default AuthController;
