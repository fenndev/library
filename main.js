/* DOM Objects */

const addButton = document.querySelector(".add-btn");

/* Event Listeners */

addButton.addEventListener('click', () => {
    showAddModal();
});


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