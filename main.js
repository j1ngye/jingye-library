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

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  library.push(book);
}

// Add some sample books for visualization
addBookToLibrary("Basketball", "Michael Jordan", 410, false);
addBookToLibrary("Baseball", "Stephen Curry", 302, false);
addBookToLibrary("Ping Pong", "Klay Thomson", 223, false);
addBookToLibrary("Swimming", "Fisher Man", 190, false);

function displayBook() {
  const libraryDiv = document.querySelector("#library");

  for (let i = 0; i < library.length; i++) {
    const div = document.createElement("div");
    if (library[i].read) {
      div.classList.add("book", "finished");
    }
    div.classList.add("book");
    const titleElement = document.createElement("h2");
    const authorElement = document.createElement("h3");
    const pagesElement = document.createElement("p");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");
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
  }
}

function deleteBook(title) {
  const index = library.findIndex((book) => {
    return book.title === title;
  });
  library.splice(index, 1);
  return `Deleted`;
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
