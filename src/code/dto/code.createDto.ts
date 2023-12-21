import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCodeDto {
  @IsString()
  @IsNotEmpty()
  user_id: string

  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  description: string

  @IsNumber()
  @IsNotEmpty()
  price: number

  @IsNumber()
  @IsOptional()
  rating: Number

  @IsString()
  @IsNotEmpty()
  code_file: string

  @IsString()
  @IsOptional()
  programming_language: string

  @IsString()
  @IsOptional()
  category: string

} 