import express from 'express'
import { engine } from 'express-handlebars'
import { apiRouter } from '../routers/api/api.router.js'


export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('./public'))

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use('/api', apiRouter)