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

export class User {

  #id
  #first_name
  #last_name
  #email
  #age
  #password
  #role

  constructor({
      id = newId(),
      first_name,
      last_name,
      email,
      age,
      password,
      role = roles()

    }) {
    this.#id = id
    this.#first_name = first_name
    this.#last_name = last_name
    this.#email = email
    this.#age = age
    this.#password = password
    this.#role = role
  }

  dto() {
    return{
        id: this.#id,
        first_name: this.#first_name, 
        last_name: this.#last_name,
        email: this.#email,
        age: this.#age,
        password: this.#password,
        role:  this.#role
    }
  }

}