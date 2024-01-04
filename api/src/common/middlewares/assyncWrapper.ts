import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import CustomError from '../../utils/error/customError';
import ValidationErr from '../../utils/error/validationError';

type Func = (req: Request, res: Response, next: NextFunction) => Promise<void>;
type Validator = (req: Request, res: Response, next: NextFunction) => void;

class AssyncWrapper {
  public wrap(validators: Validator[], cb: Func) {
    const middleware = async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const errors = validationResult(req);

        /**
         * throw error if there are any invalid inputs
         */
        if (!errors.isEmpty()) {
          throw new ValidationErr(errors);
        }

        await cb(req, res, next);
      } catch (err: any) {
        console.log({ error: err.sqlMessage, message: err });

        if (err.code === 'ER_ROW_IS_REFERENCED_2') {
          const str = (err.sqlMessage as string)
            .split(' FOREIGN KEY ')[1]
            .slice(0, 50)
            .split('`')[1];

          return next(
            new CustomError(
              `This row is already being used and cannot be deleted`,
              400,
              `Pleace provide a valid data for ${str}.`
            )
          );
        }

        if (err.code === 'ER_BAD_FIELD_ERROR') {
          return next(new CustomError(err.sqlMessage, 400, 'Bad field error'));
        }

        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
          const str = (err.sqlMessage as string)
            .split(' FOREIGN KEY ')[1]
            .slice(0, 50)
            .split('`')[1];

          return next(
            new CustomError(
              `Pleace provide a valid data for ${str}`,
              400,
              'Invalid data'
            )
          );
        }

        if (err.name === 'TokenExpiredError') {
          return next(
            new CustomError(
              'The token you provided has been expired',
              400,
              'Token expired'
            )
          );
        }

        if (err.code === 'ER_DATA_TOO_LONG') {
          return next(new CustomError(err.sqlMessage, 400, 'Too long data'));
        }

        if (err.code === 'ER_WARN_DATA_OUT_OF_RANGE') {
          return next(new CustomError(err.sqlMessage, 400, 'Out of range'));
        }

        next(new CustomError(err.message, err.status, err.type));
      }
    };

    return [...validators, middleware];
  }
}
export default AssyncWrapper;
