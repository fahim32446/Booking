"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
const config = {
    DB_PASS: process.env.DB_PASS || '',
    DB_USER: process.env.DB_USER || '',
    DB_PORT: process.env.DB_PORT || '',
    DB_HOST: process.env.DB_HOST || '',
    COOKIES_NAME: process.env.COOKIES_NAME || 'auth_token',
    JWT_SECRET: process.env.JWT_SECRET || '',
    SERVER_PORT: process.env.SERVER_PORT || '5000',
    SENDER_EMAIL: process.env.SENDER_EMAIL || '',
    SENDER_EMAIL_APP_PASS: process.env.SENDER_EMAIL_APP_PASS || '',
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
    STRIPE_API_KEY: process.env.STRIPE_API_KEY || '',
};
exports.default = config;
