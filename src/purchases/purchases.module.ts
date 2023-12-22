import { Module } from '@nestjs/common';
import { PurchasesController } from './purchases.controller';
import { PurchasesService } from './purchases.service';
import { Purchases } from './models/purchases.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Purchases])],
  controllers: [PurchasesController],
  providers: [PurchasesService],
  exports: [SequelizeModule]
})
export class PurchasesModule {}
