// Hämtar NPM-paket som behövs
require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');

// Skapar en instans av express
const app = express();
const PORT = process.env.PORT;

// Skapar en connection till databasen
// Använder miljövariabler för att inte hårdkoda känslig information
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Kopplar upp mot databasen
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

// Skapar en array för posts
let posts = [];

// Middleware
// express funktion för att skicka statiska filer
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Skickas här
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Logga in mot sql databasen. Konkatinerar username och password för att enablera SQL injection
app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    // Skickar query till databasen
    db.query(query, (err, result) => {
        if (err) {
            console.error('Database error:', err); // Logga felet till konsolen
            res.status(500).send('Internal Server Error'); // Skicka ett generiskt felmeddelande till användaren
            return;
        }
        if (result.length > 0) {
            res.send('Login successful!');
        } else {
            res.send('Invalid credentials');
        }
    });
});

// Hämtar alla posts
app.get('/posts', (req, res) => {
    res.json(posts);
});

// Skapar en ny post
app.post('/posts', (req, res) => {
    const newPost = {
        id: posts.length + 1,
        content: req.body.content
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
