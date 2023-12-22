import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Purchases } from './models/purchases.model';
import { Sequelize } from 'sequelize-typescript';
import { CreatePurchasesDto } from './dto/purchases.createDto';

@Injectable()
export class PurchasesService {
  constructor(
  @InjectModel(Purchases)
  private purchasesModel: typeof Purchases,
  private sequelize: Sequelize
  ) {}

  // create purchase
  async createPurchase(payload: CreatePurchasesDto): Promise<any> {
    
  }

  // find all purhases
  async findAll(): Promise<Purchases[]> {
    return this.purchasesModel.findAll()
  }


}
