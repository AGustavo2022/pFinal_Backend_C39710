import {Ticket} from "../models/tickets.models.js";
import {ticketsRepository} from "../repositories/tickets.repository.js";


class TicketService {

    async getTickets(code) {
        const buscado = await ticketsRepository.readOne({id: code})
        return buscado
    }

    async postTicket(arr) {
        const ticket = new Ticket(arr)
        const creado = await ticketsRepository.create(ticket.dto())
        return creado
    }

}

export const ticketService = new TicketService()