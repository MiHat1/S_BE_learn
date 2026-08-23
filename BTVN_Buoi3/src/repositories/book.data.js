export const books = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
  },
  {
    id: 2,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
  },
  {
    id: 3,
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
  },
];

export const getAllBooks = () => {
    return books;
};

export const getBookById = (id) => {
    return books.find(book => book.id === id);
}

export const createBook = (title, author) => {
    const newBook = {
        id: books.length + 1,
        title,
        author
    };
    books.push(newBook);
    return newBook;
};

export const updateBook = (id, title, author) => {
    const book = books.find(book => book.id === id);
    if (book) {
        book.title = title ?? book.title;
        book.author = author ?? book.author;
    }
    return book;
};

export const deleteBook = (id) => {
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex !== -1) {
        return books.splice(bookIndex, 1)[0];
    }
    return null;
};
