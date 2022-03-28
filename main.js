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

function updateDisplay() {
    bookShelf.innerHTML = "";
    bookCollection.forEach(book => {
        let bookToDisplay = document.createElement('div');
        bookToDisplay.className = 'book';
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
        let svgToDisplay = document.createElement('svg');
        svgToDisplay.className = 'delete-btn';
        svgToDisplay.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svgToDisplay.setAttribute('height', '24px');
        svgToDisplay.setAttribute('viewBox', '0 0 16 16');
        svgToDisplay.setAttribute('width', '24px');
        let svgPathToDisplay = document.createElement('path');
        svgPathToDisplay.setAttribute('d', 'm 8 1 c -3.851562 0 -6.96875 3.117188 -6.96875 6.96875 s 3.117188 6.96875 6.96875 6.96875 s 6.96875 -3.117188 6.96875 -6.96875 s -3.117188 -6.96875 -6.96875 -6.96875 z m -3 3.96875 h 1 h 0.03125 c 0.253906 0.011719 0.511719 0.128906 0.6875 0.3125 l 1.28125 1.28125 l 1.3125 -1.28125 c 0.265625 -0.230469 0.445312 -0.304688 0.6875 -0.3125 h 1 v 1 c 0 0.285156 -0.035156 0.550781 -0.25 0.75 l -1.28125 1.28125 l 1.25 1.25 c 0.1875 0.1875 0.28125 0.453125 0.28125 0.71875 v 1 h -1 c -0.265625 0 -0.53125 -0.09375 -0.71875 -0.28125 l -1.28125 -1.28125 l -1.28125 1.28125 c -0.1875 0.1875 -0.453125 0.28125 -0.71875 0.28125 h -1 v -1 c 0 -0.265625 0.09375 -0.53125 0.28125 -0.71875 l 1.28125 -1.25 l -1.28125 -1.28125 c -0.210938 -0.195312 -0.304688 -0.46875 -0.28125 -0.75 z m 0 0');
        svgPathToDisplay.setAttribute('fill', '#2e3436');
        svgToDisplay.appendChild(svgPathToDisplay);
        

        bookToDisplay.appendChild(titleToDisplay);
        bookToDisplay.appendChild(authorToDisplay);
        bookToDisplay.appendChild(pageNumToDisplay);
        bookToDisplay.appendChild(labelBoxToDisplay);
        bookToDisplay.appendChild(svgToDisplay);

        bookShelf.appendChild(bookToDisplay);
    });
}