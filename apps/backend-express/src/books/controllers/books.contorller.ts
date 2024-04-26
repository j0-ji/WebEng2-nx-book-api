'use strict';

import express, {type Request, type Response} from 'express';
import { type Book, type CreateBookDto, type UpdateBookDto } from '@web/contract/books.model';
import { checkIfUpdateBookDto, checkIfCreateBookDto } from "../utils/books.util";
import { BookService } from "../services/books.service";
import { ObjectId } from 'mongodb';

// ROUTER
const router = express.Router();

// BookService
const bookService = new BookService();

// HTTP-Requests
router.get('/', async (req: Request, res: Response) => {
    try {
        const serviceResponse = await bookService.getBooks()
        const books: Book[] = serviceResponse.result as Book[];
        return res.status(200).json(books);
    } catch (error) {
        console.error('ERROR while fetching books: ', error);
        return res.status(500).send('ERROR while fetching books!');
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const bookId = req?.params?.id;

    try {
        const serviceResponse = await bookService.getBookById(new ObjectId(bookId));
        if ( serviceResponse.result ) {
            return res.status(200).json(serviceResponse);
        } else {
            return res.status(404).send('Book not found!');
        }
    } catch (error) {
        res.status(500).send('Error fetching book!');
    }
});

router.post('/', async (req: Request, res: Response) => {
    if (checkIfCreateBookDto(req?.body)) {
        const bookDto = req.body as CreateBookDto;

        try {
            const serviceResponse = await bookService.createBook(bookDto);
            if (serviceResponse.result.acknowledged) {
                let _id = serviceResponse.result.insertedId.toString();
                return res.status(200).json({_id, ...bookDto});
            } else {
                return res.status(500).send('failed adding book');
            }
        } catch (error) {
            return res.status(500).send('failed adding book');
        }
    } else {
        return res.status(400).send('Invalid book attributes');
    }
});

router.patch('/:id', async (req: Request, res: Response) => {
    const bookId = req?.params?.id;

    if (checkIfUpdateBookDto(req?.body)) {
        const bookDto = req.body as UpdateBookDto;

        try {
            const serviceResponse = await bookService.updateBook(new ObjectId(bookId), bookDto);

            if (serviceResponse.result.modifiedCount === 1) {
                return res.status(200).json(serviceResponse.newBook);
            } else {
                return res.status(400).send('book already has the passed attributes');
            }
        } catch (error) {
            return res.status(404).send('Book with given ID not found');
        }
    } else {
        return res.status(400).send('invalid book attributes');
    }
});

router.put('/:id', async (req: Request, res: Response)=> {
    const bookId = req?.params?.id;

    if (checkIfCreateBookDto(req?.body)) {
        const bookDto = req.body as CreateBookDto;

        try {
            const serviceResponse = await bookService.replaceBook(new ObjectId(bookId), bookDto);

            if (serviceResponse.result.modifiedCount === 1) {
                return res.status(200).json(serviceResponse.newBook);
            } else {
                return res.status(404).send('book not found');
            }
        } catch (error) {
            return res.status(404).send('Book with given ID not found');
        }
    } else {
        return res.status(400).send('invalid book attributes');
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    const bookId = req?.params?.id;

    try {
        const serviceResponse = await bookService.deleteBook(new ObjectId(bookId));

        if (serviceResponse.result.deletedCount === 1) {
            return res.status(200).send('book deleted successfully');
        } else {
            return res.status(404).send('book not found');
        }
    } catch (error) {
        res.status(500).send('error deleting book');
    }
});

export { router };