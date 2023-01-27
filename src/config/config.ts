import { Role } from "@infra/http/auth/roles/role.enum";

export const jwtOptions = {
  secret: 'secretKey',
  signOptions: { expiresIn: '1d' },
};
export const REFRESH_TOKEN_EXPIRES_IN = "7d";

export const PAGE_SIZE = 10;

export const USER_ROOT = {
  name: "root",
  email: "admin@gmail.com",
  phone: "123456789",
  cpf: "123456789",
  password: "123456",
  roles: [Role.Admin, Role.User]
}