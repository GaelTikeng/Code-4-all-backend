import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  user_id: string

  @IsString()
  @IsNotEmpty()
  code_id: string

  @IsString()
  review: string

  @IsNumber()
  rating: number

}