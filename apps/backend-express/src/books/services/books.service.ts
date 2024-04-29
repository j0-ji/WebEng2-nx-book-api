'use strict';

import { client } from '../../mongodb/controllers/db.controller';
import { type Book, type CreateBookDto, type UpdateBookDto } from '@web/contract/books.model';

const databaseName = 'library';
const collectionName = 'books';

const collection = client.db(databaseName).collection(collectionName);

// TODO: divide Service better from the module

export class BookService {
    // get all books
    public async getBooks() {
        const result = await collection.find({}).toArray() as unknown as Book[];
        return {
            result: result,
        }
    }

    public async getBookById(id: Book['_id']) {
        const query = {_id: id};
        const result = await collection.findOne(query) as unknown as Book;
        return {
            result: result,
        }
    }

    public async createBook(dto: CreateBookDto) {
        const result = await collection.insertOne(dto);
        return {
            result: result,
        }
    }

    public async updateBook(id: Book['_id'], dto: UpdateBookDto) {
        const query = { _id: id};
        const result = await collection.updateOne(
            query,
            { $set: dto }
        );
        const newBook: Book = await collection.findOne(query) as Book;

        return {
            result: result,
            newBook: newBook
        };
    }

    public async replaceBook(id: Book['_id'], dto: CreateBookDto) {
        const query = { _id: id};
        const result =  await collection.updateOne(
            query,
            { $set: dto }
        );
        const newBook: Book = {_id: id, ...dto};

        return {
            result: result,
            newBook: newBook
        };
    }

    public async deleteBook(id: Book['_id']) {
        const query = { _id: id};
        const result = await collection.deleteOne(query);
        return {
            result: result,
        };
    }
}
