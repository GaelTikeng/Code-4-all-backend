import { IsNumber, IsString } from "class-validator";

export class UpdateReviewDto {
  @IsString()
  review: string

  @IsNumber()
  rating: number
}