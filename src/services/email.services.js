import { createTransport } from 'nodemailer'
import { EMAIL_CONFIG } from '../config/email.confing.js'

class EmailService {
  #clienteNodemailer

  constructor(config) {
    this.#clienteNodemailer = createTransport(config)
  }

  async send(destinatario, mensaje) {
    const mailOptions = {
      from: 'Enviado del Servidor',
      to: destinatario,
      subject: 'Alta de Usuario!',
      text: mensaje,
    }
    try {
      const info = await this.#clienteNodemailer.sendMail(mailOptions)
      // console.log(info)
      return info
    } catch (error) {
      // console.log(error)
      throw error
    }
  }
}


export const emailService = new EmailService(EMAIL_CONFIG)

