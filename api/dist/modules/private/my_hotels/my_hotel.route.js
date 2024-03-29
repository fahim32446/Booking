"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_routers_1 = __importDefault(require("../../../abstract/abstract.routers"));
const my_hotel_controller_1 = __importDefault(require("./my_hotel.controller"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});
class HotelRoute extends abstract_routers_1.default {
    constructor() {
        super();
        this.hotelController = new my_hotel_controller_1.default();
        this.initRouters();
    }
    initRouters() {
        this.routers.post('/', upload.array('imageFiles', 6), this.hotelController.addHotel);
        this.routers.get('/', this.hotelController.getHotels);
        this.routers.get('/:id', this.hotelController.getSingleHotel);
        this.routers.delete('/:id', this.hotelController.deleteHotel);
        this.routers.put('/:id', upload.array('imageFiles', 6), this.hotelController.updateHotel);
    }
}
exports.default = HotelRoute;
