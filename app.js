const express = require('express');
const app = express();
const port = 3333;

app.set('view engine', 'pug');

// Redirect to the home page.
app.get('/', (req, res) => res.redirect('/home/'));

// Redirect paths that don't end with a '/' so relative paths can be used.
app.use('/[^/]+$', (req, res) => res.redirect(req.baseUrl + '/'));

// Set up routing to keep projects independent.
app.use('/home', require('home/app.js'));
app.use('/backgroundfetch', require('backgroundfetch/app.js'));
app.use('/backgroundsync', require('backgroundsync/app.js'));
app.use('/common', require('common/app.js'));
app.use('/webpush', require('webpush/app.js'));

// Handle unknown requests.
app.get('/*', (req, res) => res.status(404).send('¯\\_(ツ)_/¯'));

app.listen(port, () => console.log(`Listening on port ${port}`));

