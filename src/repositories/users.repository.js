import { userDaoMongoose } from '../daos/users.dao.mongosse.js'
import { GenericRepository } from './generic.repository.js'

export const usuariosRepository = new GenericRepository(userDaoMongoose)