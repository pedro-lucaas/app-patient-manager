import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateAttributeBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  value: string;
}