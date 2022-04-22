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


const domElements = {
    main: document.querySelector('main')
} 






