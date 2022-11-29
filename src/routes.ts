import { AddressController } from "./controllers/AddressController"
import { PaketController } from "./controllers/PaketController"
import { TransaksiController } from "./controllers/TransaksiController"
import { UserController } from "./controllers/UserController"


export const Routes = [{
  method: "post",
  route: "/api/signin",
  controller: UserController,
  action: "signin"
},
{
  method: "post",
  route: "/api/signup",
  controller: UserController,
  action: "signup"
},
{
  method: "get",
  route: "/api/paket",
  controller: PaketController,
  action: "getPaket"
},
{
  method: "get",
  route: "/api/user/:user_id",
  controller: UserController,
  action: "getProfile"
},
{
  method: "post",
  route: "/api/user/:user_id/updatepassword",
  controller: UserController,
  action: "updatePassword"
},
{
  method: "post",
  route: "/api/user/:user_id/updateprofile",
  controller: UserController,
  action: "updateProfile"
},
{
  method: "post",
  route: "/api/:user_id/transaksi",
  controller: TransaksiController,
  action: "addTransaksi"
},
{
  method: "post",
  route: "/api/address",
  controller: AddressController,
  action: "addAddress"
},
{
  method: "get",
  route: "/api/address/:user_id",
  controller: AddressController,
  action: "getAddress"
},
]