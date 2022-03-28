/* DOM Objects */

const addButton = document.querySelector(".add-btn");
const bookShelf = document.querySelector(".bookshelf");
const modal = document.querySelector(".modal");
const cancelButton = document.querySelector(".cancel-btn");
const submitButton = document.querySelector(".submit-btn");

/* Event Listeners */

addButton.addEventListener('click', () => {
    showModal();
});

cancelButton.addEventListener('click', () => {
    hideModal();
})

submitButton.addEventListener('click', () => {
    let titleToAdd = document.querySelector("#input-title").textContent;
    let authorToAdd = document.querySelector("#input-author").textContent;
    let pageNumToAdd = document.querySelector("#input-author").textContent;
    let readBoolToAdd = document.querySelector(".read").checked;
    let newBook = new Book(titleToAdd, authorToAdd, pageNumToAdd, readBoolToAdd);
    addBookToLibrary(newBook);
    console.log(bookCollection);    
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