import { Knex } from 'knex';
import { db_name } from '../database';
import { Request } from 'express';

export type TDB = Knex | Knex.Transaction;

abstract class AbstractModels {
  protected db: TDB;
  protected database = db_name;

  constructor(db: TDB, req: Request) {
    this.db = db;
  }

  protected query() {
    return this.db.queryBuilder();
  }
}
export default AbstractModels;
