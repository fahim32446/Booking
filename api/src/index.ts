import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import Mini from './common/mini';
import config from './utils/config';
import ErrorHandler from './common/middlewares/errorHandler';
import path from 'path';
import AuthRoute from './route/auth/auth.route';
import cors from 'cors';
import 'dotenv/config';

class App {
  public app = express();
  private port: number = Number(config.DB_PORT);
  private Mini = new Mini();
  // private authChecker = new AuthChecker();

  constructor() {
    this.initMiddlewares();
    this.initRouters();
    this.moduleRouters();
    this.notFoundRouter();
    this.errorHandler();
  }

  public listen() {
    this.app.listen(4000, () => {
      console.log(`server is listening at ${4000}....`);
    });
  }

  private initMiddlewares() {
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors({ origin: this.Mini.cors(), credentials: true }));

    this.app.use(express.static(path.join(__dirname, 'public')));
  }

  private initRouters() {
    this.app.get('/', (_req, res) => {
      res.send('app is running successfully...');
    });

    this.app.use('/api/v1/auth', new AuthRoute().routers);
  }

  private moduleRouters() {
    /**
     * @router {Auth checker}
     */
    // this.app.use(this.authChecker.check);
    // routes(this.app);
  }

  private notFoundRouter() {
    this.app.use(this.Mini[404]);
  }

  private errorHandler() {
    const errorHandler = new ErrorHandler();
    this.app.use(errorHandler.handleErrors);
  }
}

export default App;

const app = new App();

app.listen();
