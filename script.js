function Book (title, author, pages) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.finished = false;
    this.id = Book.prototype.bookCounter++
    library.push(this)
}

Book.prototype.bookCounter = 0;

function removeBook (e) {
    // debugger
    booksArea.innerHTML = '';
    library = library.filter(elem => elem.id !== +e.target.id.split('-')[1])
    library.forEach(elem => appendBook(elem.title, elem.author, elem.pages, elem.id))
}


function appendBook (title, author, pages, id) {
    const bookDiv = document.createElement('div') 
    bookDiv.setAttribute('id', `book-${id}`)
    bookDiv.classList.add('book')

    // Book Header
    const bookHeader = document.createElement('div')
    bookHeader.classList.add('book-header')

    const bookTitle = document.createElement('div')
    bookTitle.textContent = title
    bookTitle.classList.add('book-title')

    const removeDiv = document.createElement('div')
    removeDiv.classList.add('remove-div')

    const removeButton = document.createElement('button')
    removeButton.textContent = 'X'
    removeButton.setAttribute('id', `remove-${id}`)
    removeButton.addEventListener('click', removeBook)
    removeButton.classList.add('remove-button')

    removeDiv.appendChild(removeButton)
    bookHeader.appendChild(bookTitle)
    bookHeader.appendChild(removeButton)

    // Finished Div
    const finishedDiv = document.createElement('div')
    finishedDiv.classList.add('finished-div')

    const finishedButton = document.createElement('button')
    finishedButton.textContent = 'Finished'
    finishedButton.classList.add('finished-button')

    finishedDiv.appendChild(finishedButton)


    // Author
    const authorDiv = document.createElement('div')
    authorDiv.innerHTML = 'Author: &nbsp;'
    authorDiv.classList.add('author')

    const authorName = document.createElement('span')
    authorName.textContent = author
    authorName.classList.add('author-name')

    authorDiv.appendChild(authorName)

    // Pages
    const pagesDiv = document.createElement('div')
    pagesDiv.textContent = `Pages: ${pages}`
    pagesDiv.classList.add('pages')

    // Book

    bookDiv.appendChild(bookHeader)
    bookDiv.appendChild(finishedDiv)
    bookDiv.appendChild(authorDiv)
    bookDiv.appendChild(pagesDiv)

    // Adding to books
    booksArea.appendChild(bookDiv)
}

let library = []

const booksArea = document.querySelector('#books')

thePowerOfNow = new Book('The Power Of Now', 'Eckhart Tolle', 250)
library.forEach(elem => appendBook(elem.title, elem.author, elem.pages, elem.id))
