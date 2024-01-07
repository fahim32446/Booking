import AbstractModels from '../../abstract/abstract.models';
import { IRegistration } from './auth.type';

class AuthModel extends AbstractModels {
  async login(email: string) {
    const [user] = await this.query()
      .select(
        'user_id',
        'email',
        'password',
        'first_name',
        'last_name',
        this.db.raw("concat(first_name, ' ', last_name) AS name")
      )
      .from('users')
      .where({ email: email });

    return user as {
      user_id: number;
      email: string;
      password: string;
      name: string;
    };
  }

  async checkExistingEmail(email: string) {
    const [result] = await this.query()
      .select('user_id', 'email')
      .from('users')
      .where({ email: email });
    return result as { user_id?: number; email?: string };
  }

  async signUp(userInfo: IRegistration) {
    const [id] = await this.query().insert(userInfo).into('users');

    return { user_id: id } as { user_id: number };
  }

  async updateToken(user_id: number, otp: number, otp_expired: number) {
    const result = await this.query()
      .update({
        otp: otp,
        otp_expired: otp_expired,
      })
      .into('users')
      .where({ user_id: user_id });

    return result;
  }

  async getToken(email: string, user_id: number) {
    const [result] = await this.query()
      .select('otp', 'otp_expired')
      .from('users')
      .where({ user_id: user_id })
      .andWhere({ email: email });

    return result as { otp: number; otp_expired: number };
  }

  async updatePassword(user_id: number, password: string) {
    const result = await this.query()
      .update({
        password: password,
      })
      .into('users')
      .where({ user_id: user_id });

    return result;
  }
}

export default AuthModel;
