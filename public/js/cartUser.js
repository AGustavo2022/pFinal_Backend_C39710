const formCartList = document.querySelector('#cartUser')

if (formCartList instanceof HTMLFormElement) {
  formCartList.addEventListener('submit', async event => {
    event.preventDefault()

    const cartButton = document.querySelector('.cartButton')

    const cart = cartButton.value

    window.location.href = `/cart/${cart}`

  })
}