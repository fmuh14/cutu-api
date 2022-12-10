import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { AppDataSource } from "../config/data-source"
import { validateEmail, validatePassword, validatePasswordLength, validatePhoneNumber } from "../utils/validation"
import { customAlphabet } from "nanoid"

export class UserController {

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
        user_id: user.id,
      }
      )
    } else {
      return res.status(401).send({
        message: "Invalid Username or Password!"
      });
    }
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    if (validateEmail(req.body.email)) {
      return res.status(401).send({
        message: "Email tidak valid."
      });
    }

    if (validatePhoneNumber(req.body.phone_number)) {
      return res.status(401).send({
        message: "Nohp tidak valid."
      });
    }

    if (validatePasswordLength(req.body.password)) {
      return res.status(401).send({
        message: "Password minimal harus diantara 8-16 karakter."
      });
    }

    if (validatePassword(req.body.password)) {
      return res.status(401).send({
        message: "Password harus memiliki angka."
      });
    }

    const verifEmail = await this.userRepository.findOneBy({
      email: req.body.email,
    })

    if (verifEmail) {
      return res.status(401).send({
        message: "Email telah digunakan."
      });
    }

    const verifNohp = await this.userRepository.findOneBy({
      phone_number: req.body.phone_number,
    })

    if (verifNohp) {
      return res.status(401).send({
        message: "Nomor HP telah digunakan."
      });
    }

    const user = new User()
    user.name = req.body.name
    user.email = req.body.email
    user.password = req.body.password
    user.phone_number = req.body.phone_number

    await this.userRepository.save(user)

    return res.status(200).send({
      message: "Daftar Sukses."
    });

  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    const userProfile = await this.userRepository.findOne({
      select: {
        name: true,
        email: true,
        phone_number: true,
      },
      where: {
        id: req.params.user_id,
      }
    })

    if (userProfile) {
      return res.status(200).send(userProfile);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    if (validateEmail(req.body.email)) {
      return res.status(401).send({
        message: "Email tidak valid."
      });
    }

    if (validatePhoneNumber(req.body.phone_number)) {
      return res.status(401).send({
        message: "Nohp tidak valid."
      });
    }

    const user = await this.userRepository.findOneBy({
      id: req.params.user_id,
    })

    user.name = req.body.name

    if (user.email !== req.body.email) {
      const verifEmail = await this.userRepository.findOneBy({
        email: req.body.email,
      })

      if (verifEmail) {
        return res.status(401).send({
          message: "Email telah digunakan di akun lain!"
        });
      }

      user.email = req.body.email
    }

    if (user.phone_number !== req.body.phone_number) {
      const verifNohp = await this.userRepository.findOneBy({
        phone_number: req.body.phone_number,
      })

      if (verifNohp) {
        return res.status(401).send({
          message: "Nomor HP telah digunakan di akun lain!"
        });
      }

      user.phone_number = req.body.phone_number
    }

    await this.userRepository.save(user)

    return res.status(200).send({
      message: "Profile berhasil di update."
    });
  }

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    const user = await this.userRepository.findOneBy({
      id: req.params.user_id,
    })

    if (user.password === req.body.old_password) {
      if (validatePasswordLength(req.body.new_password)) {
        return res.status(401).send({
          message: "Password minimal harus diantara 8-16 karakter"
        });
      }
      if (validatePassword(req.body.new_password)) {
        return res.status(401).send({
          message: "Password harus memiliki angka"
        });
      }

      user.password = req.body.new_password

      await this.userRepository.save(user)

      return res.status(200).send({
        message: "Password berhasil di update."
      });
    } else {
      return res.status(401).send({
        message: "Password lama anda salah!"
      });
    }
  }

}