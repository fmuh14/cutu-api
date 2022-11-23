import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"

@Entity()
export class Paket {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nama: String

  @Column()
  detail: String

  @Column()
  harga: number
}