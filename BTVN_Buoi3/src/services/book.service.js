import {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} from '../repositories/book.data.js';

export const getAllBooksService = async () => {
    return getAllBooks();
};

export const getBookByIdService = async (id) => {
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
        throw new Error('Khong hop le ID');
        error.status = 400;
        throw error;
    }
    const book = getBookById(numericId);
    if (!book) {
        const error = new Error('Khong tim thay sach');
        error.status = 404;
        throw error;
    }
    return getBookById(id);
};

export const createBookService = async (title, author) => {
    //Kiem tra sach trung lap
    const exitsBook = getAllBooks().find(book => book.title === title && book.author === author);
    if (exitsBook) {
        const error = new Error('Sach da ton tai');
        error.status = 409;
        throw error;
    }
    //them vao danh sach
    const createdBook = createBook(title, author);
    return createdBook;
    return createBook(title, author);
};

export const updateBookService = async (id, title, author) => {
    if (!getBookById(id)) {
        const error = new Error('Khong tim thay sach');
        error.status = 404;
        throw error;
    }
    const book = updateBook(id, title, author);
    return book;
};

export const deleteBookService = async (id) => {
    if (!getBookById(id)) {
        const error = new Error('Khong tim thay sach');
        error.status = 404;
        throw error;
    }
    return deleteBook(id);
};
