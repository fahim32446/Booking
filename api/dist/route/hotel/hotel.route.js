"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_routers_1 = __importDefault(require("../../abstract/abstract.routers"));
const hotel_controller_1 = __importDefault(require("./hotel.controller"));
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
        this.hotelController = new hotel_controller_1.default();
        this.initRouters();
    }
    initRouters() {
        this.routers.post('/', upload.array('imageFiles', 6), this.hotelController.addHotel);
        // .post('/sign-google', this.hotelController.signGoogle)
        // .post('/sign-up', this.hotelController.signUp)
        // .post('/forgot-password', this.hotelController.forgotPassword)
        // .post('/verify-otp', this.hotelController.verifyOTP)
        // .post('/reset-password', this.hotelController.resetPassword);
        // this.routers.get('/verify-token', this.hotelController.signOut);
        // this.routers.get('/sign-out', this.hotelController.signOut);
    }
}
exports.default = HotelRoute;
