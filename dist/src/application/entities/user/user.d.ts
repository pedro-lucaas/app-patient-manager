import { Replace } from "src/helpers/Replace";
export interface IRoles {
    name: string;
}
export interface IUser {
    name: string;
    email: string;
    password: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    canceledAt?: Date;
    refreshToken?: string;
    roles?: string[];
}
export declare class User {
    private _userId;
    private props;
    private set;
    constructor(props: Replace<IUser, {
        createdAt?: Date;
        updatedAt?: Date;
    }>, userId?: string);
    get userId(): string;
    get name(): string;
    get email(): string;
    get password(): string;
    get phone(): string;
    get createdAt(): Date;
    get updatedAt(): Date;
    get canceledAt(): Date;
    get refreshToken(): string;
    get roles(): string[];
    set name(name: string);
    set email(email: string);
    set password(password: string);
    set phone(phone: string);
    set refreshToken(refreshToken: string);
    set roles(roles: string[]);
    cancel(): void;
}
