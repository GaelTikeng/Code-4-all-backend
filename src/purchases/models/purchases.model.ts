import { DataTypes } from "sequelize";
import { BelongsTo, Column, ForeignKey, HasMany, IsEmail, IsUUID, Model, PrimaryKey, Table } from "sequelize-typescript";
import { CodeController } from "src/code/code.controller";
import { Code } from "src/code/model/code.model";
import { User } from "src/users/model/user.model";

@Table
export class Purchases extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    defaultValue: DataTypes.UUIDV4
  })
  id: string

  @ForeignKey(() => Code)
  @Column
  code_id: string

  @ForeignKey(() => User)
  @Column
  buyer_id: string // ID OF THE BUYER

  @Column
  total_amount: number

  // @IsEmail
  // @Column
  // email: string // email of buyer

  @Column
  quantity: number

  // RELATIONSHIP
  @HasMany(() => Code)
  code: Code[]

  @BelongsTo(() => User)
  user: User
}