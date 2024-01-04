"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../database");
const auth_models_1 = __importDefault(require("../../route/auth/auth.models"));
class Models {
    constructor() {
        this.db = database_1.db;
    }
    authModel(req, trx) {
        return new auth_models_1.default(trx || this.db, req);
    }
}
exports.default = Models;
