"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = __importDefault(require("../modules/public/auth/auth.route"));
const hotel_route_1 = __importDefault(require("../modules/public/hotels/hotel.route"));
const public_routes = (app) => {
    app.use('/api/v1/auth', new auth_route_1.default().routers);
    app.use('/api/v1/hotel', new hotel_route_1.default().routers);
};
exports.default = public_routes;
