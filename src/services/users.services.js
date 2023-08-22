import { DatosPrincipales, User } from "../models/users.models.js"
import { cartsRepository } from "../repositories/carts.repository.js"
import { usuariosRepository } from "../repositories/users.repository.js"
import { criptografiador } from "../utils/criptografia.js"
import { cartsService } from "./carts.services.js"
import { emailService } from "./email.services.js"



class UserService {

    constructor() {}

    async getUserComp () {
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

        const subject = 'Alta de Usuario'
        const usuarioEmail = `
        Datos del Usuario:
        EMAIL: ${usuarioGuardado.email} 
        NOMBRE Y APELLIDO: ${usuarioGuardado.first_name} ${usuarioGuardado.last_name}
        ROL: ${usuarioGuardado.role}`

        await emailService.send(nuevoUsuario.email, usuarioEmail, subject)

        const usuarioPublico = await this.getUser(usuarioGuardado.id)
        
        return usuarioPublico
    }

    async putUser(uid, updatedProduct){
        
        const putUsers = await usuariosRepository.updateOne({ id: uid }, updatedProduct)
        return putUsers 
    }
    
    async deleteUser(){
        
        const currentDate  = new Date()
        //2 dias
        const inactivePeriod  = 2*24*60*1000
        //30 min
        //const inactivePeriod = 30*60*1000
        try{
            const users = await this.getUserComp()
            for (const user of users) {
                const lastConnection = new Date(user.last_connection);
                const timeSinceLastConnection = currentDate - lastConnection;
                if (timeSinceLastConnection > inactivePeriod) {

                    const subject = 'Cuenta Inactiva'
                    const usuarioEmail = `Usuario ${user.email} su cuenta ha sido eliminada por inactividad`
            
                    await emailService.send(user.email, usuarioEmail, subject)
                    await cartsRepository.deleteOne(user.cart)
                    await usuariosRepository.deleteOne(user._id)
                }
            }
        }catch (error) {
            console.error('Error al eliminar usuarios inactivos:', error);
          }
    }
}

export const usersService = new UserService()

