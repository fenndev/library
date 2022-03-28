# library
A simple library application written in HTML, CSS, and Javascript.

## Overview

This is an application designed to take an input from a user and store that input as a Book object and display it on screen. 

## Components
**Display:** A main area where stored books are displayed.

**Books** are displayed in a grid fashion, with each Book having its own 'card.' Each card has the following information:

1. The title of the book
2. The author of the book
3. The number of pages
4. An indication of whether or not the book has been read
5. A button to delete the book

An **Add Form** for adding new books to the array. This is acheived via a modal window and a button on the display to add a new Book. The form has the following:

* An input for the title, author, and number of pages
* A checkbox for whether or not the book has been read
* A button to submit the book

A **Book Collection** for storing the Books that are added by the user.

## Application Flow

### Adding a new Book

1. A user clicks on the `addBook` button and fills out the required information.
2. An event listener attached to the `addBook` button fires the `createNewBook` function once clicked, which fetches the information from the form elements and stores that information in temporary variables.
3. `createNewBook` then calls a Book object constructor, passing in the information that was fetched previously.
4. A new Book object is created with the information provided
5. The newly created Book is then added to the `bookCollection` array
6. `createNewBook` then calls the `updateDisplay` function, which reads the `bookCollection` array and adds the proper HTML and CSS to a new DOM element.

### Removing a Book

1. A user clicks on the `removeButton` present on every Book DOM item.
2. An event listener attached to the `removeButton` calls the `removeBook` function, which removes the element from the display
3. `removeBook` then calls `updateDisplay`, which updates the DOM with the correct elements.