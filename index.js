const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create
app.post('/users', (req, res) => {
    const user = { name: req.body.name, email: req.body.email };
    db.query('INSERT INTO users SET ?', user, (err, result) => {
        if (err) throw err;
        res.send({ id: result.insertId, ...user });
    });
});

// Read
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Update
app.put('/users/:id', (req, res) => {
    const { name, email } = req.body;
    db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ id: req.params.id, name, email });
    });
});

// Delete
app.delete('/users/:id', (req, res) => {
    db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'User deleted' });
    });
});

// Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
