
const formPurchase = document.querySelector('#formPurchase')

if (formPurchase instanceof HTMLFormElement) {
  formPurchase.addEventListener('submit', async event => {
    event.preventDefault()

    const cart = document.querySelector('.cartButton')
    const submitButton = formPurchase.querySelector('button[type="submit"]')

    await fetch(`/api/carts/${cart.value}/purchase`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(data => {
        lista(data)
      })
      .finally(() => {
        submitButton.disabled = true;
      })
  })

}

function lista(data) {
  const divPurchase = document.querySelector('#tickets')
  if (divPurchase instanceof HTMLDivElement) {
    divPurchase.innerHTML = `
    COD.TICKETS: ${data.code}<br>
    FECHA DE COMPRA: ${data.purchase_datetime}<br>
    TOTAL: $ ${data.amount} <br>
    COD.USUARIO: ${data.purchaser}
`
  }
}
