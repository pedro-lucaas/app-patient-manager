import { RegisterUser } from "@application/use-cases/admin/register-user";
import { USER_ROOT } from "@config/config";

export class RootUser {
  static async create(registerUser: RegisterUser) {
    try {
      await registerUser.execute({
        name: USER_ROOT.name,
        email: USER_ROOT.email,
        phone: USER_ROOT.phone,
        password: USER_ROOT.password,
        roles: USER_ROOT.roles,
      })
      console.log(`Root user created: ${USER_ROOT.email}`)
    } catch (error) { }
  }
}