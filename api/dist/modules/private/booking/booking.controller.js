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
exports.bookingController = void 0;
const abstract_controllers_1 = __importDefault(require("../../../abstract/abstract.controllers"));
const booking_service_1 = require("./booking.service");
class bookingController extends abstract_controllers_1.default {
    constructor() {
        super();
        this.bookingService = new booking_service_1.bookingService();
        this.getBookingList = this.assyncWrapper.wrap([], (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.bookingService.getBookingList(req);
            if (data.success) {
                res.status(200).json(data);
            }
            else {
                this.error('error');
            }
        }));
    }
}
exports.bookingController = bookingController;
