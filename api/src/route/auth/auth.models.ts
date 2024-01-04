import AbstractModels from '../../abstract/abstract.models';

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

    return user;
  }
}

export default AuthModel;
