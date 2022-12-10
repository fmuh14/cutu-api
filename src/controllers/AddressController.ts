import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { AppDataSource } from "../config/data-source"
import { Address } from "../entity/Address"
import { Kecamatan } from "../entity/Kecamatan"
import { Kelurahan } from "../entity/Kelurahan"
import { DataSource } from "typeorm"

export class AddressController {

  private userRepository = AppDataSource.getRepository(User)
  private addressRepository = AppDataSource.getRepository(Address)
  private kecamatanRepository = AppDataSource.getRepository(Kecamatan)
  private kelurahanRepository = AppDataSource.getRepository(Kelurahan)

  async addAddress(req: Request, res: Response, next: NextFunction) {
    const user = await this.userRepository.findOneBy({
      id: req.body.user_id,
    })

    const address = new Address()
    address.user = user
    address.label = req.body.label
    address.name = req.body.name
    address.phone_number = req.body.phone_number
    address.kelurahan = req.body.kelurahan
    address.kecamatan = req.body.kecamatan
    address.address = req.body.address

    await this.addressRepository.save(address)

    return res.status(200).send({
      message: "Address Berhasil Ditambahkan."
    });

  }

  async getAddress(req: Request, res: Response, next: NextFunction) {
    const user = await this.userRepository.findOne({
      where: {
        id: req.params.user_id,
      },
      relations: {
        address: true,
      },
    })

    const address = user.address
    // if (address.length == 0) {
    //   return res.status(401).send({
    //     message: "Anda belum memiliki Alamat, silahkan tambahkan alamat!"
    //   });
    // }

    return res.status(200).send(address)
  }

  async getKecamatanKelurahan(req: Request, res: Response, next: NextFunction) {
    const kecamatan = await this.kecamatanRepository.find({
      order: {
        name: "ASC",
      }
    })
    const kelurahan = await this.kelurahanRepository.find({
      order: {
        kecamatan_id: "ASC",
      }
    })

    return res.status(200).send({
      kecamatan: kecamatan,
      kelurahan: kelurahan
    })
  }

  async getAddressById(req: Request, res: Response, next: NextFunction) {
    const address = await this.addressRepository.findOneBy({
      id: req.params.address_id,
    })

    return res.status(200).send(address)
  }

  async updateAddress(req: Request, res: Response, next: NextFunction) {
    const address = await this.addressRepository.findOneBy({
      id: req.body.address_id
    })

    address.label = req.body.label
    address.name = req.body.name
    address.phone_number = req.body.phone_number
    address.kecamatan = req.body.kecamatan
    address.kelurahan = req.body.kelurahan
    address.address = req.body.address

    await this.addressRepository.save(address)

    return res.status(200).send({
      message: "Alamat Berhasil Diubah."
    });
  }

  async deleteAddress(req: Request, res: Response, next: NextFunction) {
    const address = await this.addressRepository.findOneBy({
      id: req.body.address_id
    })

    await this.addressRepository.remove(address)

    return res.status(200).send({
      message: "Alamat Berhasil Dihapus."
    });
  }
}

