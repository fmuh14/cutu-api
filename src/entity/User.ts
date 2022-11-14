import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"
import { Address } from "./Address"

@Entity()
export class User {

  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  phone_number: string

  //One to Many relation
  @OneToMany(() => Address, (address) => address.user)
  address: Address
}
