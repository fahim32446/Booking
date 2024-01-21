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
exports.userService = void 0;
const abstract_service_1 = __importDefault(require("../../../abstract/abstract.service"));
const customError_1 = __importDefault(require("../../../utils/error/customError"));
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../../utils/config"));
class userService extends abstract_service_1.default {
    constructor() {
        super();
        this.stripe = new stripe_1.default(config_1.default.STRIPE_API_KEY);
    }
    checkUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.models.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const user_conn = this.models.userModal(req);
                const { id } = req.params;
                const loginUser = req.userId;
                const res = yield user_conn.checkUser(loginUser);
                return {
                    success: true,
                    data: res,
                    message: 'User details',
                };
            }));
        });
    }
    bookingPayment(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.models.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const { numberOfNights } = req.body;
                const { hotelId } = req.params;
                const hotel_conn = this.models.HotelModel(req);
                const hotel = yield hotel_conn.hotelDetails(hotelId);
                const totalCost = hotel.pricePerNight * numberOfNights;
                if (!hotel) {
                    throw new customError_1.default('No hotel found', 400, 'NOT_FOUND');
                }
                const paymentIntent = yield this.stripe.paymentIntents.create({
                    amount: totalCost * 100,
                    currency: 'usd',
                    metadata: {
                        hotelId,
                        userId: req.userId,
                    },
                });
                if (!paymentIntent.client_secret) {
                    throw new customError_1.default('Error creating payment intent', 500, 'ERROR');
                }
                const response = {
                    paymentIntentId: paymentIntent.id,
                    clientSecret: paymentIntent.client_secret.toString(),
                    totalCost,
                };
                return {
                    success: true,
                    data: response,
                    message: 'Payment details',
                };
            }));
        });
    }
    bookingConfirm(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.models.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const body = req.body;
                const booking_conn = this.models.BookingModal(req);
                const paymentIntentId = body.paymentIntentId;
                const paymentIntent = yield this.stripe.paymentIntents.retrieve(paymentIntentId);
                if (!paymentIntent) {
                    throw new customError_1.default('Error creating payment intent', 500, 'ERROR');
                }
                if (paymentIntent.metadata.hotelId != req.params.hotelId ||
                    paymentIntent.metadata.userId != req.userId) {
                    throw new customError_1.default('Payment intent mismatch', 500, 'ERROR');
                }
                if (paymentIntent.status !== 'succeeded') {
                    throw new customError_1.default('Payment not succeeded', Number(paymentIntent.status || 500), 'ERROR');
                }
                const createBooking = {
                    adult_count: body.adult_count,
                    check_in: body.check_in,
                    check_out: body.check_out,
                    child_count: body.child_count,
                    hotel_id: body.hotel_id,
                    total_cost: body.total_cost,
                    user_id: Number(req.userId),
                };
                const res = yield booking_conn.bookHotel(createBooking);
                return {
                    success: true,
                    data: res,
                    message: 'Hotel booking is successfully done',
                };
            }));
        });
    }
}
exports.userService = userService;
