import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './model/user.model';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.createDto';

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.findAll()
  }

  @Post()
  async createSingleUser(@Body() userService: CreateUserDto): Promise<any> {
    return await this.userService.createUser(userService)
  }

} 

