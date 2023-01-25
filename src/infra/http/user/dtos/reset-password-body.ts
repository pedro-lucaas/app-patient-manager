import { IsNotEmpty } from "class-validator";

export class RegisterUserBody {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  newPassword: string;
}