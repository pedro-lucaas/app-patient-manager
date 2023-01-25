import { Pagination } from "./Pagination";
export type PaginationField<T, R> = Omit<T, keyof R> & Pagination<R>;
