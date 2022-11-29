import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Transaksi } from "./Transaksi"

@Entity()
export class Kurir {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: String

  @Column()
  phone_number: String

  @Column()
  is_ready: boolean

  //One to Many relation
  @OneToMany(() => Transaksi, (transaksi) => transaksi.kurir)
  transaksi: Transaksi[]
}