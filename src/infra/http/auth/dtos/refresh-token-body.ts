import { IsString, IsNotEmpty } from 'class-validator';

export class RefreshTokenBody {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}