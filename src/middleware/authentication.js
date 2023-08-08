//import { usuariosRepository } from "../repositories/user.repository.js";
import {criptografiador} from "../utils/criptografia.js"
  
  
export function extraerToken(req, res, next) {
    req['accessToken'] = req.signedCookies['authToken']
    next()
}
  
export async function isAuthenticated(req, res, next) {
  
    if (!req['accessToken']) {
      req.logger.error('usuario no esta autenticado en el accessToken')
      return res.status(401).json({
        error: 'not authenticated'
      })
    }
  
    try {
      const payload = await criptografiador.decodificarToken(req['accessToken'])
      req.user = payload
      next()
    } catch (error) {
      req.logger.error('usuario no esta autenticado')
      res.status(401).json({
        error: 'authentication failed'
      })
    }
}
  
export function isAdmin(req, res, next) {
    req.user.role === 'admin' ? next() :res.status(403).json({error: 'not authorized. only logged in users allowed'
    })
}
