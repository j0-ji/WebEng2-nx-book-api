import { type ObjectId } from "mongodb";

export interface Book {
    _id: ObjectId;
    title: string;
    author: string;
    year: number;
}

export type CreateBookDto = Omit<Book, '_id'>;
export type UpdateBookDto = Omit<Partial<Book>, '_id'>;
