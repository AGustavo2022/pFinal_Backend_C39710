const formsAddToCart = document.querySelectorAll('.formAddToCart');

if (formsAddToCart instanceof NodeList) {
  formsAddToCart.forEach(form => {
    form.addEventListener('submit', async event => {
      event.preventDefault();

      const cart = document.querySelector('#cart_id')
      const product = form.querySelector('.product_id')

      const addTocart = await fetch(`/api/carts/${cart.value}/product/${product.value}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

    })
  })
}
