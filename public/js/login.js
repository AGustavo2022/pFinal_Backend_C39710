const formLogin = document.querySelector('#formLogin')

if (formPurchase instanceof HTMLFormElement) {
  formPurchase.addEventListener('submit', async event => {
    event.preventDefault()

    const input_email = document.querySelector('#input_email')
    const input_password = document.querySelector('#input_password')

    if (
      input_email instanceof HTMLInputElement &&
      input_password instanceof HTMLInputElement
    ) {

      const datosUsuario = {
        email: input_email.value,
        password: input_password.value,
      }

      const { status } = await fetch('/api/session', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuario)
      })

      if (status === 201) {
        window.location.href = '/products'
      } else {
        window.location.href = '/register'
      }
    }
  })
}