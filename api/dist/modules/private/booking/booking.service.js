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
exports.bookingService = void 0;
const abstract_service_1 = __importDefault(require("../../../abstract/abstract.service"));
class bookingService extends abstract_service_1.default {
    getBookingList(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.models.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const booking_conn = this.models.BookingModal(req);
                const userId = req.userId;
                const res = yield booking_conn.getBookingList(userId);
                return {
                    success: true,
                    data: res,
                    message: 'Hotel booking is successfully done',
                };
            }));
        });
    }
}
exports.bookingService = bookingService;
