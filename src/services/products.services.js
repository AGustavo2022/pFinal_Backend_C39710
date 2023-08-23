import { Products } from "../models/products.models.js"
import { productosRepository } from "../repositories/products.repository.js"
import { emailService } from "./email.services.js"



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
            _id: pid
        })
        return buscado
    }

    async getProductsMOngoose(pid) {

        const buscado = await productosRepository.readManyIdMongoose({
            id: pid
        })
        return buscado
    }

    async postProduct (newData, user) {
        const useR = user
        const product = new Products(newData)
        const newProduct = {
            ...product.dto(),
            user: useR.email
        }
        const creado = await productosRepository.create(newProduct)
        return creado
    }

    async putProduct (pid, updatedProduct ) {
        const putProduct = await productosRepository.updateOne({ _id: pid }, updatedProduct)
        return putProduct
    }

    async deleteProduct (pid) {
        const product = await this.getProducts(pid)
        
        const subject = 'Producto Eliminado'
        const usuarioEmail = ` Su Producto se elimino de la db
        id: ${product.id},
        title: ${product.title},
        description: ${product.description},
        price: ${product.price},
        thumbnail: ${product.thumbnail},
        stock: ${product.stock},
        code: ${product.code},
        category: ${product.category},
        status: ${product.status},
        `
        await emailService.send(product.user, usuarioEmail, subject)
        const deleteProduct = await productosRepository.deleteOne({ id: pid }) 
        return deleteProduct   
    }
}

export const productsService = new ProductsService()