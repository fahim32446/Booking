import AbstractModels from '../../../abstract/abstract.models';

export class userModel extends AbstractModels {

  

  async checkUser(id: string) {
    const [res] = await this.query()
      .select('*')
      .from('users')
      .where({ user_id: id });

    return res;
  }
}
