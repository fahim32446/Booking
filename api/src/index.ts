import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import AuthChecker from './common/middlewares/authChecker';
import ErrorHandler from './common/middlewares/errorHandler';
import Mini from './common/mini';
import config from './utils/config';
import private_routes from './routes/private_routes';
import { v2 as cloudinary } from 'cloudinary';
import AuthRoute from './modules/public/auth/auth.route';
import public_routes from './routes/public_routes';

class App {
  public app = express();
  private port: number = Number(config.DB_PORT);
  private Mini = new Mini();
  private authChecker = new AuthChecker();

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
    this.Mini.cloudinary();
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
    public_routes(this.app);
    // this.app.use('/api/v1/auth', new AuthRoute().routers);
  }

  private moduleRouters() {
    /**
     * @router {Auth checker}
     */
    this.app.use(this.authChecker.check);

    private_routes(this.app);
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
