import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {

  // console.log("Inserting a new user into the database...")
  // const user = new User()
  // user.id = "USER-001"
  // user.name = "Saw"
  // user.email = "saw@gmail.com"
  // user.password = "1234"
  // user.phone_number = "0812391343"
  // await AppDataSource.manager.save(user)
  // console.log("Saved a new user with id: " + user.id)


  console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
