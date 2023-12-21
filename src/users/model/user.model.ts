// import { Model } from "sequelize";
import { Table, Model, Column, IsUUID, PrimaryKey, IsEmail, HasMany } from "sequelize-typescript";
import { Code } from "src/code/model/code.model";

@Table
export class User extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string

  @Column
  name: string

  @IsEmail
  @Column
  email: string

  @Column
  image: string

  @Column
  phone: string

  @HasMany(() => Code)
  codes: Code[];
}