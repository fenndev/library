/* DOM Objects */

const addButton = document.querySelector(".add-btn");
const bookShelf = document.querySelector(".bookshelf");
const modal = document.querySelector(".modal");
const cancelButton = document.querySelector(".cancel-btn");
const bookForm = document.querySelector(".form");
const submitButton = document.querySelector(".submit-btn");

/* Global Variables */

let bookCollection = [];

/* Event Listeners */

addButton.addEventListener('click', () => {
    showModal();
});

cancelButton.addEventListener('click', () => {
    hideModal();
})

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    let formElements = Array.from(bookForm.elements);
    let formInputs = [];
    let elementsToValidate = ['text', 'number'];
    for(const input in formElements) {
        let currentElement = formElements[input];
        if(elementsToValidate.includes(currentElement.type)) formInputs.push(currentElement);
    }
        for(const input in formInputs) {
            let currentInput = formInputs[input];
            if(currentInput.validity.valueMissing || (currentInput.type == 'number' && currentInput.value <= 0)) {
                switch(currentInput.id.replace('input-', '')) {
                    case 'pages':
                        currentInput.setCustomValidity(`The book must have a page count that is greater than 0.`);
                        break;
                    default:
                        currentInput.setCustomValidity(`The book must have a specified ${currentInput.id.replace('input-', '')}.`);
                        break;
                }
                currentInput.reportValidity();
                break;
            }
            
        }
    if(formInputs.every(isFormValid)) submitForm();
});

/* OnLoad Functions */

updateDisplay();

/* Modal Controls */

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
    addBook(newBook);
    updateDisplay();
    clearForm();
    hideModal();
}

function clearForm() {
    bookForm.reset();
}

const isFormValid = (formElement) => {
    if(formElement.type == 'number' && formElement.value <= 0)
            return false;
    if(formElement.validity.valueMissing) {
        if(formElement.willValidate) return false;
        else return true;
    }
    else return true;
}

/* Book Functions */

function Book(title, author, pageNum, hasRead) {
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.hasRead = hasRead;
}

function addBook(bookToAdd) {
    bookCollection.push(bookToAdd);
}

function deleteBook(bookIndex) {
    bookCollection.splice(bookIndex, 1);
    updateDisplay();
}

function toggleReadStatus(bookIndex) {
    let currentBook = bookCollection[bookIndex];
    if(currentBook.hasRead)
        currentBook.hasRead = false;   
    else
        currentBook.hasRead = true;
}

/* Display Functions */

function updateDisplay() {
    bookShelf.innerHTML = "";
    if(bookCollection.length == 0)
        displayEmptyBookshelf();
    else
        displayNewBooks();
}

function displayEmptyBookshelf() {
    let emptyBookshelf = document.createElement('div');
    emptyBookshelf.className = 'empty__bookshelf';
    let emptyTitle = document.createElement('h2');
    emptyTitle.className = 'empty__title';
    emptyTitle.textContent = "No Books?"
    let emptyPrompt = document.createElement('h3');
    emptyPrompt.className = 'empty__prompt';
    emptyPrompt.textContent = 'Add some now to your library!';
    let emptyButton = document.createElement('a');
    emptyButton.className = 'add-btn';
    emptyButton.textContent = 'Add Book';
    emptyButton.addEventListener('click', () => {
        showModal();
    });
    emptyBookshelf.appendChild(emptyTitle);
    emptyBookshelf.appendChild(emptyPrompt);
    emptyBookshelf.appendChild(emptyButton);
    bookShelf.appendChild(emptyBookshelf);
}

function displayNewBooks() {
    bookCollection.forEach(book => {
        let bookToDisplay = document.createElement('div');
        bookToDisplay.className = 'book';
        bookToDisplay.setAttribute("data-index", `${bookCollection.indexOf(book)}`);
        let titleToDisplay = document.createElement('h2');
        titleToDisplay.className = 'book__title';
        titleToDisplay.textContent = book.title;
        let authorToDisplay = document.createElement('h2');
        authorToDisplay.className = 'book__author';
        authorToDisplay.textContent = `by ${book.author}`;
        let pageNumToDisplay = document.createElement('h2');
        pageNumToDisplay.className = 'book__pages';
        let numberFormatter = new Intl.NumberFormat('en-US');
        let formattedPageNum = numberFormatter.format(book.pageNum);    
        pageNumToDisplay.textContent = `${formattedPageNum} pages`;
        let labelBoxToDisplay = document.createElement('div');
        labelBoxToDisplay.className = 'book__label-box';
        let labelToDisplay = document.createElement('label');
        labelToDisplay.htmlFor = 'read-box';
        labelToDisplay.textContent = 'Read'
        labelToDisplay.className = 'book__read';
        let readBoxToDisplay = document.createElement('input');
        readBoxToDisplay.setAttribute("type", "checkbox");
        readBoxToDisplay.className = "read-box";
        labelBoxToDisplay.appendChild(labelToDisplay);
        labelBoxToDisplay.appendChild(readBoxToDisplay);
        if(book.hasRead)
            readBoxToDisplay.checked = true;
        readBoxToDisplay.addEventListener('click', () => {
            toggleReadStatus(svgToDisplay.parentElement.getAttribute('data-index'));
        });
        let svgToDisplay = document.createElement('img');
        svgToDisplay.className = 'delete-btn';
        svgToDisplay.setAttribute('src', 'img/cross-filled-symbolic.svg');
        svgToDisplay.addEventListener('click', () => {
            deleteBook(svgToDisplay.parentElement.getAttribute('data-index'));
        });
        bookToDisplay.appendChild(titleToDisplay);
        bookToDisplay.appendChild(authorToDisplay);
        bookToDisplay.appendChild(pageNumToDisplay);
        bookToDisplay.appendChild(labelBoxToDisplay);
        bookToDisplay.appendChild(svgToDisplay);
        bookShelf.appendChild(bookToDisplay);
    });
}