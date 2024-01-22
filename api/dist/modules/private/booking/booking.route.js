"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoute = void 0;
const abstract_routers_1 = __importDefault(require("../../../abstract/abstract.routers"));
const booking_controller_1 = require("./booking.controller");
class bookingRoute extends abstract_routers_1.default {
    constructor() {
        super();
        this.bookingController = new booking_controller_1.bookingController();
        this.initRouters();
    }
    initRouters() {
        this.routers.get('/get-booking-list', this.bookingController.getBookingList);
    }
}
exports.bookingRoute = bookingRoute;
