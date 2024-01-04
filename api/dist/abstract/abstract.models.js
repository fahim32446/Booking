"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class AbstractModels {
    constructor(db, req) {
        this.database = database_1.db_name;
        this.db = db;
    }
    query() {
        return this.db.queryBuilder();
    }
}
exports.default = AbstractModels;
