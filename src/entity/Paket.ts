import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"

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
}