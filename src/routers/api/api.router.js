import express, { Router } from 'express'
import { productsRouter } from './products.router.js'
import {cartsRouter} from './carts.router.js'
import { usersRouter as usersRouter} from './users.router.js'
import { sessionRouter } from './session.router.js'
import { manejoDeErroresRest} from '../../middleware/manejosDeErrorresRest.js'

export const apiRouter = Router()

apiRouter.use(express.json())
apiRouter.use(express.urlencoded({ extended: true }))
apiRouter.use(express.static('./public'))

apiRouter.use(manejoDeErroresRest)

apiRouter.use('/products', productsRouter)
apiRouter.use('/carts', cartsRouter)

apiRouter.use('/users', usersRouter)
apiRouter.use('/session', sessionRouter)

