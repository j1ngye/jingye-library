// Initialize a library array for storing books.
let library = [];

// Initialize Book constructor for books.
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

const libraryDiv = document.querySelector("#library");
const formElement = document.querySelector("form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const submitButton = document.querySelector(".submit");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (formElement.checkValidity()) {
    addBookToLibrary(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      false
    );
    formElement.classList.add("hide");
  } else {
    formElement.reportValidity();
  }

  displayBook();
});

const addButton = document.createElement("button");
addButton.textContent = "+";
addButton.classList.add("add-button");

// Add some sample books for visualization
addBookToLibrary("Basketball", "Michael Jordan", 410, false);
addBookToLibrary("Baseball", "Stephen Curry", 302, false);
addBookToLibrary("Ping Pong", "Klay Thomson", 223, false);
addBookToLibrary("Swimming", "Fisher Man", 190, false);

function displayBook() {
  libraryDiv.innerHTML = "";
  for (let i = 0; i < library.length; i++) {
    const div = document.createElement("div");
    const titleElement = document.createElement("h2");
    const authorElement = document.createElement("h3");
    const pagesElement = document.createElement("p");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");
    if (library[i].read) {
      div.classList.add("book", "finished");
    }
    div.classList.add("book");
    deleteButton.classList.add("delete-button");
    editButton.classList.add("edit-button");

    titleElement.textContent = library[i].title;
    authorElement.textContent = library[i].author;
    pagesElement.textContent = library[i].pages;
    deleteButton.textContent = "x";
    editButton.textContent = "Edit";

    div.appendChild(titleElement);
    div.appendChild(authorElement);
    div.appendChild(pagesElement);
    div.appendChild(deleteButton);
    div.appendChild(editButton);

    libraryDiv.appendChild(div);

    deleteButton.addEventListener("click", (e) => deleteBook(e));
    addButton.addEventListener("click", () => {
      document.querySelector("form").classList.remove("hide");
    });
  }
  libraryDiv.appendChild(addButton);
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  library.push(book);
}

function deleteBook(e) {
  e.target.parentNode.remove();
}

function editBook(title, author, pages, read, index) {
  library.splice(index, 1, new Book(title, author, pages, read, index));
  return `Edited`;
}

function toggleRead(title) {
  const index = library.findIndex((book) => {
    return book.title === title;
  });
  library[index].read = library[index].read ? false : true;
  return "Toggled";
}

displayBook();
