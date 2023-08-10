import { productosDaoMongoose } from "../daos/products.dao.mongoose.js"
import { GenericRepository } from "./generic.repository.js"


class ProductosRepository extends GenericRepository {
    constructor(dao) { super(dao) }
    readManyByIds(ids) {
      return Promise.all(ids.map(id => this.dao.readOne({ id })))
    }
  }
  
  export const productosRepository = new ProductosRepository(productosDaoMongoose)