import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Transaksi } from "./Transaksi"

@Entity()
export class Paket {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: String

  @Column()
  detail: String

  @Column()
  price: number

  //One to Many relation
  @OneToMany(() => Transaksi, (transaksi) => transaksi.paket)
  transaksi: Transaksi[]
}