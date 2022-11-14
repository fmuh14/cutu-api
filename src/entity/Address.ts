import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
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
}
