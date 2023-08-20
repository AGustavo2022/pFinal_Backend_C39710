import { Router } from "express"
import * as sessionController from "../../controllers/session.controller.js"
import { isAuthenticated } from "../../middleware/authentication.js"


export const sessionRouter = Router()

sessionRouter.get('/current', sessionController.handleCurrent)
sessionRouter.post('/', sessionController.handlePost)
sessionRouter.delete('/', sessionController.handleDelete)
