import { User } from "../models/users.models.js"
import { usuariosRepository } from "../repositories/users.repository.js"
import { criptografiador } from "../utils/criptografia.js"
import { cartsService } from "./carts.services.js"
import { emailService } from "./email.services.js"



class UserService {

    constructor() {}

    async getUser (uid) {
        if (uid != undefined){
            const buscado = await usuariosRepository.readOne ({ id: uid })
            return buscado
        }else{
            const users = await usuariosRepository.readMany()
            return users
        }
    }

    async getUserEmail (email) {
            const buscado = await usuariosRepository.readOne ({ email: email })
            return buscado
    }

    async getUserMongoose(uid) {
        const buscado = await usuariosRepository.readManyIdMongoose({
            cart: uid
        })
        return buscado
    }

    async postUser (user) {
        
        const datosUsuarioBody = new User(user)

        const datosUsuarios = datosUsuarioBody.dto()

        datosUsuarios.password = criptografiador.hashear(datosUsuarios.password)
        
        const newCart = await cartsService.postCarts({})

        const nuevoUsuario = {
            ...datosUsuarios,
            cart : newCart._id
        }

        const usuarioGuardado = await usuariosRepository.create(nuevoUsuario)

        const usuarioEmail = `
        Datos del Usuario:
        EMAIL: ${usuarioGuardado.email} 
        NOMBRE Y APELLIDO: ${usuarioGuardado.first_name} ${usuarioGuardado.last_name}
        ROL: ${usuarioGuardado.role}`

        await emailService.send(nuevoUsuario.email, usuarioEmail)

        const usuario = {
            first_name: usuarioGuardado.first_name,
            last_name: usuarioGuardado.last_name,
            email: usuarioGuardado.email,
            cart: usuarioGuardado.cart
        }

        return usuario
        //return usuarioGuardado
    }
}

export const usersService = new UserService()

