import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { AppDataSource } from "../config/data-source"
import { Address } from "../entity/Address"
import { Transaksi } from "../entity/Transaksi"
import { Kurir } from "../entity/Kurir"
import { Paket } from "../entity/Paket"
import { customAlphabet } from 'nanoid'
import { invoice } from "../utils/payment-gateway"
import 'dotenv/config'


export class TransaksiController {

  private transaksiRepository = AppDataSource.getRepository(Transaksi)
  private userRepository = AppDataSource.getRepository(User)
  private addressRepository = AppDataSource.getRepository(Address)
  private kurirRepository = AppDataSource.getRepository(Kurir)
  private PaketRepository = AppDataSource.getRepository(Paket)

  async addTransaksi(req: Request, res: Response, next: NextFunction) {
    const user = await this.userRepository.findOneBy({
      id: req.body.user_id,
    })

    const paket = await this.PaketRepository.findOneBy({
      id: req.body.paket_id
    })

    const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)
    const transaksi = new Transaksi()
    transaksi.id = nanoid()
    transaksi.user = user
    transaksi.paket = paket
    transaksi.metode_pembayaran = req.body.metode_pembayaran
    transaksi.metode_pemesanan = req.body.metode_pemesanan

    if (transaksi.metode_pemesanan == "store") {
      transaksi.ongkir = 0
      transaksi.total_harga = transaksi.ongkir + paket.price
    }
    else if (transaksi.metode_pemesanan == "delivery") {
      const address = await this.addressRepository.findOneBy({
        id: req.body.address_id
      })

      if (transaksi.metode_pembayaran == "cash") {
        const kurir = await this.kurirRepository.createQueryBuilder('kurir')
          .select()
          .where({
            is_ready: 1,
          })
          .orderBy('RAND()')
          .getOne();

        if (!kurir) {
          transaksi.status = "Menunggu Kurir"
        } else {
          transaksi.kurir = kurir
          kurir.is_ready = false
          await this.kurirRepository.save(kurir)
        }
      }

      transaksi.address = address
      transaksi.ongkir = parseInt(req.body.ongkir)
      transaksi.total_harga = transaksi.ongkir + paket.price
    }

