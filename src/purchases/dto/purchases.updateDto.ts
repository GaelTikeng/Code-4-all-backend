import { IsString } from "class-validator";

export  class UpdatePurchasesDto {
  @IsString()
  code_id: string
}