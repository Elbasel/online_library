class Book {
    constructor(id, title, author, numOfPages) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.numOfPages = numOfPages;
    }
}





function addBookToDom(book) {
    const div = document.createElement('div');
    div.setAttribute('class', 'book');
    div.setAttribute('data-id', book.id);
    div.setAttribute('data-title', book.title);
    div.setAttribute('data-author', book.author);
    div.setAttribute('data-numOfPages', book.numOfPages);

    const xButton = document.createElement('button');
    xButton.textContent = 'X';

    const h1Title = document.createElement('h1');
    h1Title.setAttribute('class', 'title')
    h1Title.textContent = book.title;

    const pAuthor = document.createElement('p');
    pAuthor.setAttribute('class', 'author')
    pAuthor.textContent = book.author;

    const pNumOfPages = document.createElement('p');
    pNumOfPages.setAttribute('class', 'numOfPages')
    pNumOfPages.textContent = book.numOfPages;

    div.appendChild(xButton)
    div.appendChild(h1Title)
    div.appendChild(pAuthor)
    div.appendChild(pNumOfPages)

    domElements.main.appendChild(div)
}


function toggleForm() {
    for (const elem of domElements.backgroundContainers) {
        if (elem.style.display === 'none' || elem.style.display === '') {
            elem.style.display = 'flex';
            elem.style.opacity = 1;

        }
        else {
            elem.style.opacity = '0';
            setTimeout(() => elem.style.display = 'none', 650);
        }
    }
}

function getCurrentInputBook() {
    const bookTitle = domElements.titleInput.value;
    const bookAuthor = domElements.authorInput.value;
    const bookNumOfPages = domElements.numOfPagesInput.value;


    return new Book(getNewId(), bookTitle, bookAuthor, +bookNumOfPages)
}

function getNewId() {
    return 0
}

function validateFormInputs() {
    return true
}

function formSubmitEventListerner(e) {
    if (validateFormInputs()) {
        addBookToDom(getCurrentInputBook())
        toggleForm()
    }
}

const domElements = {
    main: document.querySelector('main'),
    addBookButton: document.querySelector('#add-book-button'),


    form: document.querySelector('form'),
    backgroundContainers: document.querySelectorAll('.container'),

    titleInput: document.querySelector('#title-input'),
    authorInput: document.querySelector('#author-input'),
    numOfPagesInput: document.querySelector('#numOfPages-input'),

    formSubmitButton: document.querySelector('#form-submit-button'),
    formClosebutton: document.querySelector('#close-form-button')

}




domElements.addBookButton.addEventListener('click', () => toggleForm())
domElements.formClosebutton.addEventListener('click', () => toggleForm())
domElements.formClosebutton.addEventListener('click', e => e.preventDefault())
domElements.form.addEventListener('submit', e => e.preventDefault())
domElements.form.addEventListener('submit', e => formSubmitEventListerner(e))
