import { cartsService } from '../services/carts.services.js'


export async function handleGet(req, res, next) {
  const cid = req.params.id
  req.logger.http("entre al GET de Carts")
  try {
    const buscado = await cartsService.getCarts(cid)
    res.json(buscado)
  } catch (error) {
    req.logger.error("error en GET Carts")
    next(error)
  }
}

export async function handlePost(req, res, next) {
  const cart = {}
  try {
    const creada = await cartsService.postCarts(cart)
    res.status(201).json(creada)
  } catch (error) {
    req.logger.error("Error al crear la Cart")
    next(error)
  }
}

export async function handleDelete(req, res, next) {
  const cid = req.params.cid
  const pid = req.params.pid
  if (pid === undefined) {
    try {
      const deleteCart = await cartsService.deleteCart(cid)
      res.json(deleteCart)
      req.logger.warn(`Cart eliminada`)
    } catch (error) {
      next(error)
    }
  } else {
    try {
      const deleteCartProduct = await cartsService.deleteCartProduct(cid, pid)
      res.json(deleteCartProduct)
    } catch (error) {
      next(error)
    }
  }

}


export async function handlePut(req, res, next) {
  const cid = req.params.cid
  const pid = req.params.pid
  const qty = req.body
  try {
    const updated = await cartsService.putCartQty(cid, pid, qty)
    res.json(updated)
  } catch (error) {
    next(error)
  }

}

export async function handlePostProduct(req, res, next) {
  try {
    const cid = req.params.cid
    const pid = req.params.pid
    const agregado = await cartsService.agregarAlCarrito(cid, pid)
    res.status(201).json(agregado)
  } catch (error) {
    next(error)
  }
}

export async function handlePostPurchase(req, res, next) {
  try {
    const idCart = req.params.cid
    const generarTickets  = await cartsService.generarTickets(idCart)
    res.status(201).json(generarTickets)
  } catch (error) {
    next(error)
  }
}


