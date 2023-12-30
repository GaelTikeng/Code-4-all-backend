import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { Sequelize } from 'sequelize-typescript';
import { CreateUserDto } from './dto/user.createDto';
import { UpdateUserDto } from './dto/user.updateDto';
import * as bcrypt from 'bcrypt';
import { create } from 'domain';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private sequelize: Sequelize
  ) { }

  // LOGIN 
  async loginUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const existingUser = await this.userModel.findOne({
        where: { email: createUserDto.email }
      })
      const isMatch = await bcrypt.compare(createUserDto.password, existingUser.password)
      console.log("ismatch ? ", isMatch)
      if (isMatch) {
        return existingUser
      } else {
        throw new HttpException('Invalid ', HttpStatus.FORBIDDEN)
      }

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Invalid authentication',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  // create user
  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const salt = 10
    if (createUserDto.password) {
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt)
      console.log('plaintext', createUserDto.password)
      console.log('hashed pwd', hashedPassword)
      const existingUser = await this.userModel.findOne({
        where: { email: createUserDto.email }
      })
      if (existingUser) {
        const message: string = "user already exist"
        console.log("User already exist")
        return existingUser
      }
      return await this.userModel.create<User>({
        name: createUserDto.name,
        email: createUserDto.email,
        image: createUserDto.image,
        phone: createUserDto.phone,
        password: hashedPassword
      })
    }
    return await this.userModel.create<User>({ ...createUserDto })


  }

  // find all users
  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  // FIND USER BY EMAIL
  async findByEmail(payload: CreateUserDto): Promise<User> {
    return await this.userModel.findOne({
      where: { email: payload.email }
    })
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
    const updated = await this.userModel.update(updateDto, {
      where: { id: user_id }
    })
    console.log("updated", updated)
    return updated
  }
}
