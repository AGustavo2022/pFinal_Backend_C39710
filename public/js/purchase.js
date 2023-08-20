const formPurchase = document.querySelector('#formPurchase')

if (formPurchase instanceof HTMLFormElement) {
  formPurchase.addEventListener('submit', async event => {
    event.preventDefault()

    const cart = document.querySelector('.cartButton')
    

      const  {status}  = await fetch(`/api/carts/${cart.value}/purchase`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        //body: JSON.stringify(tickets)
      })
      
      if (status === 201) {

        window.location.href = '/purchase'
      }
})
}
