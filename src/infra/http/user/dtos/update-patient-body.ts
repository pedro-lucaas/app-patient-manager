import { IsOptional } from "class-validator";

export class UpdatePatientBody {
  @IsOptional()
  name?: string;

  @IsOptional()
  cpf?: string;

  @IsOptional()
  caregiver?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  phone2?: string;

  @IsOptional()
  sex?: string;

  @IsOptional()
  civilStatus?: string;

  @IsOptional()
  birthDate?: Date;

  @IsOptional()
  schooling?: string;

  @IsOptional()
  addressCep?: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  number?: string;

  @IsOptional()
  complement?: string;

  @IsOptional()
  district?: string;

  @IsOptional()
  city?: string;

  @IsOptional()
  state?: string;

  @IsOptional()
  country?: string;

  @IsOptional()
  comments?: string;
}