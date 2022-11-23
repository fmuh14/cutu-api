import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { AppDataSource } from "../config/data-source"

export class SignupController {

  private userRepository = AppDataSource.getRepository(User)

  async signup(req: Request, res: Response, next: NextFunction) {
    const verifEmail = await this.userRepository.findOneBy({
      email: req.body.email,
    })

    if (verifEmail) {
      return res.status(401).send({
        message: "Email telah digunakan!"
      });
    }

    const verifNohp = await this.userRepository.findOneBy({
      phone_number: req.body.phone_number,
    })

    if (verifNohp) {
      return res.status(401).send({
        message: "Nomor HP telah digunakan!"
      });
    }

    let regularExpression = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,16}$/
    let minPasswordofChars = 8;
    let maxPasswordofChars = 16;
    const verifPassword = req.body.password
    if (verifPassword.length < minPasswordofChars || verifPassword.length > maxPasswordofChars) {
      return res.status(401).send({
        message: "Password minimal harus diantara 8-16 karakter"
      });
    }
    if (!regularExpression.test(verifPassword)) {
      return res.status(401).send({
        message: "Password harus memiliki angka"
      });
    }

    const nohp = req.body.phone_number
    let minNumberofChars = 8;
    let maxNumberofChars = 15;
    if (nohp.length < minNumberofChars || nohp.length > maxNumberofChars) {
      return res.status(401).send({
        message: "Nohp"
      });
    }

    const user = new User()
    user.id = "TESTUSER-03"
    user.name = req.body.name
    user.email = req.body.email
    user.password = req.body.password
    user.phone_number = req.body.phone_number

    await this.userRepository.save(user)

    return res.status(200).send({
      message: "Daftar Sukses"
    });

  }

}