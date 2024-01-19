"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_controllers_1 = __importDefault(require("../../../abstract/abstract.controllers"));
const my_hotel_service_1 = __importDefault(require("./my_hotel.service"));
const my_hotel_validator_1 = __importDefault(require("./my_hotel.validator"));
class HotelController extends abstract_controllers_1.default {
    constructor() {
        super();
        this.hotelService = new my_hotel_service_1.default();
        this.validator = new my_hotel_validator_1.default();
        this.addHotel = this.assyncWrapper.wrap(this.validator.addHotel, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.hotelService.addHotel(req, res);
            if (data.success) {
                res.status(200).json(data);
            }
            else {
                this.error('Creating new hotels error');
            }
        }));
        this.getHotels = this.assyncWrapper.wrap([], (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.hotelService.getHotels(req);
            if (data.success) {
                res.status(200).json(data);
            }
            else {
                this.error('error');
            }
        }));
        this.getSingleHotel = this.assyncWrapper.wrap([], (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.hotelService.getSingleHotel(req);
            if (data.success) {
                res.status(200).json(data);
            }
            else {
                this.error('error');
            }
        }));
        this.updateHotel = this.assyncWrapper.wrap([], (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.hotelService.updateHotel(req);
            if (data.success) {
                res.status(200).json(data);
            }
            else {
                this.error('error');
            }
        }));
    }
}
exports.default = HotelController;
