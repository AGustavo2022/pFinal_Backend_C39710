const formUsers = document.querySelector('#formUsuario')

if (formUsers instanceof HTMLFormElement) {
  formUsers.addEventListener('submit', async event => {
    event.preventDefault()

    await fetch('/api/users', {
        method: 'DELETE',

      })
  })
}

const formElements = document.querySelectorAll('.formActualizacion');

formElements.forEach(formactual => {
  formactual.addEventListener('submit', async event => {
    event.preventDefault();

    const id = event.currentTarget.querySelector('.usuario_id');
    const rol = event.currentTarget.querySelector('.select');

    const updateUsers = {
      role: rol.value
    }

    await fetch(`/api/users/${id.value}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateUsers)
    })

    })
  })
