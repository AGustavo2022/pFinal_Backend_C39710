import { Products } from "../models/product.models.js";
import { productosRepository } from "../repositories/products.repository.js";


class ProductsService {
    constructor() {}

    async  getProducts (pid) {

        if (pid != undefined){
            const buscado = await productosRepository.readOne({ id: pid })
            return buscado
        }else{
            const productos = await productosRepository.readMany()
            return productos
        }
    }

    async getProductsMongoose(pid) {

        const buscado = await productosRepository.readManyIdMongoose({
            id: pid
        })
        return buscado
    }

    async postProduct (newData) {
        const product = new Products(newData)
        const creado = await productosRepository.create(product.dto())
        return creado
    }

    async putProduct (pid, updatedProduct ) {
        const putProduct = await productosRepository.updateOne({ _id: pid }, updatedProduct)
        return putProduct
    }

    async deleteProduct (pid) {
        const deleteProduct = await productosRepository.deleteOne({ id: pid }) 
        return deleteProduct   
    }
}

export const productsService = new ProductsService()