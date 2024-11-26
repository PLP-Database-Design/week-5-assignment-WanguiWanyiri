const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
require('dotenv').config()

app.use(bodyParser.json())

// connect to the database
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USERNAME || 'root',
    password: 'vinjim35?',
    database: process.env.DB_NAME
})

// Test database connection
connection.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// Question 1 goes here
app.get('/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    connection.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error accurred while retrieving patients');
        } else {
            res.status(200).json(result);
        }
    });
});

// Question 2 goes here
app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
    connection.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error accurred while retrieving providers');
        } else {
            res.status(200).json(result);
        }
    });
});

// Question 3 goes here
app.get('/patients/filter', (req, res) => {
    const firstName = req.query.first_name;
    if (!firstName) {
        return res.status(400).send('Please provide a first name');
    }
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
    connection.query(query, [firstName], (err, result) => { 
        if (err) {
            console.error(err);
            res.status(500).send('An error accurred while retrieving patients');
        } else {
            res.status(200).json(result);
        }
    });

});


// Question 4 goes here
app.get('/providers/specialty', (req, res) => {
    const specialty = req.query.specialty;
    if (!specialty) {
        return res.status(400).send('Please provide a specialty');
    }
    const query = 'SELECT first_name, last_name FROM providers WHERE provider_specialty = ?';
    connection.query(query, [specialty], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error accurred while retrieving providers');
        } else {
            res.status(200).json(result);
        }
    });
});


// listen to the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})