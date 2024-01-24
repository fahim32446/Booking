"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const config_1 = __importDefault(require("../utils/config"));
const customError_1 = __importDefault(require("../utils/error/customError"));
class Mini {
    404(_req, _res, next) {
        next(new customError_1.default('Cannot find the route', 404, 'Invalid route'));
    }
    cors() {
        return [
            'http://localhost:3000',
            'http://localhost:5173',
            'https://localhost:5173',
            'localhost:5173',
            'https://booking-client.meinfo.xyz/',
            'http://booking-client.meinfo.xyz/',
            'booking-client.meinfo.xyz',
            'https://booking-client.meinfo.xyz',
        ];
    }
    cloudinary() {
        return cloudinary_1.v2.config({
            cloud_name: config_1.default.CLOUDINARY_CLOUD_NAME,
            api_key: config_1.default.CLOUDINARY_API_KEY,
            api_secret: config_1.default.CLOUDINARY_API_SECRET,
        });
    }
}
exports.default = Mini;
