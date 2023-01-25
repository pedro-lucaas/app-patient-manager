import { randomUUID } from "node:crypto";
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

export class User {
  private _userId: string;
  private props: IUser;

  // private methods
  private set(props: Partial<IUser>): void {
    this.props = {
      ...this.props,
      ...props,
      updatedAt: new Date(),
    };
  }

  constructor(props: Replace<IUser, { createdAt?: Date, updatedAt?: Date }>, userId?: string) {
    this._userId = userId ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  // Getters
  get userId(): string {
    return this._userId;
  }
  get name(): string {
    return this.props.name;
  }
  get email(): string {
    return this.props.email;
  }
  get password(): string {
    return this.props.password;
  }
  get phone(): string {
    return this.props.phone;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get updatedAt(): Date {
    return this.props.updatedAt;
  }
  get canceledAt(): Date {
    return this.props.canceledAt;
  }
  get refreshToken(): string {
    return this.props.refreshToken;
  }
  get roles(): string[] {
    return this.props.roles;
  }

  // Setters
  set name(name: string) {
    this.set({ name });
  }
  set email(email: string) {
    this.set({ email });
  }
  set password(password: string) {
    this.set({ password });
  }
  set phone(phone: string) {
    this.set({ phone });
  }
  set refreshToken(refreshToken: string) {
    this.props.refreshToken = refreshToken;
  }
  set roles(roles: string[]) {
    this.props.roles = roles;
  }

  // Methods
  cancel(): void {
    this.set({ canceledAt: new Date() });
  }
}