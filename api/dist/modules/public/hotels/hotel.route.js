"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_routers_1 = __importDefault(require("../../../abstract/abstract.routers"));
const hotel_controller_1 = __importDefault(require("./hotel.controller"));
class hotel extends abstract_routers_1.default {
    constructor() {
        super();
        this.controller = new hotel_controller_1.default();
        this.initRouters();
    }
    initRouters() {
        this.routers.get('/search', this.controller.searchHotel);
    }
}
exports.default = hotel;
