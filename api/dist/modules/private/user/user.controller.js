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
exports.userController = void 0;
const abstract_controllers_1 = __importDefault(require("../../../abstract/abstract.controllers"));
const user_service_1 = require("./user.service");
const user_validator_1 = require("./user.validator");
class userController extends abstract_controllers_1.default {
    constructor() {
        super();
        this.validator = new user_validator_1.userValidator();
        this.userService = new user_service_1.userService();
        this.checkUser = this.assyncWrapper.wrap([], (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.userService.checkUser(req);
            if (data.success) {
                res.status(200).json(data);
            }
            else {
                this.error('Creating new hotels error');
            }
        }));
        this.bookingPayment = this.assyncWrapper.wrap([], (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.userService.bookingPayment(req);
            if (data.success) {
                res.status(200).json(data);
            }
            else {
                this.error('Creating new hotels error');
            }
        }));
        this.bookingConfirm = this.assyncWrapper.wrap(this.validator.bookingConfirm, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.userService.bookingConfirm(req);
            if (data.success) {
                res.status(200).json(data);
            }
            else {
                this.error('Creating new hotels error');
            }
        }));
    }
}
exports.userController = userController;
