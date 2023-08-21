
const formPurchase = document.querySelector('#formUsuario')

if (formPurchase instanceof HTMLFormElement) {
  formPurchase.addEventListener('submit', async event => {
    event.preventDefault()

    //const cart = document.querySelector('.cartButton')

    await fetch(`/api/users`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        lista(data)
      })
  })

}

function lista(data) {

  const arr = data

  arr.forEach(element => {

    const divPurchase = document.querySelector('#usuarios')
    if (divPurchase instanceof HTMLDivElement) {
      divPurchase.innerHTML += `
      EMAIL: ${element.email}<br>
      NOMBRE: ${element.first_name} ${element.last_name} <br>
      ROL: ${element.role}<br>
      <br>
      `
    }


    
  });

//   const divPurchase = document.querySelector('#usuarios')
//   if (divPurchase instanceof HTMLDivElement) {
//     divPurchase.innerHTML = `
//     EMAIL: ${data.email}<br>
//     NOMBRE: ${data.first_name} ${data.last_name} <br>
//     ROL: ${data.role}
// `
//   }
}
