import { Controller, Get, Post } from '@nestjs/common';
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
  async createPurchases(payload: CreatePurchasesDto): Promise<Purchases[]> {
    return await this.purchasesService.createPurchase(payload)
  }
}
