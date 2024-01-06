"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
        ];
    }
}
exports.default = Mini;
