import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"
import { Address } from "./Address"
import { Kelurahan } from "./Kelurahan"

@Entity()
export class Kecamatan {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  //One to Many relation
  @OneToMany(() => Kelurahan, (kelurahan) => kelurahan.kecamatan)
  kelurahan: Kelurahan[]

  // //One to Many relation
  // @OneToMany(() => Address, (address) => address.kecamatan)
  // address: Address[]
}