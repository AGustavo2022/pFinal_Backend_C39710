//import { usuariosRepository } from "../repositories/user.repository.js";
import {criptografiador} from "../utils/criptografia.js"
  
  
export function extraerToken(req, res, next) {
    req['accessToken'] = req.signedCookies['authToken']
    next()
}
  
export async function isAuthenticated(req, res, next) {
  
    if (!req['accessToken']) {
      return res.status(401).json({
        error: 'user not authenticated'
      })
    }
  
    try {
      const payload = await criptografiador.decodificarToken(req['accessToken'])
      req.user = payload
      next()
    } catch (error) {
      res.status(401).json({
        error: 'authentication failed'
      })
    }
}
  
export async function isAdmin(req, res, next) {

  const payload = await criptografiador.decodificarToken(req['accessToken'])
  
  const user = payload.role

    if (user === 'admin') {
        next();
    } else {
        res.status(403).send('Access denied');
    }
}
