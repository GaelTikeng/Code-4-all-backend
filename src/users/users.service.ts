import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { Sequelize } from 'sequelize-typescript';
import { CreateUserDto } from './dto/user.createDto';
import { UpdateUserDto } from './dto/user.updateDto';

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
      console.log("User already exist")
      return existingUser
    }
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

  // UPDATE USER
  async updateUserProfile(user_id: string, updateDto: UpdateUserDto): Promise<any> {
    console.log('this is the id', user_id)
    console.log("payload from service", updateDto)
    const updated = await this.userModel.update(updateDto, {
      where: {id: user_id}
    })
    console.log("updated", updated)
    return updated
  }
 }
