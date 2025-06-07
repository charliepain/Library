const library = []

function Book(title, author, numberPages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.id = crypto.randomUUID();

    this.title = title;
    this.author = author;
    this.numberPages = numberPages;
    this.read = read;

    this.info = function() {
        readingStatus = read ? "already read" : "not read yet";
        console.log(`${this.title} by ${this.author}, ${numberPages} pages, ${readingStatus}`);
    }

    this.changeReadStatus = function() {
        this.read = !this.read;
    }
}

function addBookToLibrary(title, author, numberPages, read) {
    let book = new Book(title,author,numberPages,read); 
    library.push(book);
}

function removeBookFromLibrary(id) {
    for (let i = 0; i < library.length; i++) {
        if (library[i]["id"] === id) {
            library.splice(i,1);
            return;
        }
    }
}

function displayBooksCard() {
    const body = document.querySelector("body");

    // Destroy old book section
    const oldBookSection = document.querySelector(".book-section");
    if (oldBookSection != null) {
        oldBookSection.remove();
    }

    // Display new book section

    const bookSection = document.createElement("div");
    bookSection.classList.add("book-section");
    body.appendChild(bookSection);

    if (library.length <= 0) {
        bookSection.textContent = "There are no books in your library.";
        return;
    }

    for (let book of library) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.setAttribute("data-id",book["id"]);
        bookSection.appendChild(bookCard);
        
        // const id = document.createElement("div");
        const title = document.createElement("div");
        const author = document.createElement("div");
        const numberPages = document.createElement("div");
        const read = document.createElement("div");
        
        const readContainer = document.createElement("div");
        const changeReadStatusButton = document.createElement("button");
        changeReadStatusButton.setAttribute("type","button");
        changeReadStatusButton.textContent = "Change read status";
        changeReadStatusButton.addEventListener("click",
            () => {
                book.changeReadStatus();
                displayBooksCard();
            }
        );

        readContainer.appendChild(read);
        readContainer.appendChild(changeReadStatusButton);
        readContainer.classList.add("read-container");
        
        // id.textContent = `Id: ${book["id"]}`;
        title.textContent = `Title: ${book["title"]}`;
        author.textContent = `Author: ${book["author"]}`;
        numberPages.textContent = `Number of pages: ${book["numberPages"]}`;
        read.textContent = `Read: ${book["read"] ? "Yes" : "No"}`;

        const removeBookButton = document.createElement("button");
        removeBookButton.setAttribute("type","button");
        removeBookButton.textContent = "Remove this book";
        removeBookButton.addEventListener("click",
            e => {
                const id = book["id"];
                removeBookFromLibrary(id);
                bookCard.remove();
            }
        );

        // bookCard.appendChild(id);
        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(numberPages);
        bookCard.appendChild(readContainer);
        bookCard.appendChild(removeBookButton);
    }
}

function displayBookForm() {

    const form = document.createElement("form");
    form.classList.add("book-form");
    
    const titleInput = document.createElement("input");
    const authorInput = document.createElement("input");
    const numberPagesInput = document.createElement("input");
    const readInput = document.createElement("input");

    titleInput.setAttribute("id","title");
    titleInput.setAttribute("name","title");
    titleInput.setAttribute("type","text");

    authorInput.setAttribute("id","author");
    authorInput.setAttribute("name","author");
    authorInput.setAttribute("type","text");
    
    numberPagesInput.setAttribute("id","number-pages");
    numberPagesInput.setAttribute("name","number-pages");
    numberPagesInput.setAttribute("type","number");
    numberPagesInput.setAttribute("step","1");

    readInput.setAttribute("id","read");
    readInput.setAttribute("name","read");
    readInput.setAttribute("type","checkbox");

    const titleLabel = document.createElement("label");
    const authorLabel = document.createElement("label");
    const numberPagesLabel = document.createElement("label");
    const readLabel = document.createElement("label");

    titleLabel.setAttribute("for","title");
    authorLabel.setAttribute("for","author");
    numberPagesLabel.setAttribute("for","number-pages");
    readLabel.setAttribute("for","read");

    titleLabel.textContent = "Title";
    authorLabel.textContent = "Author";
    numberPagesLabel.textContent = "Number of pages";
    readLabel.textContent = "I have read this book";

    const newBookButton = document.querySelector(".new-book-container");
    newBookButton.after(form);

    const addBookButton = document.createElement("button");
    addBookButton.setAttribute("type","submit");
    addBookButton.textContent = "Add this book";
    addBookButton.addEventListener("click",
        e => {
            const title = titleInput.value;
            const author = authorInput.value;
            const numberPages = numberPagesInput.value;
            const read = readInput.checked;
             
            addBookToLibrary(title,author,numberPages,read);
            displayBooksCard();
            e.preventDefault();
        }
    );

    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(authorLabel);
    form.appendChild(authorInput);
    form.appendChild(numberPagesLabel);
    form.appendChild(numberPagesInput);
    form.appendChild(readLabel);
    form.appendChild(readInput);
    form.appendChild(addBookButton);
}


document.querySelector(".new-book").addEventListener("click",
    () => {

        const oldBookForm = document.querySelector(".book-form");
        if (oldBookForm == null) {
            displayBookForm();
        }
        else {
            oldBookForm.remove();
        }

    });

addBookToLibrary("A","Ason",200,true);
addBookToLibrary("B","Bson",300,false);
addBookToLibrary("C","Cson",400,true);
addBookToLibrary("D","Dson",500,false);

displayBooksCard();

