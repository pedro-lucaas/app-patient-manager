import { PAGE_SIZE } from "@config/config";


export class Pagination<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;

  constructor(items: T[], total: number, page: number, limit: number = PAGE_SIZE) {
    this.items = items;
    this.page = page;
    this.pageSize = limit;
    this.total = total;
    this.totalPages = Math.ceil(total / limit);
  }
}