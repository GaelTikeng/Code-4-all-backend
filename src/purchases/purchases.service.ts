import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Purchases } from './models/purchases.model';
import { Sequelize } from 'sequelize-typescript';
import { CreatePurchasesDto } from './dto/purchases.createDto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/model/user.model';
import { CodeService } from 'src/code/code.service';
import { Code } from 'src/code/model/code.model';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectModel(Purchases)
    private purchasesModel: typeof Purchases,
    private sequelize: Sequelize,
    private userService: UsersService,
    private codeService: CodeService
  ) { }

  // create purchase
  async createPurchase(payload: CreatePurchasesDto): Promise<any> {
    const purchasedCourse = await this.purchasesModel.create({ ...payload })
    console.log('from purchased service', payload.buyer_id)
    const ID: any = payload.buyer_id
    const user = await this.userService.findOneByid(ID)
    // console.log('here is user foms purchaseService', user)
    return { purchasedCourse, user }
  }

  // find all purhases
  async findAll(): Promise<Purchases[]> {
    return this.purchasesModel.findAll({
      include: {
        model: User
      }
    })
  }

  // FIND ALL PURCHASES PER BUYER_ID
  async findAllPurchasesPerbuyerId(buyer_id: string): Promise<any[]> {
    try {
      const allPurchases = await this.purchasesModel.findAll({
        where: {
          buyer_id: buyer_id
        },
        include: {
          model: Code
          // as: 'codeObj',
        }
      })
  
      console.log('nested object', allPurchases[0].code_id)
      const purchases = allPurchases.map(async (item) => {
        const singleCode = await this.codeService.findSingleCode(item.code_id)
        // console.log('this is single code', singleCode.dataValues)
        console.log('singleCode', singleCode.dataValues)
        return singleCode.dataValues
      })
      // console.log('this is purchases + code', purcheses)
      return allPurchases

  
    } catch (error) {
      console.log(error)
    }
    
  }
}