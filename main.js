// Initialize a library array for storing books.
let library = [];

// Initialize Book constructor for books.
// function Book(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
//   this.id = crypto.randomUUID();
// }

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
  }
}

const libraryDiv = document.querySelector("#library");
const formElement = document.querySelector("form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const submitButton = document.querySelector(".submit");
let isEditing = false;
let currentEditingId = null;

// Create and add the add button
const addButton = document.createElement("button");
addButton.textContent = "+";
addButton.classList.add("add-button");
libraryDiv.appendChild(addButton);

// Add button event listener
addButton.addEventListener("click", () => {
  isEditing = false;
  currentEditingId = null;
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  formElement.classList.remove("hide");
});

// Submit form handler
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  if (formElement.checkValidity()) {
    if (isEditing) {
      // Update existing book
      const bookIndex = library.findIndex(
        (book) => book.id === currentEditingId
      );
      if (bookIndex !== -1) {
        library[bookIndex] = new Book(
          titleInput.value,
          authorInput.value,
          pagesInput.value,
          library[bookIndex].read,
          currentEditingId
        );
      }
    } else {
      // Add new book
      addBookToLibrary(
        titleInput.value,
        authorInput.value,
        pagesInput.value,
        false
      );
    }

    // Reset form
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    formElement.classList.add("hide");
    displayBook();
  } else {
    formElement.reportValidity();
  }
});

// Add some sample books for visualization
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("Animal Farm", "George Orwell", 112, false);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 234, false);

function displayBook() {
  libraryDiv.innerHTML = "";
  library.forEach((book) => {
    const div = document.createElement("div");
    const titleElement = document.createElement("h2");
    const authorElement = document.createElement("h3");
    const pagesElement = document.createElement("p");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");
    const readButton = document.createElement("button");

    deleteButton.classList.add("delete-button");
    deleteButton.dataset.id = book.id;
    editButton.classList.add("edit-button");
    editButton.dataset.id = book.id;
    readButton.classList.add("read-button");
    readButton.dataset.id = book.id;

    if (book.read) {
      div.classList.add("book", "finished");
    }
    div.classList.add("book");

    titleElement.textContent = book.title;
    authorElement.textContent = book.author;
    pagesElement.textContent = `${book.pages} pages`;
    deleteButton.textContent = "";
    editButton.textContent = "Edit";
    readButton.textContent = book.read ? "Read" : "Not Read";

    div.appendChild(titleElement);
    div.appendChild(authorElement);
    div.appendChild(pagesElement);
    div.appendChild(readButton);
    div.appendChild(deleteButton);
    div.appendChild(editButton);

    libraryDiv.appendChild(div);

    deleteButton.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      library = library.filter((book) => book.id !== id);
      displayBook();
    });

    editButton.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const bookToEdit = library.find((b) => b.id === id);

      titleInput.value = bookToEdit.title;
      authorInput.value = bookToEdit.author;
      pagesInput.value = bookToEdit.pages;

      isEditing = true;
      currentEditingId = bookToEdit.id;
      formElement.classList.remove("hide");
    });

    readButton.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const bookToUpdate = library.find((b) => b.id === id);
      bookToUpdate.read = !bookToUpdate.read;
      displayBook();
    });
  });
  libraryDiv.appendChild(addButton);
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  library.push(book);
}

displayBook();
