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
  method: "get",
  route: "/api/user/:user_id/transaksi",
  controller: TransaksiController,
  action: "getAllTransaksiByUser"
},
{
  method: "post",
  route: "/api/address",
  controller: AddressController,
  action: "addAddress"
},
{
  method: "get",
  route: "/api/address/kecamatankelurahan",
  controller: AddressController,
  action: "getKecamatanKelurahan"
},
{
  method: "post",
  route: "/api/address/update",
  controller: AddressController,
  action: "updateAddress"
},
{
  method: "post",
  route: "/api/address/delete",
  controller: AddressController,
  action: "deleteAddress"
},
{
  method: "get",
  route: "/api/address/id/:address_id",
  controller: AddressController,
  action: "getAddressById"
},
{
  method: "get",
  route: "/api/address/:user_id",
  controller: AddressController,
  action: "getAddress"
},
{
  method: "get",
  route: "/api/payment/:invoice_id/link",
  controller: TransaksiController,
  action: "getInvoiceURL"
},
{
  method: "post",
  route: "/api/payment/callback",
  controller: TransaksiController,
  action: "paymentCallback"
},
{
  method: "get",
  route: "/api/admin/transaksi",
  controller: TransaksiController,
  action: "getAllTransaksi"
},
{
  method: "post",
  route: "/api/transaksi/delete",
  controller: TransaksiController,
  action: "deleteTransaksi"
},
{
  method: "post",
  route: "/api/transaksi/add",
  controller: TransaksiController,
  action: "addTransaksi"
},
{
  method: "get",
  route: "/api/transaksi/:transaksi_id",
  controller: TransaksiController,
  action: "getTransaksi"
},
]