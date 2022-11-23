import { PaketController } from "./controllers/PaketController"
import { SigninController } from "./controllers/SigninController"
import { SignupController } from "./controllers/SignupController"


export const Routes = [{
  method: "post",
  route: "/api/signin",
  controller: SigninController,
  action: "signin"
}, {
  method: "post",
  route: "/api/signup",
  controller: SignupController,
  action: "signup"
}, {
  method: "get",
  route: "/api/paket",
  controller: PaketController,
  action: "getPaket"
}]