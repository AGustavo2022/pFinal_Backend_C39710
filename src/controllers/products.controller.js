import { productsService } from '../services/products.services.js'

export async function handleGet(req, res, next) {
  const pid = req.params.id
  try {
    const buscado = await productsService.getProducts(pid)
    res.json(buscado)
  } catch (error) {
    next(error)
  }
}

export async function handlePost(req, res, next) {
  const producto = req.body
  try {
    const creado = await productsService.postProduct(producto)
    res.status(201).json(creado)
  } catch (error) {
    next(error)
  }
}

export async function handlePut(req, res, next) {
  const pid = req.params.id
  const updatedProduct = req.body
  try {
    const updated = await productsService.putProduct(pid, updatedProduct)
    res.json(updated)
  } catch (error) {
    next(error)
  }
}

export async function handleDelete(req, res, next) {
  const product = req.params.id
  try {
    const deleteProduct = await productsService.deleteProduct(product)
    res.json(deleteProduct)
  } catch (error) {
    next(error)
  }
}
