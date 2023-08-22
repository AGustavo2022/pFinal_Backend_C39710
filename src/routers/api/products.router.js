import { Router } from "express"
import * as productsController from '../../controllers/products.controller.js'
import { isCheckRol } from "../../middleware/authentication.js"

export const productsRouter = Router()

productsRouter.get('/:id?', productsController.handleGet)   

productsRouter.post('/',isCheckRol, productsController.handlePost)

productsRouter.put('/:id',isCheckRol, productsController.handlePut)

productsRouter.delete('/:id',isCheckRol, productsController.handleDelete)