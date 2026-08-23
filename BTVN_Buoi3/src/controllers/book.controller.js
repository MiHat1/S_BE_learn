import * as bookService from '../services/book.service.js';

export const getAllBooks = async (req, res, next) => {
    try {
        const books = await bookService.getAllBooksService();
        res.status(200).json({
            success: true,
            data: books
        });
    }
    catch (error) {
        next(error);
    }
};

export const getBookById = async (req, res, next) => {
    try {
        const { id } = req.params ; 
        const book = await bookService.getBookByIdService(parseInt(id));
        return res.status(200).json({
            success: true,
            data: book
        });
    } catch (error) {
        next(error);
    }
};

export const createBook = async (req, res, next) => {
    try {
        const { title, author } = req.body;
        const newBook = await bookService.createBookService(title, author);
        return res.status(201).json({
            success: true,
            data: newBook
        });
    } catch (error) {
        next(error);
    }
};

export const updateBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, author } = req.body;
        const updatedBook = await bookService.updateBookService(parseInt(id), title, author);
        return res.status(200).json({
            success: true,
            data: updatedBook
        });
    } catch (error) {
        next(error);
    }
};

export const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params;  
        const deletedBook = await bookService.deleteBookService(parseInt(id));
        return res.status(200).json({
            success: true,
            data: deletedBook
        });
    } catch (error) {
        next(error);
    }
};
