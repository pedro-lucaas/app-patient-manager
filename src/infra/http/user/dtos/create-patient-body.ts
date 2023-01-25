import { IsDate, IsNotEmpty, IsOptional } from "class-validator";

export class CreatePatientBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  sex: string;

  @IsNotEmpty()
  // @IsDate()
  birthDate: string;

  @IsOptional()
  comments?: string;
}