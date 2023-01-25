export declare class Pagination<T> {
    items: T[];
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    constructor(items: T[], total: number, page: number, limit?: number);
}
