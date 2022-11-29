import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { Kecamatan } from "./Kecamatan"
import { Kelurahan } from "./Kelurahan"
import { Transaksi } from "./Transaksi"
import { User } from "./User"

@Entity()
export class Address {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  label: string

  @Column()
  name: string

  @Column()
  phone_number: string

  @Column()
  kecamatan: string

  @Column()
  kelurahan: string

  @Column()
  address: string

  //Many to one relation
  @ManyToOne(() => User, (user) => user.address)
  @JoinColumn({
    name: "user_id",
    foreignKeyConstraintName: "fk_user_id"
  })
  user: User

  // //Many to one relation
  // @ManyToOne(() => Kecamatan, (kecamatan) => kecamatan.address)
  // @JoinColumn({
  //   name: "kecamatan_id",
  //   foreignKeyConstraintName: "fk_kecamatan_id"
  // })
  // kecamatan: Kecamatan

  // //Many to one relation
  // @ManyToOne(() => Kelurahan, (kelurahan) => kelurahan.address)
  // @JoinColumn({
  //   name: "kelurahan_id",
  //   foreignKeyConstraintName: "fk_kelurahan_id"
  // })
  // kelurahan: Kelurahan

  //One to Many relation
  @OneToMany(() => Transaksi, (transaksi) => transaksi.address)
  transaksi: Transaksi[]
}
