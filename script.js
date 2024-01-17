let allBooks = []
let i = 0
console.log(allBooks)
const booklist = function () {
  fetch('https://striveschool-api.herokuapp.com/books')
    .then((response) => {
      console.log('response', response)
      if (response.ok) {
        return response.json()
      } else {
        if (response.status === 404) {
          throw new Error('404 - Pagina non trovata')
        } else if (response.status === 500) {
          throw new Error('500 - Internal server error')
        } else {
          throw new Error('Errore generico')
        }
      }
    })
    .then((books) => {
      console.log(books)

      books.forEach((book) => {
        allBooks.push(book)
        const row = document.getElementsByClassName('row')[0]
        const card = document.createElement('div')
        card.classList.add('col-4')
        card.innerHTML = ` <div class="card col"> <img src="${book.img}" class="card-img-top " alt="..."  height="450" />
        <div class="card-body ">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text">Prezzo: <span>${book.price}</span></p>
          <p class="card-text">Categoria: <span>${book.category}</span></p>
          <div class="ciao">
            <p id="contatore" class="d-none">${i}<p/>
          <a href="#" onclick="add(this)"  class="btn btn-primary">Acquista</a>
          <a href="#" onclick="elimina(this)"  class="btn btn-danger">Elimina</a>
          </div>
        </div>`
        row.appendChild(card)
        i++
      })
    })
}

const elimina = function (button) {
  console.log(button)
  button.closest('.col-4').remove()
}

const add = function (button) {
  const bottone = button
  console.log(bottone)
  const padre = bottone.closest('.ciao')
  console.log(padre)
  const contatore = padre.children[0]
  console.log(padre)
  const cart = document.getElementsByClassName('dropdown-menu')[0]
  console.log(cart)
  const newAdd = document.createElement('li')
  newAdd.classList.add('dropdown-item')
  newAdd.innerText = allBooks[contatore.innerText].title
  console.log(newAdd)
  cart.appendChild(newAdd)
}
booklist()
