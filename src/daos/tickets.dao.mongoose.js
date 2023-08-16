import mongoose, { Schema } from 'mongoose'
import { DaoMongoose } from './daoMongoose.js'

const TicketsCollection = "tickets"

const schemaTicket = new Schema({
    code: { type: String, required: true, unique:true},
    purchase_datetime: { type: String, required: true},
    amount: { type: Number, required: true},
    purchaser: { type: Schema.Types.ObjectId, ref: 'users'},
    
}, { versionKey: false })


const ticketsModel = mongoose.model(TicketsCollection, schemaTicket)

export const ticketsDaoMongoose = new DaoMongoose(ticketsModel)