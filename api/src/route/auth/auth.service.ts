import { Request } from 'express';
import AbstractServices from '../../abstract/abstract.service';

class AuthService extends AbstractServices {
  constructor() {
    super();
  }

  public async login(req: Request) {
    const { email, password } = req.body as { email: string; password: string };

    return await this.models.db.transaction(async (trx) => {
      const auth_conn = this.models.authModel(req);

      const user = await auth_conn.login(email);

      return {
        success: true,
        data: user,
        message: 'User login successfully done',
      };
    });
  }
}

export default AuthService;
