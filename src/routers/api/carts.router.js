import { Router } from 'express'
import { isAuthenticated } from "../../middleware/authentication.js"
import * as cartsController from '../../controllers/carts.controller.js'

export const cartsRouter = Router()

cartsRouter.get('/:id?', cartsController.handleGet)
//cartsRouter.post('/', cartsController.handlePost)
cartsRouter.delete('/:id', cartsController.handleDelete)
cartsRouter.post('/:cid/product/:pid', cartsController.handlePostProduct)
cartsRouter.put('/:cid/product/:pid', cartsController.handlePut)
cartsRouter.delete('/:cid/product/:pid', cartsController.handleDelete)
cartsRouter.post('/:cid/purchase', cartsController.handlePostPurchase)

