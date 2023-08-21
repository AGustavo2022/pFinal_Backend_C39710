import mongoose, { Schema } from 'mongoose'
import { DaoMongoose } from './daoMongoose.js'

const ProductsCollection = "users"

const schemaUsers = new Schema({
    id: { type: String, required: true},
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    email: { type: String, required: true, unique:true},
    age: { type: Number, required: true},
    password: { type: String, required: true},
    cart:  { type: Schema.Types.ObjectId, ref: 'users' },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    last_connection: { type: Date, required: true}
    
}, { versionKey: false })


const usersModel = mongoose.model(ProductsCollection, schemaUsers)

export const userDaoMongoose = new DaoMongoose(usersModel)