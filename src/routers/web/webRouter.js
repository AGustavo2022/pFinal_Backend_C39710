import express, { Router } from "express"
import * as viewsController from "../../controllers/views.controller.js"
import { isAdmin, isAuthenticated } from "../../middleware/authentication.js"
import { manejoDeErroresWeb } from "../../middleware/manejosDeErrorresRest.js"


export const webRouter = Router()

webRouter.use(express.json())
webRouter.use(express.urlencoded({ extended: true }))
webRouter.use(express.static('./public'))

webRouter.get('/', (req, res) => {
    res.redirect('/login')
  })

webRouter.get('/login', viewsController.handleLogin)
webRouter.get('/register', viewsController.handleRegister)
webRouter.get('/products', isAuthenticated, viewsController.handleProducts)
webRouter.get('/cart/:cid', isAuthenticated, viewsController.handleCarts)
webRouter.get('/admin', isAdmin, viewsController.handleUsers)

webRouter.use(manejoDeErroresWeb)
