import AbstractRouter from '../../abstract/abstract.routers';
import AuthController from './auth.controller';

class AuthRoute extends AbstractRouter {
  private authController = new AuthController();

  constructor() {
    super();
    this.initRouters();
  }
  initRouters() {
    this.routers.post('/login', this.authController.login);
  }
}
export default AuthRoute;
