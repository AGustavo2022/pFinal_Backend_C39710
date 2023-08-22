import { newId } from "../utils/id.js"

function roles (role){
  if (role === undefined){
    const role = 'user' 
    return role
  }else{
    const role = 'admin'
    return role
  }

}

function newDate (last_connection) {

  const formattedDate = last_connection.toLocaleString('es-ES', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
  return formattedDate
}

export class User {

  #id
  #first_name
  #last_name
  #email
  #age
  #password
  #role
  #last_connection

  constructor({
      id = newId(),
      first_name,
      last_name,
      email,
      age,
      password,
      role = roles(),
      last_connection = new Date()

    }) {
    this.#id = id
    this.#first_name = first_name
    this.#last_name = last_name
    this.#email = email
    this.#age = age
    this.#password = password
    this.#role = role
    this.#last_connection = last_connection
  }

  dto() {
    return{
        id: this.#id,
        first_name: this.#first_name, 
        last_name: this.#last_name,
        email: this.#email,
        age: this.#age,
        password: this.#password,
        role: this.#role,
        last_connection: this.#last_connection
    }
  }

}

export class DatosPrincipales {

  constructor({
      id,
      first_name,
      last_name,
      email,
      age,
      password,
      role,
      last_connection

    }) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.age = age
    this.password = password
    this.role = role
    this.last_connection = last_connection
  }

  dto() {
    return{
        first_name: this.first_name, 
        last_name: this.last_name,
        email: this.email,
        role:  this.role,
        last_connection: newDate(this.last_connection)
    }
  }

}
