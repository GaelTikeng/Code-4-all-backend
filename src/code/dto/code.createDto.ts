import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { HasMany } from "sequelize-typescript";
import { Code } from "../model/code.model";

export class CreateCodeDto {
  @IsString()
  @IsNotEmpty()
  user_id: string

  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
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

  @IsString()
  @IsOptional()
  thumbnail: string

} 