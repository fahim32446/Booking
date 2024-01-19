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
const hotel_service_1 = __importDefault(require("./hotel.service"));
const hotel_validator_1 = __importDefault(require("./hotel.validator"));
class hotelController extends abstract_controllers_1.default {
    constructor() {
        super();
        this.hotelService = new hotel_service_1.default();
        this.validator = new hotel_validator_1.default();
        this.searchHotel = this.assyncWrapper.wrap([], (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.hotelService.searchHotel(req);
            if (data.success) {
                res.status(200).json(data);
            }
            else {
                this.error('error');
            }
        }));
    }
}
exports.default = hotelController;
