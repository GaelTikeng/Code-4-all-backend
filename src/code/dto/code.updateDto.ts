import { IsNumber, IsOptional, IsString } from "class-validator";
import { Is } from "sequelize-typescript";

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

  @IsNumber()
  @IsOptional()
  rating: number

  @IsString()
  @IsOptional()
  thumbnail: string
  
}