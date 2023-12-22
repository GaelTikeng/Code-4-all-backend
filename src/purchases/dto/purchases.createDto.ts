import { IsNotEmpty, IsNumber, IsString, IsEmail } from "class-validator";

export class CreatePurchasesDto {
  @IsString()
  @IsNotEmpty()
  code_id: string

  @IsString()
  @IsNotEmpty()
  author_id: string

  @IsNumber()
  @IsNotEmpty()
  total_amount: string

  @IsString()
  @IsEmail()
  email: string
}