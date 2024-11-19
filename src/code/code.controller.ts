import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CodeService } from './code.service';
import { Code } from './model/code.model';
import { CreateCodeDto } from './dto/code.createDto';
import { UpdateCodeDto } from './dto/code.updateDto';

@Controller('code')
export class CodeController {
  constructor(private codeService: CodeService) { }

  // Get all codes snippets
  @Get()
  async getAllCodes(): Promise<Code[]> {
    return await this.codeService.findAll()
  }

  // CREATE CODE
  @Post()
  async createCode(@Body() codePayload: CreateCodeDto): Promise<Code> {
    const createdCode = await this.codeService.createCode(codePayload)
    console.log("created code from controler", createdCode)
    return createdCode
  }

  // get a code by Id
  @Get(':id')
  async getCodeById(@Param('id') id: string): Promise<Code> {
    return await this.codeService.findSingleCode(id)
  }

  // DELETE CODE SNIPPET
  @Delete('id/:author_id')
  async deleteCode(
    @Param('id') code_id: string,
    @Param("author_id") author_id: string): Promise<Code> {
    return await this.codeService.deleteCodeById(code_id, author_id)
  }

  // GET ALL CODES PER USER
  @Get('/user_code/:id')
  async getAllCodePerUser(@Param('id') user_id: string): Promise<Code[]> {
    console.log('from codeController', user_id)
    return await this.codeService.findCodePerUserId(user_id)
  }

  // GET CODE PER CATEGORY
  @Get('/category/:name')
  async findCodeByCategory (@Param('name') name: string): Promise<Code[]> {
    return await this.codeService.findcodePerCategory(name)
  }

  // UPDATE CODE SNIPPET
  @Put(":id/:user_id")
  async updateCode (
    @Param('id') id: string,
    @Param('user_id') user_id: string,
    @Body() updateDto: UpdateCodeDto
  ): Promise<Code> {
    return await this.codeService.updateCode(id, user_id, updateDto)
  }
}
