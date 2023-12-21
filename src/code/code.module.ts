import { Module } from '@nestjs/common';
import { CodeService } from './code.service';
import { CodeController } from './code.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Code } from './model/code.model';

@Module({
  imports: [SequelizeModule.forFeature([Code])],
  providers: [CodeService],
  controllers: [CodeController],
  exports: [SequelizeModule]
})
export class CodeModule {}
