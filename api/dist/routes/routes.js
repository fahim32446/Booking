"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const my_hotel_route_1 = __importDefault(require("../modules/private/my_hotels/my_hotel.route"));
const routes = (app) => {
    //HOTEL ROUTES
    app.use('/api/v1/hotel', new my_hotel_route_1.default().routers);
};
exports.default = routes;
