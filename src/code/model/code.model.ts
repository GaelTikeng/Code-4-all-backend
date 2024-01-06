import { DataTypes } from "sequelize";
import { Table, Model, Column, PrimaryKey, IsUUID, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Purchases } from "src/purchases/models/purchases.model";
import { User } from "src/users/model/user.model";

@Table
export class Code extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    defaultValue: DataTypes.UUIDV4
  })
  id: string

  @ForeignKey(() => User)
  @Column
  user_id: string

  @ForeignKey(() => Purchases)
  @Column
  purchase_id: string

  @Column
  title: string

  @Column
  desctription: string

  @Column
  price: number

  @Column
  code_file: string

  @Column
  rating: number 

  @Column
  programming_language: string

  @Column
  category: string

  // RELATIONSHIPS
  @BelongsTo(() => User)
  user: User

  @BelongsTo(() => Purchases)
  purchase: Purchases
}