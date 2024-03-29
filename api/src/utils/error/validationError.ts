import { Result, ValidationError } from 'express-validator';

interface IError {
  status: number;
  type: string;
}

class ValidationErr extends Error implements IError {
  status: number;
  type: string;

  constructor(error: Result<ValidationError>) {
    super(error.array()[0].msg);
    (this.status = 400),
      (this.type = `Invalid input type for '${error.array()[0].msg}'`);
  }
}

export default ValidationErr;
