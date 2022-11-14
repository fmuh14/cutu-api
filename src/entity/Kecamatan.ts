import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"
import { Kelurahan } from "./Kelurahan"

@Entity()
export class Kecamatan {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  //One to Many relation
  @OneToMany(() => Kelurahan, (kelurahan) => kelurahan.kecamatan)
  kelurahan: Kelurahan
}