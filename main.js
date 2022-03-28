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
    submitForm();
})

let bookCollection = [];
updateDisplay();


function hideModal() {
    modal.style.display = "none";
}

function showModal() {
    modal.style.display = "flex";
}

function submitForm() {
    let titleToAdd = bookForm.elements['input-title'].value;
    let authorToAdd = bookForm.elements['input-author'].value;
    let pageNumToAdd = bookForm.elements['input-pages'].value;
    let readBoolToAdd = bookForm.elements['read'].checked;
    let newBook = new Book(titleToAdd, authorToAdd, pageNumToAdd, readBoolToAdd);
    addBookToLibrary(newBook);
    updateDisplay();
}

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
    updateDisplay();
}

function updateDisplay() {
    bookShelf.innerHTML = "";
    if(bookCollection.length == 0) {
        let emptyBookshelf = document.createElement('div');
        emptyBookshelf.className = 'empty-bookshelf';
        let emptyTitle = document.createElement('h2');
        emptyTitle.className = 'empty-title';
        emptyTitle.textContent = "No Books?"
        let emptyPrompt = document.createElement('h3');
        emptyPrompt.className = 'empty-prompt';
        emptyPrompt.textContent = 'Add some now to your library!';
        let emptyButtonContainer = document.createElement('div');
        emptyButtonContainer.className = 'button-box';
        let emptyButton = document.createElement('a');
        emptyButton.className = 'add-btn';
        emptyButton.textContent = 'Add Book';
        emptyButtonContainer.appendChild(emptyButton);
        emptyButton.addEventListener('click', () => {
            showModal();
        });

        emptyBookshelf.appendChild(emptyTitle);
        emptyBookshelf.appendChild(emptyPrompt);
        emptyBookshelf.appendChild(emptyButtonContainer);
        bookShelf.appendChild(emptyBookshelf);
    }
    else {
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
}