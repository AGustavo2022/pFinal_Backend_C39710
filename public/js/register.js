const formRegister = document.querySelector('#formRegister')

if (formRegister instanceof HTMLFormElement) {
  formRegister.addEventListener('submit', async event => {
    event.preventDefault()

    const input_name = document.querySelector('#input_name')
    const input_lastname = document.querySelector('#input_lastname')
    const input_email = document.querySelector('#input_email')
    const input_password = document.querySelector('#input_password')
    const input_age = document.querySelector('#input_age')
    //const input_cart = document.querySelector('#input_cart')
    //const input_rol = document.querySelector('#input_rol')

    if (
      input_name instanceof HTMLInputElement &&
      input_lastname instanceof HTMLInputElement &&
      input_email instanceof HTMLInputElement &&
      input_password instanceof HTMLInputElement &&
      input_age instanceof HTMLInputElement
      // input_cart instanceof HTMLInputElement &&
      // input_rol instanceof HTMLInputElement
    ) {

      const datosUsuario = {
        first_name: input_name.value,
        last_name: input_lastname.value,
        email: input_email.value,
        age: parseInt(input_age.value) ,
        password: input_password.value,
        // cart: input_cart.value,
        // rol: input_rol.value
      }

      const {status} = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuario)
      })
      if (status === 201) {
        window.location.href = '/products'
      }
    }
  }
 )
}