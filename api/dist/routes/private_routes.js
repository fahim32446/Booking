"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const my_hotel_route_1 = __importDefault(require("../modules/private/my_hotels/my_hotel.route"));
const user_route_1 = __importDefault(require("../modules/private/user/user.route"));
const booking_route_1 = require("../modules/private/booking/booking.route");
const private_routes = (app) => {
    app.use('/api/v1/my-hotel', new my_hotel_route_1.default().routers);
    app.use('/api/v1/user', new user_route_1.default().routers);
    app.use('/api/v1/booking', new booking_route_1.bookingRoute().routers);
};
exports.default = private_routes;
