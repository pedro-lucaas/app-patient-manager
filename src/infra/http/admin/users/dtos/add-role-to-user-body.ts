import { IsNotEmpty, IsString } from "class-validator";

export class AddRoleToUserBody {
  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  userId: string;
}