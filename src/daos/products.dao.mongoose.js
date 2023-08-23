import mongoose, { Schema } from 'mongoose'
import { DaoMongoose } from './daoMongoose.js'
import mongoosePaginate from 'mongoose-paginate-v2'


const ProductsCollection = "products"

const productosSchema = new Schema({
    id: {type: String, require: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    thumbnail: { type: String, required: true },
    stock: { type: Number, required: true, min: 1 },
    code: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: Boolean, required: true },
    user: { type: String, required: true }
}, { versionKey: false })

productosSchema.plugin(mongoosePaginate)

const productosModel = mongoose.model(ProductsCollection, productosSchema)

export const productosDaoMongoose = new DaoMongoose(productosModel)