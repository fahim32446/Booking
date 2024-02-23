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
const abstract_service_1 = __importDefault(require("../../../abstract/abstract.service"));
const imageUpload_1 = require("../../../utils/imageUpload");
class HotelService extends abstract_service_1.default {
    constructor() {
        super();
    }
    addHotel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.models.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const hotel_conn = this.models.myHotelModel(req);
                const imageFiles = req.files;
                const newHotel = req.body;
                const imageUrls = yield (0, imageUpload_1.uploadImages)(imageFiles);
                const data = {
                    user_id: req.userId,
                    name: newHotel.name,
                    city: newHotel.city,
                    country: newHotel.country,
                    description: newHotel.description,
                    type: newHotel.type,
                    adult_count: newHotel.adultCount,
                    child_count: newHotel.childCount,
                    price_per_night: newHotel.pricePerNight,
                    star_rating: newHotel.starRating,
                    facilities: JSON.stringify(newHotel.facilities),
                    image_urls: JSON.stringify(imageUrls),
                };
                const result = yield hotel_conn.addHotel(data);
                return {
                    success: true,
                    data: result,
                    message: 'Add new hotel successfully done',
                };
            }));
        });
    }
    getHotels(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.models.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const hotel_conn = this.models.myHotelModel(req);
                const user_id = req.userId;
                const result = yield hotel_conn.getHotels(user_id);
                return {
                    success: true,
                    data: result,
                    message: 'Get all hotel',
                };
            }));
        });
    }
    getSingleHotel(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.models.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const hotelID = req.params.id.toString();
                const hotel_conn = this.models.myHotelModel(req);
                const user_id = req.userId;
                const result = yield hotel_conn.getSingleHotel(hotelID);
                return {
                    success: true,
                    data: result,
                    message: 'Get single hotel',
                };
            }));
        });
    }
    deleteHotel(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.models.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const hotelID = req.params.id.toString();
                const hotel_conn = this.models.myHotelModel(req);
                const user_id = req.userId;
                const result = yield hotel_conn.deleteHotel(hotelID);
                return {
                    success: true,
                    data: result,
                    message: 'Get single hotel',
                };
            }));
        });
    }
    updateHotel(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.models.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const updatedHotel = req.body;
                const hotelID = req.params.id.toString();
                const hotel_conn = this.models.myHotelModel(req);
                const files = req.files;
                const updatedImageUrls = yield (0, imageUpload_1.uploadImages)(files);
                const imageUrls = [
                    ...updatedImageUrls,
                    ...(updatedHotel.imageUrls || []),
                ];
                const data = {
                    name: updatedHotel.name,
                    city: updatedHotel.city,
                    country: updatedHotel.country,
                    description: updatedHotel.description,
                    type: updatedHotel.type,
                    adult_count: updatedHotel.adultCount,
                    child_count: updatedHotel.childCount,
                    price_per_night: updatedHotel.pricePerNight,
                    star_rating: updatedHotel.starRating,
                    facilities: JSON.stringify(updatedHotel.facilities),
                    image_urls: JSON.stringify(imageUrls),
                };
                const result = yield hotel_conn.updateHotel(hotelID, data);
                return {
                    success: true,
                    data: result,
                    message: 'Hotel update has been successfully done',
                };
            }));
        });
    }
}
exports.default = HotelService;
