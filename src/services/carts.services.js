import {
    Carts
} from "../models/carts.models.js"
import {
    cartsRepository
} from "../repositories/carts.repository.js"
//import {Ticket} from "../models/tickets.models.js"
import {
    productsService
} from "./products.services.js"
import {
    ticketService
} from "./tickets.services.js"
import {
    usersService
} from "./users.services.js"




class CartsService {

    constructor() {}

    async getCarts(cid) {
        if (cid != undefined) {
            const buscado = await cartsRepository.readOne({
                id: cid
            })
            return buscado
        } else {
            const carts = await cartsRepository.readMany()
            return carts
        }
    }

    async getCartsMongoose(cid) {
        const buscado = await cartsRepository.readManyIdMongoose({
            _id: cid
        })
        return buscado
    }

    async postCarts(newData) {
        const cart = new Carts(newData)
        const creado = await cartsRepository.createIdMongoose(cart.dto())
        return creado
    }

    async deleteCart(cid) {

        const [cart] = await cartsService.getCarts(cid)

        const deleteCart = await cartsRepository.updateOne({
            id: cart.id
        }, {
            $pull: {
                productsCart: {}
            }
        }, {
            new: true
        })
        return deleteCart
    }

    async deleteCartProduct(cid, pid) {
        const [idProduct] = await productsService.getProductsMongoose(pid)

        const deleteCartProduct = await cartsRepository.updateOne({
            id: cid
        }, {
            $pull: {
                productsCart: {
                    product: idProduct._id,
                }
            }
        }, {
            new: true
        })
        return deleteCartProduct
    }

    async putCart(cid, updatedCart) {
        const putCart = await cartsRepository.updateOne({
            id: cid
        }, updatedCart)
        return putCart
    }

    async putCartQty(cid, pid, qty) {

        const carts = await cartsService.getCarts(cid)
        const [product] = await productsService.getProductsMongoose(pid)
        const indice = carts.productsCart.findIndex(p => p.product.toString() == product._id.toString())
        const newQuantity = qty
        const qtY = parseInt(Object.values(newQuantity))

        const updatedCart = {
            $set: {
                [`productsCart.${indice}.quantity`]: qtY
            }
        }

        const putCart = cartsService.putCart(cid, updatedCart)

        return putCart

    }

    async agregarAlCarrito(idCart, idProduct) {

        const carts = await cartsService.getCarts(idCart)

        if (!carts) throw new Error('No se puede agregar al carrito: CARRITO no encontrado')

        const [product] = await productsService.getProductsMOngoose(idProduct)

        if (!product) throw new Error('No se puede agregar al carrito: PRODUCTO no encontrado')

        const existe = carts.productsCart.find(p => p.product.toString() === product._id.toString())

        if (existe === undefined) {

            const updatedCart = {
                $push: {
                    productsCart: [{
                        product: product._id,
                        quantity: 1
                    }]
                }
            }

            cartsService.putCart(idCart, updatedCart)

            return 'Producto Nuevo'

        } else {

            const indice = carts.productsCart.findIndex(p => p.product.toString() == product._id.toString())

            const newQuantity = carts.productsCart[indice].quantity + 1

            const updatedCart = {
                $set: {
                    [`productsCart.${indice}.quantity`]: newQuantity
                }
            }

            cartsService.putCart(idCart, updatedCart)

        }
        return 'Producto Agregado'
    }

    async generarTickets(idCart) {

        const [carts] = await cartsRepository.readManyIdMongoose({id: idCart})
        if (!carts) throw new Error('No se puede agregar al carrito: CARRITO no encontrado')

        const productArrayCarts = []
        const ticketsCompraConStock = []
        const ticketsCompraSinStock = []
        let amount = 0


        for (const e of carts.productsCart) {
   
            const [product] = await productsService.getProductsMongoose(e.product)

            const indice = carts.productsCart.findIndex(p => p.product.toString() == product._id.toString())

            const productTickets = {
                ...product,
                quantity: carts.productsCart[indice].quantity,
                subTotal: product.price * carts.productsCart[indice].quantity

            }

            productArrayCarts.push(productTickets)
        }

        for (const e of productArrayCarts) {

            if (e.stock >= e.quantity) {

                const idMongoose = e._id

                const stockNew = e.stock - e.quantity

                const updatedProduct = {
                    $set: {
                        stock: stockNew
                    }
                }
    
                productsService.putProduct(idMongoose,updatedProduct)

                const newProduct = {
                    _id: e._id,
                    id: e.id,
                    title: e.title,
                    description: e.description,
                    price: e.price,
                    thumbnail: e.thumbnail,
                    stock: stockNew,
                    code: e.code,
                    category: e.category,
                    status: e.status,
                    quantity: e.quantity,
                    subTotal: e.subTotal
                }

                ticketsCompraConStock.push(newProduct)

            } else {

                const productSinStock = {
                    id: e.id
                }
                ticketsCompraSinStock.push(productSinStock)

            }
        }

        for (const e of ticketsCompraConStock) {

            amount += e.subTotal

        }

        const [usuario] = await usersService.getUserMongoose(carts._id)

        const ticketData = {
                amount: amount,
                purchaser: usuario._id
            }

        const ticket = await ticketService.postTicket(ticketData)

        for (const e of ticketsCompraConStock){

            await cartsService.deleteCartProduct(carts.id, e._id)
        }

        //return [ticket, ticketsCompraSinStock]
        
        return ticket
    }
}
export const cartsService = new CartsService()




// if (ticketsCompraConStock.length > 0) {
//     for (const e of ticketsCompraConStock) {
//         amount += e.subTotal;
//     }

//     const [usuario] = await usersService.getUserMongoose(carts._id);

//     const ticketData = {
//         amount: amount,
//         purchaser: usuario._id
//     };

//     const ticket = await ticketService.postTicket(ticketData);

//     for (const e of ticketsCompraConStock) {
//         await cartsService.deleteCartProduct(carts.id, e._id);
//     }

//     return [ticket];
// } else {
//     return [];
// }

// Después de generar los arrays ticketsCompraConStock y ticketsCompraSinStock

// if (ticketsCompraConStock.length > 0) {
//     for (const e of ticketsCompraConStock) {
//         amount += e.subTotal;
//     }

//     const [usuario] = await usersService.getUserMongoose(carts._id);

//     const ticketData = {
//         amount: amount,
//         purchaser: usuario._id
//     };

//     const ticket = await ticketService.postTicket(ticketData);

//     for (const e of ticketsCompraConStock) {
//         await cartsService.deleteCartProduct(carts.id, e._id);
//     }

//     return [ticket, ticketsCompraSinStock];
//     } else {
//     for (const e of ticketsCompraConStock) {
//         amount += e.subTotal;
//     }

//     const [usuario] = await usersService.getUserMongoose(carts._id);

//     const ticketData = {
//         amount: amount,
//         purchaser: usuario._id
//     };

//     const ticket = await ticketService.postTicket(ticketData);

//     console.log(ticket)
//     return [ticket];
//     }


//     for (const e of ticketsCompraConStock) {

//         amount += e.subTotal

//     }

//     const [usuario] = await usersService.getUserMongoose(carts._id)

//     const ticketData = {
//         amount: amount,
//         purchaser: usuario._id
//     }


//     const ticket = await ticketService.postTicket(ticketData)

//     for (const e of ticketsCompraConStock){

//         await cartsService.deleteCartProduct(carts.id, e._id)
//     }

//     return [ticket, ticketsCompraSinStock]