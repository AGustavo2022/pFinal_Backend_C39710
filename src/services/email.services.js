import { createTransport } from 'nodemailer'
import { EMAIL_CONFIG } from '../config/email.confing.js'

class EmailService {
  #clienteNodemailer

  constructor(config) {
    this.#clienteNodemailer = createTransport(config)
  }

  async send(destinatario, mensaje, subject) {
    const mailOptions = {
      from: 'Enviado del Servidor',
      to: destinatario,
      subject: subject,
      text: mensaje,
    }
    try {
      const info = await this.#clienteNodemailer.sendMail(mailOptions)
      return info
    } catch (error) {
      throw error
    }
  }
}


export const emailService = new EmailService(EMAIL_CONFIG)

