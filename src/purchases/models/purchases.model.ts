import { DataTypes } from "sequelize";
import { Column, ForeignKey, HasMany, IsEmail, IsUUID, Model, PrimaryKey, Table } from "sequelize-typescript";
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
  author_id: string

  @Column
  total_amount: string

  @IsEmail
  @Column
  email: string // email of buyer

  // RELATIONSHIP
  @HasMany(() => Code)
  code: Code []
}