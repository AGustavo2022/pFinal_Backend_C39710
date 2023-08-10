import { cartsDaoMongoose } from "../daos/carts.dao.mongoose.js"
import { GenericRepository } from "./generic.repository.js"

export const cartsRepository = new GenericRepository(cartsDaoMongoose)