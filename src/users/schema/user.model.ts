// import { Model } from "sequelize";
import { Table, Model, Column } from "sequelize-typescript";

@Table
export class User extends Model {
  @Column
  name: string

  @Column
  email: string

  @Column
  image: string

  @Column
  phone: string
}