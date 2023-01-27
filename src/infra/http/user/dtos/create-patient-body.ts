import { IsDate, IsNotEmpty, IsOptional } from "class-validator";

export class CreatePatientBody {
  userId: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  cpf: string;

  @IsOptional()
  caregiver?: string;

  @IsOptional()
  email?: string;

  @IsNotEmpty()
  phone: string;

  @IsOptional()
  phone2?: string;

  @IsNotEmpty()
  sex: string;

  @IsOptional()
  civilStatus?: string;

  @IsNotEmpty()
  birthDate: Date;

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