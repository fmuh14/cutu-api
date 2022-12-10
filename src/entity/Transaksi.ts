import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm"
import { Address } from "./Address"
import { Kurir } from "./Kurir"
import { Paket } from "./Paket"
import { User } from "./User"

@Entity()
export class Transaksi {

  @PrimaryColumn()
  id: string

  @CreateDateColumn()
  tanggal_pemesanan: Date

  @Column()
  status: string

  @Column()
  status_bayar: boolean

  @Column()
  metode_pemesanan: string

  @Column()
  metode_pembayaran: string

  @Column()
  ongkir: number

  @Column()
  total_harga: number

  @Column()
  invoice_id: string

  //Many to one relation
  @ManyToOne(() => User, (user) => user.transaksi)
  @JoinColumn({
    name: "user_id",
    foreignKeyConstraintName: "fk_transaksi_user_id"
  })
  user: User

  //Many to one relation
  @ManyToOne(() => Address, (address) => address.transaksi)
  @JoinColumn({
    name: "address_id",
    foreignKeyConstraintName: "fk_transaksi_address_id"
  })
  address: Address

  //Many to one relation
  @ManyToOne(() => Paket, (paket) => paket.transaksi)
  @JoinColumn({
    name: "paket_id",
    foreignKeyConstraintName: "fk_transaksi_paket_id"
  })
  paket: Paket

  //Many to one relation
  @ManyToOne(() => Kurir, (kurir) => kurir.transaksi)
  @JoinColumn({
    name: "kurir_id",
    foreignKeyConstraintName: "fk_transaksi_kurir_id"
  })
  kurir: Kurir
}
