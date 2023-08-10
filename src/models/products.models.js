import { newId } from "../utils/id.js"

export class Products {

    #id
    #title
    #description
    #code
    #price
    #status
    #stock
    #category
    #thumbnail

    constructor({
        id = newId(), 
        title, 
        description, 
        code, 
        price, 
        status, 
        stock, 
        category, 
        thumbnail
        }) {
            this.#id = id
            this.#title = title
            this.#description = description
            this.#code = code
            this.#price = price
            this.#status = status
            this.#stock = stock
            this.#category = category
            this.#thumbnail = thumbnail
    }

    dto() {
        return{
            id: this.#id,
            title: this.#title, 
            description: this.#description,
            code: this.#code,
            price: this.#price,
            status: this.#status,
            stock: this.#stock, 
            category: this.#category,
            thumbnail:  this.#thumbnail,
        }
    }
}