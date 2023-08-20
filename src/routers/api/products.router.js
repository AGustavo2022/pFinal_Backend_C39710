import { Router } from "express"
import * as productsController from '../../controllers/products.controller.js'
import { isAdmin, isAuthenticated } from "../../middleware/authentication.js"

export const productsRouter = Router()

productsRouter.get('/:id?', productsController.handleGet)   

productsRouter.post('/',productsController.handlePost)

productsRouter.put('/:id',productsController.handlePut)

productsRouter.delete('/:id',productsController.handleDelete)