function Book (title, author, pages) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.finished = false

    this.id = Book.prototype.bookCounter++
    library.push(this)
}




function removeBook (e) {
    booksArea.innerHTML = ''
    library = library.filter(elem => elem.id !== +e.target.id.split('-')[1])
    library.forEach(elem => appendBook(elem.title, elem.author, elem.pages, elem.id, elem.finished))

    localStorage.setItem('library', JSON.stringify(library))

}


function appendBook (title, author, pages, id, finished) {
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
    if (finished) {
        finishedButton.classList.add('finished')
        finishedButton.textContent = 'Finished'
    }
    else {
        finishedButton.classList.add('not-finished')
        finishedButton.textContent = 'Not Finished'
    }
    finishedButton.setAttribute('id', `finish-${id}`)
    finishedButton.addEventListener('click', toggleFinish)
    finishedButton.classList.add('finished-button')

    finishedDiv.appendChild(finishedButton)


    // Author
    const authorDiv = document.createElement('div')
    authorDiv.innerHTML = 'Author: &nbsp'
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


function addBook (e) {
    e.preventDefault()

    if(!areValidInputs()) {
        return
    }

    const newBook = new Book(bookNameInput.value, authorInput.value, pagesInput.value)
    appendBook(newBook.title, newBook.author, newBook.pages, newBook.id, newBook.finished)
    formContainer.style.visibility = 'hidden'

    localStorage.setItem('library', JSON.stringify(library))

    
}




function areValidInputs() {
    const bookName = bookNameInput.value
    const authorName = authorInput.value
    const pagesCount = pagesInput.value

    if (bookName.length > MAX_TEXT_LENGTH) return

    if (authorName.length > MAX_TEXT_LENGTH) return

    if (isNaN(pagesCount)) return

    return true

}



function validateAuthorNameLength(e) {
    const length = e.target.value.length

    if (length > MAX_TEXT_LENGTH) {
        authorNameError.textContent =  `Author Name Can\'t be more than ${MAX_TEXT_LENGTH} characters`
    }
    else {
        authorNameError.innerHTML = '&nbsp'
    }
}


function validateBookNameLength (e) {
    const length = e.target.value.length
    if (length > MAX_TEXT_LENGTH) {
        bookNameError.textContent = `Book name can\'t be more than ${MAX_TEXT_LENGTH} characters`
    }
    else {
        bookNameError.innerHTML = '&nbsp'
    }
}




function validatePagesCount (e) {
    if (isNaN(e.target.value)) {
        pagesCountError.textContent = 'Must be a number'
    }
    else {
        pagesCountError.innerHTML = '&nbsp'
    }
}


function toggleFinish(e) {
    const bookId = e.target.id.split('-')[1]
    const finishedStatus = e.target.textContent

    let newStatus
    let newStatusText = ''
    let newStatusClass = ''
    
    if (finishedStatus === 'Finished') {
        
        newStatus = false
        newStatusText = 'Not Finished'
    }
    else {
        newStatus = true
        newStatusText = 'Finished'

    }

    e.target.classList.toggle('finished')
    e.target.classList.toggle('not-finished')


    e.target.textContent = newStatusText
    


    for (const book of library) {
        if (book.id === +bookId) {
            book.finished = newStatus
        }
    }

    localStorage.setItem('library', JSON.stringify(library))

} 


const MAX_TEXT_LENGTH = 30

const booksArea = document.querySelector('#books')
const addBookButton = document.querySelector('#add-button')

const formContainer = document.querySelector('#form-container')
const form = document.querySelector('#add-book-form')
const formAddButton = document.querySelector('#form-add-button')
const formCancelButton = document.querySelector('#form-cancel-button')

const bookNameInput = document.querySelector('#book-name-input')
const authorInput = document.querySelector('#author-input')
const pagesInput = document.querySelector('#pages-input')

const bookNameError = document.querySelector('#book-name-error')
const authorNameError = document.querySelector('#author-name-error')
const pagesCountError = document.querySelector('#pages-count-error')

addBookButton.addEventListener('click', () => {
    formContainer.style.visibility = 'visible'
    bookNameInput.value = ''
    authorInput.value = ''
    pagesInput.value = ''
    bookNameInput.focus()
})


formCancelButton.addEventListener('click', () => {
    formContainer.style.visibility = 'hidden'
    bookNameInput.value = ''
    authorInput.value = ''
    pagesInput.value = ''
})


// Cancel form submission shortcuts
document.querySelector('main').addEventListener('click', () => {
    formContainer.style.visibility = 'hidden'
    bookNameInput.value = ''
    authorInput.value = ''
    pagesInput.value = ''
})

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        formContainer.style.visibility = 'hidden'
        bookNameInput.value = ''
        authorInput.value = ''
        pagesInput.value = ''
    }
})
// ======


form.addEventListener('submit', addBook)

bookNameInput.addEventListener('input', validateBookNameLength)
authorInput.addEventListener('input', validateAuthorNameLength)
pagesInput.addEventListener('input', validatePagesCount)



let library = JSON.parse(localStorage.getItem('library')) ?? []

let maxId = 0;

for (let i = 0; i < library.length; i++) {
    if (library[i].id > maxId) {
        maxId = library[i].id
    }
}

Book.prototype.bookCounter = maxId + 1;

//Testing
// new Book('The Power Of Now 1', 'Eckhart Tolle', 230)
// new Book('The Power Of Now 2', 'Eckhart Tolle', 230)
// new Book('The Power Of Now 3', 'Eckhart Tolle', 230)
// new Book('The Power Of Now 4', 'Eckhart Tolle', 230)
// new Book('The Power Of Now 5', 'Eckhart Tolle', 230)
// new Book('The Power Of Now 6', 'Eckhart Tolle', 230)
// new Book('The Power Of Now 7', 'Eckhart Tolle', 230)
// new Book('The Power Of Now 8', 'Eckhart Tolle', 230)
// new Book('The Power Of Now 9', 'Eckhart Tolle', 230)
// new Book('The Power Of Now 10', 'Eckhart Tolle', 230)
// new Book('The Power Of Now 11', 'Eckhart Tolle', 230)
// new Book('The Power Of Now 12', 'Eckhart Tolle', 230)
// new Book('The Power Of Now 13', 'Eckhart Tolle', 230)

library.forEach(elem => appendBook(elem.title, elem.author, elem.pages, elem.id, elem.finished))


