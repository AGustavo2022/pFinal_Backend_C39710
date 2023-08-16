import {newId} from "../utils/id.js"

export class Ticket {
    #code
    #purchase_datetime
    #amount
    #purchaser

    constructor({
        code = newId(),
        purchase_datetime = new Date().toLocaleString(),
        amount,
        purchaser
    }) {
        this.#code = code
        this.#purchase_datetime = purchase_datetime
        this.#amount = amount
        this.#purchaser = purchaser
    }

    dto() {
        return {
            code: this.#code,
            purchase_datetime: this.#purchase_datetime,
            amount: this.#amount,
            purchaser: this.#purchaser
        }
    }

}
