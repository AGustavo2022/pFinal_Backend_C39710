import { Router } from "express"
import * as userController from "../../controllers/users.controller.js"


export const usersRouter = Router()

usersRouter.get('/:id?', userController.handleGet)

usersRouter.post('/', userController.handlePost)