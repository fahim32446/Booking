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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../utils/config"));
const customError_1 = __importDefault(require("../../utils/error/customError"));
class AuthChecker {
    constructor() {
        this.check = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = req.cookies['auth_token'];
            if (!token) {
                throw new customError_1.default('Your login is expired', 404, 'No token');
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
                req.userId = decoded.userId;
                next();
            }
            catch (error) {
                throw new customError_1.default('Your login is expired', 401, 'Unauthorized');
            }
        });
    }
}
exports.default = AuthChecker;
