import { IsNotEmpty, IsOptional } from "class-validator";

export class DeleteAttributeBody {
  @IsNotEmpty()
  name: string;
}