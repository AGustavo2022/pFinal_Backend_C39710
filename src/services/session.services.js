import { DatosPrincipales } from "../models/users.models.js"
import { usuariosRepository } from "../repositories/users.repository.js"
import { criptografiador } from "../utils/criptografia.js"
import { usersService } from "./users.services.js"


class SessionService {
    constructor () {}

    async postSession (emailBody, passwordBody) {

        const usuarioBuscado = await usuariosRepository.readOne({email: emailBody})

        const passwordOk = await criptografiador.comparar(passwordBody,usuarioBuscado.password)

        if (passwordOk) {
            
            const updatedUsers = {
                last_connection:(new Date)
            }
 
            await usersService.putUser(usuarioBuscado.id, updatedUsers)

            const datosPublicos = new DatosPrincipales(usuarioBuscado)

            return datosPublicos
        }
        }
    }    


export const sessionService = new SessionService()