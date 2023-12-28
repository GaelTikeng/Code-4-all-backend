import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchasesDto } from './dto/purchases.createDto';
import { Purchases } from './models/purchases.model';

@Controller('purchases')
export class PurchasesController {
  constructor(private purchasesService: PurchasesService) {}

  // get all purchases
  @Get()
  async getAllPurchases(): Promise<Purchases[]> {
    return await this.purchasesService.findAll()
  }

  // create new purchases
  @Post()
  async createPurchases(
    @Body() payload: CreatePurchasesDto
    ): Promise<Purchases[]> {
    return await this.purchasesService.createPurchase(payload)
  }

  // FIND ALL PURCHASED COURSES OF BUYER
  @Get(':id')
  async getAllPurchasesPerId(@Param('id') buyer_id: string): Promise<Purchases[]> {
    console.log('id from purchasecontroller', buyer_id)
    return await this.purchasesService.findAllPurchasesPerbuyerId(buyer_id)
  }
}
