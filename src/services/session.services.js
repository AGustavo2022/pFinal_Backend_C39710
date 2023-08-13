import { usuariosRepository } from "../repositories/users.repository.js"
import { criptografiador } from "../utils/criptografia.js"


class SessionService {
    constructor () {}

    async postSession (emailBody, passwordBody) {

        const usuarioBuscado = await usuariosRepository.readOne({email: emailBody})
        const passwordOk = await criptografiador.comparar(passwordBody,usuarioBuscado.password)

        if (passwordOk) {

            const userDTO = {
                email: usuarioBuscado.email,
                first_name: usuarioBuscado.first_name,
                last_name: usuarioBuscado.last_name,
                age: usuarioBuscado.age,
                cart: usuarioBuscado.cart,
                role: usuarioBuscado.role

            }
            return userDTO
        }

    }    
}

export const sessionService = new SessionService()