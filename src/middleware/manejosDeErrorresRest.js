
export function manejoDeErroresRest(error, req, res, next) {
    if (error.message === 'AUTHENTICATION ERROR') {
      return res.sendStatus(401)
    }
    next(error)
  }
  
  export function manejoDeErroresWeb(error, req, res, next) {
    if (error.message === 'AUTHENTICATION ERROR') {
      req.logger.error("error AUTHENTICATION ERROR")
      return res.redirect('/login')
    }
  
    if (error.message === 'NOT FOUND') {
      req.logger.error("error NOT FOUND")
      return res.status(404).send('<H1>No encontrado</H1>')
    }
  
    next(error)
  }