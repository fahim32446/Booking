"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_routers_1 = __importDefault(require("../../abstract/abstract.routers"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
class AuthRoute extends abstract_routers_1.default {
    constructor() {
        super();
        this.authController = new auth_controller_1.default();
        this.initRouters();
    }
    initRouters() {
        this.routers.post('/login', this.authController.login);
    }
}
exports.default = AuthRoute;
