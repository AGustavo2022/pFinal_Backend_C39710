import { PORT } from './config/server.config.js'
import { app } from './app/server.js'
import { CNX_STR } from './config/mongodb.config.js'
import mongoose from 'mongoose'

await mongoose.connect(CNX_STR)
console.log(`conectado a base de datos en '${CNX_STR}'`)

app.listen(PORT, () => { console.log(`escuchando en puerto ${PORT}`) })