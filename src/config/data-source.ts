import "reflect-metadata"
import { DataSource } from "typeorm"
import { Address } from "../entity/Address"
import { Kecamatan } from "../entity/Kecamatan"
import { Kelurahan } from "../entity/Kelurahan"
import { Paket } from "../entity/Paket"
import { User } from "../entity/User"
import { Kurir } from "../entity/Kurir"
import 'dotenv/config'
import { Transaksi } from "../entity/Transaksi"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Address, Kecamatan, Kelurahan, Paket, Kurir, Transaksi],
  migrations: [],
  subscribers: [],
})
