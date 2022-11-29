import * as express from "express"
import { Request, Response, NextFunction } from "express"
import * as cors from 'cors';
import { AppDataSource } from "./config/data-source";
import { Routes } from "./routes"
import 'dotenv/config'

AppDataSource.initialize().then(async () => {
  const app = express();

  let corsOptions = {
    origin: 'http://localhost:8081'
  };

  app.use(cors(corsOptions));

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "welcome to CuTu API." });
  });

  // register express routes from defined application routes
  Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
      (new (route.controller as any))[route.action](req, res, next)
    })
  })

  //set port, listen for requests
  const PORT = process.env.PORT || 8080;
  app.listen(process.env.PORT, () => {
    console.log(`running on ${process.env.PORT}`)
  });

}).catch(error => console.log(error))
