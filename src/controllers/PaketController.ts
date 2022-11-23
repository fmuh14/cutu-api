import { NextFunction, Request, Response } from "express"
import { Paket } from "../entity/Paket"
import { AppDataSource } from "../config/data-source"

export class PaketController {

  private PaketRepository = AppDataSource.getRepository(Paket)

  async getPaket(req: Request, res: Response, next: NextFunction) {
    const paket = await this.PaketRepository.find()

    if (paket) {
      return res.status(200).send(paket);
    } else {
      return res.status(500).send({
        message: "eror"
      });
    }
  }
}