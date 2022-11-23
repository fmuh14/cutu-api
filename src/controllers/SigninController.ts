import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { AppDataSource } from "../config/data-source"

export class SigninController {

  private userRepository = AppDataSource.getRepository(User)

  async signin(req: Request, res: Response, next: NextFunction) {
    const user = await this.userRepository.findOneBy({
      email: req.body.email,
    })

    if (!user) {
      return res.status(401).send({
        message: "Invalid Username or Password!"
      });
    }

    if (user.password === req.body.password) {
      return res.status(200).send({
        message: "Login Berhasil!",
        user: user,
      }
      )
    } else {
      return res.status(401).send({
        message: "Invalid Username or Password!"
      });
    }
  }

}