"use strict";
// dotenv.config({ path: path.resolve(__dirname, '../../.env') });
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    DB_PASS: process.env.DB_PASS || '',
    DB_USER: process.env.DB_USER || '',
    DB_PORT: process.env.DB_PORT || '',
    DB_HOST: process.env.DB_HOST || '',
    JWT_SECRET: process.env.JWT_SECRET || '',
    SERVER_PORT: process.env.SERVER_PORT || '5000',
};
exports.default = config;
