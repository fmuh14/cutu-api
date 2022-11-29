import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { AppDataSource } from "../config/data-source"
import { Address } from "../entity/Address"
import { Transaksi } from "../entity/Transaksi"
import { Kurir } from "../entity/Kurir"
import { Paket } from "../entity/Paket"
import { customAlphabet } from 'nanoid'

export class TransaksiController {

  private transaksiRepository = AppDataSource.getRepository(Transaksi)
  private userRepository = AppDataSource.getRepository(User)
  private addressRepository = AppDataSource.getRepository(Address)
  private kurirRepository = AppDataSource.getRepository(Kurir)
  private PaketRepository = AppDataSource.getRepository(Paket)

  async addTransaksi(req: Request, res: Response, next: NextFunction) {
    const user = await this.userRepository.findOneBy({
      id: req.params.user_id,
    })

    const address = await this.addressRepository.findOneBy({
      id: req.body.address_id
    })

    const paket = await this.PaketRepository.findOneBy({
      id: req.body.paket_id
    })

    const kurir = await this.kurirRepository.createQueryBuilder('kurir')
      .select()
      .where({
        is_ready: 1,
      })
      .orderBy('RAND()')
      .getOne();

    const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)
    const transaksi = new Transaksi()
    transaksi.id = nanoid()
    transaksi.user = user
    transaksi.address = address
    transaksi.paket = paket
    transaksi.metode_pembayaran = req.body.metode_pembayaran
    transaksi.metode_pemesanan = req.body.metode_pemesanan

    if (transaksi.metode_pemesanan == "store") {
      transaksi.ongkir = 0
      transaksi.total_harga = transaksi.ongkir + paket.price
    }
    else if (transaksi.metode_pemesanan == "delivery") {
      transaksi.ongkir = parseInt(req.body.ongkir)
      transaksi.total_harga = transaksi.ongkir + paket.price
      transaksi.kurir = kurir
    }

    if (transaksi.metode_pembayaran == "cash") {
      transaksi.status = "Diproses"
      transaksi.status_bayar = false
    } else if (transaksi.metode_pembayaran == "mandiri") {
      transaksi.status = "Menunggu Pembayaran"
      transaksi.status_bayar = false
    }

    kurir.is_ready = false
    await this.kurirRepository.save(kurir)
    await this.transaksiRepository.save(transaksi)


    return res.status(200).send({
      message: "Transaksi Diproses."
    });

  }
}