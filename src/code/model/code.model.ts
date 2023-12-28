// import { Model } from "sequelize";
import { Table, Model, Column, PrimaryKey, IsUUID, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "src/users/model/user.model";

@Table
export class Code extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string

  @ForeignKey(() => User)
  @Column
  user_id: string

  @Column
  title: string

  @Column
  desctription: string

  @Column
  price: number

  @Column
  rating: number

  @Column
  code_file: string
  
  @Column
  programming_language: string

  @Column
  category: string

  @BelongsTo(() => User)
  user: User
}