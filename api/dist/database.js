"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.db_name = void 0;
const knex_1 = __importDefault(require("knex"));
// const serverCa = [fs.readFileSync('./DigiCertGlobalRootCA.crt.pem', 'utf8')];
exports.db_name = 'booking';
const createDbConn = () => {
    const conn = (0, knex_1.default)({
        client: 'mysql2',
        connection: {
            database: exports.db_name,
            port: 3306,
            host: '127.0.0.1',
            user: 'root',
            password: '12345678',
            //   ssl: {
            //     rejectUnauthorized: true,
            //     ca: serverCa,
            //   },
        },
        pool: { min: 0, max: 7 },
    });
    console.log('connected to database...');
    return conn;
};
exports.db = createDbConn();
