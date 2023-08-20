import { cartsModel } from '../daos/carts.dao.mongoose.js'
import { productosDaoMongoose } from '../daos/products.dao.mongoose.js'
import {cartsService} from '../services/carts.services.js'
import { criptografiador } from '../utils/criptografia.js'
import { usersService } from '../services/users.services.js'


export async function handleLogin(req, res, next) {
    res.render('login', {
        titulo: 'Login'
    })
}

export async function handleRegister(req, res, next) {
    res.render('register', {
        titulo: 'Registro'
    })
}

export async function handleProducts(req, res, next) {

    let limit = req.query.limit ?? 5
    let page = req.query.page ?? 1
    let query = req.query.query
    let sort = req.query.sort

    const criterioDeBusqueda = {
        query
    }
    const opcionesDePaginacion = {
        limit,
        page,
        sort,
        lean: true 
    }

    const payload = await productosDaoMongoose.paginateMongoose(criterioDeBusqueda,opcionesDePaginacion)

    const userTocken = await criptografiador.decodificarToken(req['accessToken'])

    const userDate = await usersService.getUserEmail(userTocken.email)
    
    const [userCart] = await cartsService.getCartsMongoose(userDate.cart)

    res.render('products', {

        titulo: 'Products',
        encabezado: 'Lista de Productos',
        hayDocs: payload.docs.length > 0,
        docs: payload.docs,
        limit: payload.limit,
        page: payload.page,
        totalPages: payload.totalPages,
        hasNextPage: payload.hasNextPage,
        nextPage: payload.nextPage,
        hasPrevPage: payload.hasPrevPage,
        prevPage: payload.prevPage,
        pagingCounter: payload.pagingCounter,
        nick: userTocken.first_name,
        role: userDate.role,
        cart: userCart.id
    })

}

export async function handleCarts(req, res, next) {
    
    const userTocken = await criptografiador.decodificarToken(req['accessToken'])
    
    const userDate = await usersService.getUserEmail(userTocken.email)
    
    const [userCart] = await cartsService.getCartsMongoose(userDate.cart)
    
    const query = userCart._id;

    try {
        const myCart = await cartsModel.findOne(query).populate('productsCart.product');
        res.render('carts', {
            titulo: 'Carrito de Compras',
            hayCart: myCart.productsCart.length > 0,
            cart: myCart.id,
            productos: myCart.productsCart.map(item => ({
                productId: item.product.id,
                productTitle: item.product.title,
                productPrice: item.product.price,
                quantity: item.quantity
            }))
        });
    } catch (error) {
        next(error);
    }
}