    if (transaksi.metode_pembayaran == "cash") {
      if (!transaksi.status) {
        transaksi.status = "Diproses"
      }
      transaksi.status_bayar = false

      await this.transaksiRepository.save(transaksi)

      return res.status(200).send({
        message: "Transaksi Diproses."
      });
    }
    else if (transaksi.metode_pembayaran == "invoice") {
      transaksi.status = "Menunggu Pembayaran"
      transaksi.status_bayar = false


      const invoiceTransaksi = await invoice.createInvoice({
        externalID: transaksi.id,
        amount: transaksi.total_harga,
        description: 'Invoice for Transaction #' + transaksi.id,
        invoice_duration: 300,
        items: [{
          name: 'Paket ' + paket.name,
          quantity: 1,
          price: transaksi.total_harga
        }]
      })

      transaksi.invoice_id = invoiceTransaksi.id

      await this.transaksiRepository.save(transaksi)

      return res.status(200).send({
        message: "Transaksi Diproses.",
        invoice: invoiceTransaksi.invoice_url
      });
    }
  }

  async paymentCallback(req: Request, res: Response, next: NextFunction) {
    const callbackToken = req.get(`x-callback-token`)
    console.log(callbackToken)

    if (callbackToken === process.env.XENDIT_CALLBACKTOKEN) {
      res.status(200).send();
      const paymentInfo = req.body
      console.log(paymentInfo)
      if (paymentInfo.status == "PAID") {
        const transaksi = await this.transaksiRepository.findOneBy({
          id: paymentInfo.external_id
        })

        const kurir = await this.kurirRepository.createQueryBuilder('kurir')
          .select()
          .where({
            is_ready: 1,
          })
          .orderBy('RAND()')
          .getOne();

        if (!kurir) {
          transaksi.status = "Menunggu Kurir"
        } else {
          transaksi.status = "Diproses"
          transaksi.kurir = kurir
          kurir.is_ready = false
          await this.kurirRepository.save(kurir)
        }
        transaksi.status_bayar = true

        await this.transaksiRepository.save(transaksi)

      } else if (paymentInfo.status == "EXPIRED") {
        await this.transaksiRepository
          .createQueryBuilder('transaksi')
          .delete()
          .from(Transaksi)
          .where({
            id: paymentInfo.external_id
          })
          .execute()
      }
    } else {
      return res.status(401).send();
    }

  }

  async deleteTransaksi(req: Request, res: Response, next: NextFunction) {
    const deletedTransaksi = await this.transaksiRepository.findOneBy({
      id: req.body.transaksi_id
    })

    const resp = await invoice.expireInvoice({
      invoiceID: deletedTransaksi.invoice_id,
    });

    await this.transaksiRepository.remove(deletedTransaksi)

    res.status(200).send({
      message: "Transaksi Dibatalkan.",
    });
  }

  async getAllTransaksi(req: Request, res: Response, next: NextFunction) {
    const transaksi = await this.transaksiRepository.find()

    res.status(200).send({
      message: "Request berhasil",
      transaksi: transaksi
    });
  }

  async getAllTransaksiByUser(req: Request, res: Response, next: NextFunction) {

    const transaksi = await this.transaksiRepository
      .createQueryBuilder('transaksi')
      .leftJoinAndSelect("transaksi.paket", "paket")
      .where("transaksi.user_id = :id", {
        id: req.params.user_id,
      })
      .orderBy("tanggal_pemesanan", "DESC")
      .getMany()


    const listTransaksi = []

    transaksi.forEach(transaksi => {
      const data = {
        id: transaksi.id,
        paket: transaksi.paket.name,
        status: transaksi.status,
        metode_pengerjaan: transaksi.metode_pemesanan
      }
      listTransaksi.push(data)
    });

    res.status(200).send(listTransaksi);
  }

  async getTransaksi(req: Request, res: Response, next: NextFunction) {
    const transaksi = await this.transaksiRepository.findOne({
      where: {
        id: req.params.transaksi_id,
      },
      relations: {
        user: true,
        address: true,
        paket: true,
        kurir: true
      }
    })

    const detailTransaksi = {
      id: transaksi.id,
      tanggal_pemesanan: transaksi.tanggal_pemesanan.toLocaleString(),
      status: transaksi.status,
      metode_pemesanan: transaksi.metode_pemesanan,
      metode_pembayaran: transaksi.metode_pembayaran,
      ongkir: transaksi.ongkir,
      total_harga: transaksi.total_harga,
      nama_paket: transaksi.paket.name,
      harga_paket: transaksi.paket.price,
      nama: transaksi.user.name,
      phone_number: transaksi.user.phone_number,
      invoice: transaksi.invoice_id,
    }

    if (detailTransaksi.metode_pemesanan == "delivery") {
      detailTransaksi.phone_number = transaksi.address.phone_number
      detailTransaksi.nama = transaksi.address.name
      detailTransaksi["address"] = `${transaksi.address.address}, Kelurahan ${transaksi.address.kelurahan}, ${transaksi.address.kecamatan}`
      if (transaksi.kurir) {
        detailTransaksi["nama_kurir"] = transaksi.kurir.name
        detailTransaksi["phone_number_kurir"] = transaksi.kurir.phone_number
      }
    }

    res.status(200).send(detailTransaksi);
  }

  async getInvoiceURL(req: Request, res: Response, next: NextFunction) {
    const invoice_id = req.params.invoice_id

    const invoiceDetail = await invoice.getInvoice({
      invoiceID: invoice_id,
    });

    res.status(200).send({
      invoice: invoiceDetail.invoice_url
    });
  }
}