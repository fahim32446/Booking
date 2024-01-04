"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Models_1 = __importDefault(require("../common/model/Models"));
class AbstractServices {
    constructor() {
        this.models = new Models_1.default();
    }
}
exports.default = AbstractServices;
