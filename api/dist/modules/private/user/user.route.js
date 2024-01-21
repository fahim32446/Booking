"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_routers_1 = __importDefault(require("../../../abstract/abstract.routers"));
const user_controller_1 = require("./user.controller");
class userRoute extends abstract_routers_1.default {
    constructor() {
        super();
        this.userController = new user_controller_1.userController();
        this.initRouters();
    }
    initRouters() {
        this.routers.get('/check-user', this.userController.checkUser);
        this.routers.post('/booking-payment/:hotelId', this.userController.bookingPayment);
        this.routers.post('/booking-confirm/:hotelId', this.userController.bookingConfirm);
    }
}
exports.default = userRoute;
