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
const express_validator_1 = require("express-validator");
const customError_1 = __importDefault(require("../utils/error/customError"));
const validationError_1 = __importDefault(require("../utils/error/validationError"));
class AssyncWrapper {
    wrap(validators, cb) {
        const middleware = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                /**
                 * throw error if there are any invalid inputs
                 */
                if (!errors.isEmpty()) {
                    throw new validationError_1.default(errors);
                }
                yield cb(req, res, next);
            }
            catch (err) {
                console.log({ error: err.sqlMessage, message: err });
                if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                    const str = err.sqlMessage
                        .split(' FOREIGN KEY ')[1]
                        .slice(0, 50)
                        .split('`')[1];
                    return next(new customError_1.default(`This row is already being used and cannot be deleted`, 400, `Pleace provide a valid data for ${str}.`));
                }
                if (err.code === 'ER_BAD_FIELD_ERROR') {
                    return next(new customError_1.default(err.sqlMessage, 400, 'Bad field error'));
                }
                if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                    const str = err.sqlMessage
                        .split(' FOREIGN KEY ')[1]
                        .slice(0, 50)
                        .split('`')[1];
                    return next(new customError_1.default(`Pleace provide a valid data for ${str}`, 400, 'Invalid data'));
                }
                if (err.name === 'TokenExpiredError') {
                    return next(new customError_1.default('The token you provided has been expired', 400, 'Token expired'));
                }
                if (err.code === 'ER_DATA_TOO_LONG') {
                    return next(new customError_1.default(err.sqlMessage, 400, 'Too long data'));
                }
                if (err.code === 'ER_WARN_DATA_OUT_OF_RANGE') {
                    return next(new customError_1.default(err.sqlMessage, 400, 'Out of range'));
                }
                next(new customError_1.default(err.message, err.status, err.type));
            }
        });
        return [...validators, middleware];
    }
}
exports.default = AssyncWrapper;
