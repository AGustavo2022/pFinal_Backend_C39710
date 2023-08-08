import express from 'express'
import { engine } from 'express-handlebars'


export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('./public'))

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')