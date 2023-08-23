const formLogin = document.querySelector('#formLogin')

if (formLogin instanceof HTMLFormElement) {
  formLogin.addEventListener('submit', async event => {
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

      const response = await fetch('/api/session', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuario)
      })

      const responseData = await response.json()

      if (response.status === 201) {
        
        if (responseData.email === 'admin@admin'){
          window.location.replace('/admin')
        }else{
          window.location.replace('/products')
        }
      } else if (response.status === 500) {
        alert('credenciales invalidas!')
      }
      
    }

  })
}