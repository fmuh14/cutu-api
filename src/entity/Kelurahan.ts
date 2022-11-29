import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { Address } from "./Address"
import { Kecamatan } from "./Kecamatan"

@Entity()
export class Kelurahan {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  //Many to one relation
  @ManyToOne(() => Kecamatan, (kecamatan) => kecamatan.kelurahan)
  @JoinColumn({
    name: "kecamatan_id",
    foreignKeyConstraintName: "fk_kecamatan_id"
  })
  kecamatan: Kecamatan

  // //One to Many relation
  // @OneToMany(() => Address, (address) => address.kelurahan)
  // address: Address[]
}