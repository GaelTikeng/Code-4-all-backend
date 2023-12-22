import { IsEmail, IsString } from "class-validator";

export  class UpdatePurchasesDto {
  @IsString()
  @IsEmail()
  email: string
}