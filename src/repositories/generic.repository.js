export class GenericRepository {
    #dao
    constructor(dao) {
      this.#dao = dao
    }
  
    get dao() { return this.#dao }
  
    create(data, options) {
      return this.#dao.create(data)
    }

    createIdMongoose(data, options) {
      return this.#dao.create2(data)
    }
  
    readOne(criteria, options) {
      return this.#dao.readOne(criteria)
    }
  
    readMany(criteria, options) {
      return this.#dao.readMany(criteria)
    }

    readManyIdMongoose(criteria, options) {
      return this.#dao.readMany2(criteria)
    }
  
    updateOne(criteria, newData, options) {
      return this.#dao.updateOne(criteria, newData)
    }
  
    updateMany(criteria, newData, options) {
      return this.#dao.updateMany(criteria, newData)
    }
  
    deleteOne(criteria, options) {
      return this.#dao.deleteOne(criteria)
    }
  
    deleteMany(criteria, options) {
      return this.#dao.deleteMany(criteria)
    }
  }