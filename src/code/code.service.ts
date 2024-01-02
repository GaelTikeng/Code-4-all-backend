import { Injectable, NotFoundException } from '@nestjs/common';
import { Code } from './model/code.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCodeDto } from './dto/code.createDto';
import { User } from 'src/users/model/user.model';
import { UpdateCodeDto } from './dto/code.updateDto';

@Injectable()
export class CodeService {
  constructor(
    @InjectModel(Code) private codeModel: typeof Code
  ) { }

  // findAll code snippets
  async findAll(): Promise<Code[]> {
    return await this.codeModel.findAll({
      include: {
        model: User
      }
    })
  }

  // create a code
  async createCode(code: CreateCodeDto): Promise<Code> {
    return await this.codeModel.create({ ...code })
  }

  // FIND A SINGLE CODE BY ID
  async findSingleCode(id: string): Promise<Code> {
    const singleCode: Code = await this.codeModel.findOne({
      where: { id },
      include: {
        model: User
      }
    })
    return singleCode
  }

  // DELETE CODE
  async deleteCodeById(id: string, user_id: string): Promise<any> {
    return await this.codeModel.destroy({
      where: {
        id: id,
        user_id: user_id
      }
    })
  }

  // FIND ALL CODES PER USER_ID
  async findCodePerUserId(user_id: string): Promise<Code[]> {
    console.log('user_id from codeService', user_id)
    const userCode: Code[] = await this.codeModel.findAll({
      where: {
        user_id: user_id
      }
    })
    if (!userCode) {
      throw new NotFoundException("You have not uploaded a code yet")
    }
    return userCode
  }

  // FIND CODE BY PROGAMMING LANGUAGE
  async findcodePerCategory(language: string): Promise<Code[]> {
    const categoryCode = await this.codeModel.findAll({
      where: {
        programming_language: language
      },
      include: {
        model: User
      }
    })
    if (!categoryCode) {
      throw new NotFoundException('No code with this programming language')
    }
    return categoryCode

  }

  // UPDATE CODE
  async updateCode (
    code_id: string,
    user_id: string,
    updateDto: UpdateCodeDto
  ): Promise<any> {
    return await this.codeModel.update(updateDto, {
      where: {
        id: code_id,
        user_id: user_id
      }
    })
  }

}
