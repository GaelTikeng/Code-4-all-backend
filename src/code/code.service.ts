import { Injectable } from '@nestjs/common';
import { Code } from './model/code.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CodeService {
  constructor(
    @InjectModel(Code) private codeModel: typeof Code
  ) {}

  // findAll code snippets
  async findAll(): Promise<Code[]> {
    return this.codeModel.findAll()
  }

  // create a code
 
}
