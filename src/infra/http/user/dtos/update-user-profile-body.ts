import { IsNotEmpty } from "class-validator";

export class UpdateUserProfileBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;
}