import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCodeDto {
  @IsString()
  @IsOptional()
  title: string

  @IsString()
  @IsOptional()
  description: string

  @IsNumber()
  @IsOptional()
  price: number

  @IsString()
  @IsOptional()
  code_file: string

  @IsString()
  @IsOptional()
  Programming_language: string

  @IsString()
  @IsOptional()
  category: string
  
}