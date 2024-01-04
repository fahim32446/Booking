import { Request } from 'express';
import { Knex } from 'knex';
import { db } from '../../database';
import AuthModel from '../../route/auth/auth.models';

class Models {
  public db = db;

  public authModel(req: Request, trx?: Knex.Transaction) {
    return new AuthModel(trx || this.db, req);
  }
}

export default Models;
