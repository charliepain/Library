const books = []

function Book(title, author, numberPages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.numberPages = numberPages;
    this.read = read;

    this.info = function() {
        readingStatus = read ? "already read" : "not read yet";
        console.log(`${this.title} by ${this.author}, ${numberPages} pages, ${readingStatus}`);
    }
}