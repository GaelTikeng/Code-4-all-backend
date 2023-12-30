import { Module } from '@nestjs/common';
import { PurchasesController } from './purchases.controller';
import { PurchasesService } from './purchases.service';
import { Purchases } from './models/purchases.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { CodeService } from 'src/code/code.service';
import { CodeModule } from 'src/code/code.module';

@Module({
  imports: [
    UsersModule, 
    CodeModule,
    SequelizeModule.forFeature([Purchases]),
  ],
  controllers: [PurchasesController],
  providers: [PurchasesService, UsersService, CodeService],
  exports: [SequelizeModule]
})
export class PurchasesModule {}
