import { DatosPrincipales, User } from "../models/users.models.js"
import { usuariosRepository } from "../repositories/users.repository.js"
import { criptografiador } from "../utils/criptografia.js"
import { cartsService } from "./carts.services.js"
import { emailService } from "./email.services.js"



class UserService {

    constructor() {}

    async #getUser () {
        const users = await usuariosRepository.readMany()  
        return users
    }

    async getUser (uid) {
        if (uid != undefined){
            const buscado = await usuariosRepository.readOne ({ id: uid })
            const datosPublicos = new DatosPrincipales(buscado)
            return datosPublicos.dto()
        }else{
            const users = await usuariosRepository.readMany()
            const datosUsuarios = []
            users.forEach(element => {
              const datosPublicos = new DatosPrincipales(element)
              datosUsuarios.push(datosPublicos.dto())
            })
        
            return datosUsuarios
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

        const usuarioPublico = await this.getUser(usuarioGuardado.id)
        
        return usuarioPublico
    }

    async putUser(uid, updatedProduct){
        
        const putUsers = await usuariosRepository.updateOne({ id: uid }, updatedProduct)
        return putUsers 
    }
    
    async deleteUser(){
        
        const connection = new Date()
        //2 dias
        //const inactive = 2*24*60*1000
        //30 min
        const inactive = 30*60*1000

        const users = await this.#getUser()
        //console.log(users)
        for (const user of users) {
            const arr = connection - user.last_connection.getTime();
            if (arr > inactive) {

                
                // El usuario ha estado inactivo durante más de 30 minutos
                console.log(`User ${user.email} has been inactive for more than 30 minutes.`);
                // Aquí puedes realizar acciones como eliminar el usuario o enviar un correo electrónico.
            }
        }


        // console.log(connection)
        // const inactiveUsers = users.filter(user => {
        //     return connection - user.last_connection > inactive
        // })
        // return inactiveUsers
    }

}

export const usersService = new UserService()

