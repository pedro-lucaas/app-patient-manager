import { IsNotEmpty } from "class-validator";

export class UpdateUserProfileBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  inactiveDays: string;

  @IsNotEmpty()
  lunchTime: string;

  @IsNotEmpty()
  workTime: string;
}