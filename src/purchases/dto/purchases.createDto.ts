import { IsNotEmpty, IsNumber, IsString, IsEmail, IsOptional } from "class-validator";

export class CreatePurchasesDto {
  
  @IsString()
  @IsNotEmpty()
  code_id: string

  @IsNumber()
  @IsNotEmpty()
  quantity: number

  @IsNumber()
  @IsNotEmpty()
  total_amount: number

  @IsString()
  @IsNotEmpty()
  buyer_id: string
}