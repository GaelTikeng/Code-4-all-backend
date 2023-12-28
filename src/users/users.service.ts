import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { Sequelize } from 'sequelize-typescript';
import { CreateUserDto } from './dto/user.createDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private sequelize: Sequelize
  ) { }

  // create user
  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const existingEmail = createUserDto.email
    const existingUser = await this.userModel.findOne({
      where: { email: existingEmail }
    })
    if (existingUser) {
      throw new NotFoundException('User already exist')
    }
    // const createUser = new this.userModel(createUserDto)
    return await this.userModel.create<User>({ ...createUserDto })

  }

  // find all users
  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  // findOne user by id
  async findOneByid(id: string): Promise<User> {
    return this.userModel.findOne({
      where: { id }
    })
  }

  // delete a user
  async deleteUser(id: string): Promise<void> {
    const userToDelete = await this.userModel.findOne({ where: { id } })
    if (!userToDelete) {
      throw new NotFoundException('No user with such id')
    }
    await userToDelete.destroy()
  }
}
