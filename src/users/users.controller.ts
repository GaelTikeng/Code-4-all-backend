import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { User } from './model/user.model';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.createDto';
import { UpdateUserDto } from './dto/user.updateDto';

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) { }

  // GET ALL USERS
  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.findAll()
  }

  // LOGIN USER
  @Post('/login')
  async loginUser(@Body() credential: CreateUserDto): Promise<User> {
    console.log('payload', credential)
    return await this.userService.loginUser(credential)
  }

  // POST NEW USER
  @Post()
  async createSingleUser(@Body() userService: CreateUserDto): Promise<any> {
    return await this.userService.createUser(userService)
  }

  // UPDATE USER CREDENTIALS
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() payloadToUpdate: UpdateUserDto
    ): Promise<User> {
    return this.userService.updateUserProfile(id, payloadToUpdate)
  }

  // GET SINGLE USER BY ID
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<User> {
    return await this.userService.findOneByid(id)
  }

  // GET USER BY EMAIL
  @Post('/email')
  async getUserByEmail(@Body() payload: CreateUserDto): Promise<User> {
    return await this.userService.findByEmail(payload)
  }
}

