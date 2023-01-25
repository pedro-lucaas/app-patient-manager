import { IsNotEmpty, IsString } from "class-validator";

export class RemoveRoleFromUserBody {
  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  userId: string;
}