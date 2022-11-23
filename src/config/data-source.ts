import "reflect-metadata"
import { DataSource } from "typeorm"
import { Address } from "../entity/Address"
import { Kecamatan } from "../entity/Kecamatan"
import { Kelurahan } from "../entity/Kelurahan"
import { Paket } from "../entity/Paket"
import { User } from "../entity/User"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "103.28.53.75",
  port: 3306,
  username: "fpromyid_cutu",
  password: "Dj#Ekxp;U&%Y",
  database: "fpromyid_cutu",
  synchronize: true,
  logging: false,
  entities: [User, Address, Kecamatan, Kelurahan, Paket],
  migrations: [],
  subscribers: [],
})
