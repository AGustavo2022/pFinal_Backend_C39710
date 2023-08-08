import { Router } from "express"
import * as productsController from '../../controllers/products.controller.js'
import { isAdmin, isAuthenticated } from "../../middleware/authentication.js"

export const productsRouter = Router()

productsRouter.get('/:id?', isAuthenticated, isAdmin, productsController.handleGet)   

productsRouter.post('/', isAuthenticated, isAdmin,productsController.handlePost)

productsRouter.put('/:id', isAuthenticated, isAdmin,productsController.handlePut)

productsRouter.delete('/:id', isAuthenticated, isAdmin,productsController.handleDelete)