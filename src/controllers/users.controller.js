import { criptografiador } from "../utils/criptografia.js"
import { usersService } from "../services/users.services.js"


export async function handleGet(req, res, next) {
  const uid = req.params.id
  try {
    const buscado = await usersService.getUser(uid)
    res.json(buscado)
  } catch (error) {
    next(error)
  }
}

export async function handlePost(req, res, next) {
  const userBody = req.body
  try {
    const creada = await usersService.postUser(userBody)
    
    const access_token = criptografiador.generarToken(creada)
    res.cookie('authToken', access_token, { httpOnly: true, signed: true, maxAge: 1000 * 60 * 60 * 24 })
    res.status(201).json(creada)
  } catch (error) {
    next(error)
  }
}

//