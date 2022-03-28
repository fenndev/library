/* DOM Objects */

const addButton = document.querySelector(".add-btn");
const bookShelf = document.querySelector(".bookshelf");
const modal = document.querySelector(".modal");
const cancelButton = document.querySelector(".cancel-btn");
const bookForm = document.querySelector(".form");

/* Event Listeners */

addButton.addEventListener('click', () => {
    showModal();
});

cancelButton.addEventListener('click', () => {
    hideModal();
})

bookForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let titleToAdd = bookForm.elements['input-title'].value;
    let authorToAdd = bookForm.elements['input-author'].value;
    let pageNumToAdd = bookForm.elements['input-pages'].value;
    let readBoolToAdd = bookForm.elements['read'].checked;
    let newBook = new Book(titleToAdd, authorToAdd, pageNumToAdd, readBoolToAdd);
    addBookToLibrary(newBook);
    console.log(bookCollection);
    updateDisplay();
})


function hideModal() {
    modal.style.display = "none";
}

function showModal() {
    modal.style.display = "flex";
}


let bookCollection = [];

function Book(title, author, pageNum, hasRead) {
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.hasRead = hasRead;
}

function addBookToLibrary(bookToAdd) {
    bookCollection.push(bookToAdd);
}

function deleteBook(bookIndex) {
    bookCollection.splice(bookIndex, 1);
    console.log(bookCollection);
    updateDisplay();
}

function updateDisplay() {
    bookShelf.innerHTML = "";
    bookCollection.forEach(book => {
        let bookToDisplay = document.createElement('div');
        bookToDisplay.className = 'book';
        bookToDisplay.setAttribute("data-index", `${bookCollection.indexOf(book)}`);
        let titleToDisplay = document.createElement('h2');
        titleToDisplay.className = 'book__title';
        titleToDisplay.textContent = book.title;
        let authorToDisplay = document.createElement('h2');
        authorToDisplay.className = 'book__author';
        authorToDisplay.textContent = book.author;
        let pageNumToDisplay = document.createElement('h2');
        pageNumToDisplay.className = 'book__pages';
        pageNumToDisplay.textContent = book.pageNum;
        let labelBoxToDisplay = document.createElement('div');
        labelBoxToDisplay.className = 'label-box';
        let labelToDisplay = document.createElement('label');
        labelToDisplay.htmlFor = 'read-box';
        labelToDisplay.textContent = 'Read'
        let readBoxToDisplay = document.createElement('input');
        readBoxToDisplay.setAttribute("type", "checkbox");
        readBoxToDisplay.className = "read-box";
        labelBoxToDisplay.appendChild(labelToDisplay);
        labelBoxToDisplay.appendChild(readBoxToDisplay);
        if(book.hasRead)
            readBoxToDisplay.checked = true;
        let svgToDisplay = document.createElement('img');
        svgToDisplay.className = 'delete-btn';
        svgToDisplay.setAttribute('src', 'img/cross-filled-symbolic.svg');
        svgToDisplay.addEventListener('click', () => {
            deleteBook(svgToDisplay.parentElement.getAttribute('data-index'));
        })
        

        bookToDisplay.appendChild(titleToDisplay);
        bookToDisplay.appendChild(authorToDisplay);
        bookToDisplay.appendChild(pageNumToDisplay);
        bookToDisplay.appendChild(labelBoxToDisplay);
        bookToDisplay.appendChild(svgToDisplay);

        bookShelf.appendChild(bookToDisplay);
    });
}