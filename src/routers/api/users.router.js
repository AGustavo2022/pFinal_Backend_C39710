import { Router } from "express"
import * as userController from "../../controllers/users.controller.js"
import { isAdmin } from "../../middleware/authentication.js"


export const usersRouter = Router()

usersRouter.get('/:id?', userController.handleGet)

usersRouter.post('/', userController.handlePost)

usersRouter.put('/:id?', isAdmin, userController.handlePut)

usersRouter.delete('/', isAdmin ,userController.handleDelete)