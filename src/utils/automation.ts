import { AppDataSource } from "../config/data-source"
import { Kurir } from "../entity/Kurir";
import { Transaksi } from "../entity/Transaksi"
import { invoice } from "./payment-gateway";

const transaksiRepository = AppDataSource.getRepository(Transaksi)
const kurirRepository = AppDataSource.getRepository(Kurir)

export async function autoExpireInvoice() {
  const transaksiExpired = await transaksiRepository.createQueryBuilder("transaksiExpired")
    .select()
    .where({
      status: "Menunggu Pembayaran"
    })
    .andWhere('tanggal_pemesanan < (NOW() - INTERVAL 5 MINUTE)')
    .getMany()

  if (transaksiExpired.length !== 0) {
    transaksiExpired.forEach(async transaksi => {

      const invoiceCheck = await invoice.getInvoice({
        invoiceID: transaksi.invoice_id,
      })
      // console.log(invoiceCheck)
      if (invoiceCheck.status == "PENDING") {
        const resp = await invoice.expireInvoice({
          invoiceID: transaksi.invoice_id,
        });
      }

      const deletedTransaksi = await transaksiRepository.findOneBy({
        id: transaksi.id
      })

      await transaksiRepository.remove(deletedTransaksi)
      console.log(transaksi.id + " DELETED")
    })
  }
}

export async function addKurir() {
  const kurir = await kurirRepository.createQueryBuilder('kurir')
    .select()
    .where({
      is_ready: 1,
    })
    .orderBy('RAND()')
    .getOne();

  if (kurir) {
    const transaksi = await transaksiRepository.findOne({
      where: {
        status: "Menunggu Kurir",
        kurir: null
      }
    })
    if (transaksi) {
      transaksi.status = "Diproses"
      transaksi.kurir = kurir
      kurir.is_ready = false

      await transaksiRepository.save(transaksi)
    }

    await kurirRepository.save(kurir)
  }
}