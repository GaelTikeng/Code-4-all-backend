import { DataTypes } from "sequelize";
import { BelongsTo, Column, ForeignKey, HasMany, IsUUID, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Code } from "src/code/model/code.model";
import { User } from "src/users/model/user.model";

@Table
export class Review extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    defaultValue: DataTypes.UUIDV4
  })
  id: string

  @ForeignKey(() => User)
  @Column
  user_id: string
  
  @ForeignKey(() => Code)
  @Column
  code_id: string

  @Column
  review: string

  @Column
  rating: number

  // RELATIONSHIPS
  @BelongsTo(() => User)
  user: User

  @BelongsTo(() => Code)
  code: Code
 
}