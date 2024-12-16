const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const booksFilePath = './books.json';

const readBooksFromeFile = () => {
    const books = fs.readFileSync(booksFilePath, 'utf8');
    return JSON.parse(books);
};

const writeBooksToFile = (books) => {
    fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2));
};

app.get('/books', (req, res) => {
    const books = readBooksFromeFile();
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const books = readBooksFromeFile();
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) res.status(404).send('The book with the given ID was not found');
    res.json(book);
});

app.post('/books', (req, res) => {
    const books = readBooksFromeFile();
    const book = {
        id: books.length + 1,
        name: req.body.name,
        author: req.body.author,

    };
    books.push(book);
    writeBooksToFile(books);
    res.json(book);
});

app.put('/books/:id', (req, res) => {
    const books = readBooksFromeFile();
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) res.status(404).send('The book with the given ID was not found');
   
    book.name = req.body.name || book.name;
    book.author = req.body.author || book.author;

    writeBooksToFile(books);
    res.json(book);
});

app.delete('/books/:id', (req, res) => {
    const books = readBooksFromeFile();
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) res.status(404).send('The book with the given ID was not found');
    const index = books.indexOf(book);
    books.splice(index, 1);
    writeBooksToFile(books);
    res.json(book);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});