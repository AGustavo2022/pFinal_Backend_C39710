import {newId} from "../utils/id.js"

export class Ticket {
    #coder
    #purchase_datetime
    #amount
    #purchaser

    constructor({
        coder = newId(),
        purchase_datetime = new Date().toLocaleString(),
        amount,
        purchaser
    }) {
        this.#coder = coder
        this.#purchase_datetime = purchase_datetime
        this.#amount = amount
        this.#purchaser = purchaser
    }

    dto() {
        return {
            coder: this.#coder,
            purchase_datetime: this.#purchase_datetime,
            amount: this.#amount,
            purchaser: this.#purchaser
        }
    }

}
