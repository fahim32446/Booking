import AssyncWrapper from '../common/middlewares/assyncWrapper';
import CustomError from '../utils/error/customError';

abstract class AbstractController {
  protected assyncWrapper: AssyncWrapper;

  constructor() {
    this.assyncWrapper = new AssyncWrapper();
  }

  protected error(message?: string, status?: number, type?: string) {
    throw new CustomError(
      message || 'Something went wrong',
      status || 500,
      type || 'Internal server Error'
    );
  }
}
export default AbstractController;
