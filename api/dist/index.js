"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const mini_1 = __importDefault(require("./common/mini"));
const config_1 = __importDefault(require("./utils/config"));
const errorHandler_1 = __importDefault(require("./common/middlewares/errorHandler"));
const path_1 = __importDefault(require("path"));
const auth_route_1 = __importDefault(require("./route/auth/auth.route"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const authChecker_1 = __importDefault(require("./common/middlewares/authChecker"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = Number(config_1.default.DB_PORT);
        this.Mini = new mini_1.default();
        this.authChecker = new authChecker_1.default();
        this.initMiddlewares();
        this.initRouters();
        this.moduleRouters();
        this.notFoundRouter();
        this.errorHandler();
    }
    listen() {
        this.app.listen(4000, () => {
            console.log(`server is listening at ${4000}....`);
        });
    }
    initMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)({ origin: this.Mini.cors(), credentials: true }));
        this.app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
    }
    initRouters() {
        this.app.get('/', (_req, res) => {
            res.send('app is running successfully...');
        });
        this.app.use('/api/v1/auth', new auth_route_1.default().routers);
    }
    moduleRouters() {
        /**
         * @router {Auth checker}
         */
        // this.app.use(this.authChecker.check);
        // routes(this.app);
    }
    notFoundRouter() {
        this.app.use(this.Mini[404]);
    }
    errorHandler() {
        const errorHandler = new errorHandler_1.default();
        this.app.use(errorHandler.handleErrors);
    }
}
exports.default = App;
const app = new App();
app.listen();
