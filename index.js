/**
 * Startup
 */
const express = require('express')
const app = express()

app.use(express.json())

// Faux database
const books = [
    {
        id: 1,
        name: "Life of Pi",
        author: "Yann Martel",
    },
    {
        id: 2,
        name: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
        author: "James Clear",
    },
    {
        id: 3,
        name: "A Game of Thrones (A Song of Ice and Fire #1)",
        author: "Georger R. R. Martin",
    },
]

/**
 * Routes
 */
app.get('/api/books', (req, res) => {
    res.send(books)
})

app.get('/api/books/:id', (req, res) => {
    const book = books.find(el => el.id == req.params.id);

    res.send(book);
})

app.post('/api/books', (req, res) => {
    const book = { name, author } = req.body
    const id = books.length + 1;

    books.push({ id, ...book })

    res.send('Book successfully added!')
});

app.put('/api/books/:id', (req, res) => {
    const book = books.find(el => el.id == req.params.id)

    if (! book) {
        return res.status(404).send('No book was found!')
    }

    book.name = req.body.name
    book.author = req.body.author

    res.send('Book successfully updated!')
})

app.delete('/api/books/:id', (req, res) => {
    const book = books.find(el => el.id == req.params.id)

    if (! book) {
        return res.status(404).send('No book was found!')
    }

    books.splice(books.indexOf(book), 1)

    res.send('Book successfully removed')
})

/**
 * Start server
 */
const port = process.env.PORT || 3333

app.listen(port, () => {
    console.log(`Server running on port ${port} ✨`)
})