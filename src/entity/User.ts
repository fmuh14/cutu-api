import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"
import { Address } from "./Address"
import { Transaksi } from "./Transaksi"

@Entity()
export class User {

  @PrimaryColumn({ insert: false })
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
  address: Address[]

  //One to Many relation
  @OneToMany(() => Transaksi, (transaksi) => transaksi.user)
  transaksi: Transaksi[]
}
