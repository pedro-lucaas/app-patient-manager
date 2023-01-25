import { IsOptional } from "class-validator";

export class UpdatePatientBody {
  @IsOptional()
  name: string;

  @IsOptional()
  email: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  sex: string;

  @IsOptional()
  // @IsDate()
  birthDate: string;

  @IsOptional()
  comments?: string;
}