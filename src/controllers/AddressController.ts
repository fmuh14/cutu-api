import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { AppDataSource } from "../config/data-source"
import { Address } from "../entity/Address"

export class AddressController {

  private userRepository = AppDataSource.getRepository(User)
  private addressRepository = AppDataSource.getRepository(Address)

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
    if (address.length == 0) {
      return res.status(401).send({
        message: "Anda belum memiliki Alamat, silahkan tambahkan alamat!"
      });
    }

    return res.status(200).send(address)
  }
}