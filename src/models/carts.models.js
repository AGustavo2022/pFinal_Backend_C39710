import { newId } from "../utils/id.js"

export class Carts {

    #id
    #productsCarts

    constructor({id = newId(),  productsCarts = []}) {
            this.#id = id
            this.#productsCarts = productsCarts
            
    }

    dto() {
        return{
            id: this.#id,
            productsCarts: this.#productsCarts,

        }
    }
}