import "reflect-metadata"
import { DataSource } from "typeorm"
import { Address } from "./entity/Address"
import { Kecamatan } from "./entity/Kecamatan"
import { Kelurahan } from "./entity/Kelurahan"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "cutu",
  synchronize: true,
  logging: false,
  entities: [User, Address, Kecamatan, Kelurahan],
  migrations: [],
  subscribers: [],
})
