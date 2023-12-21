import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/model/user.model';
import { CodeModule } from './code/code.module';
import { Code } from './code/model/code.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      models: [User, Code],
      autoLoadModels: true,
      synchronize: true // this maybe harmfull on production
    }),
    UsersModule,
    CodeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
