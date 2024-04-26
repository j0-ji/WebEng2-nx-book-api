'use strict';


import express from 'express';
import bodyParser from 'body-parser';
import { connectToMongoDB } from './mongodb/controllers/db.controller';
import { router } from './books/controllers/books.contorller';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Connect to MongoDB
connectToMongoDB().then();

// Use books API-Module
app.use('/api/books', router);

app.listen( port, () => {
    console.info(`Listening on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.sendFile('/');
});
