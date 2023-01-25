"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
const config_1 = require("../config/config");
class Pagination {
    constructor(items, total, page, limit = config_1.PAGE_SIZE) {
        this.items = items;
        this.page = page;
        this.pageSize = limit;
        this.total = total;
        this.totalPages = Math.ceil(total / limit);
    }
}
exports.Pagination = Pagination;
